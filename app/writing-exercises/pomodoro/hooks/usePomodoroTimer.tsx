/// <reference lib="dom" />
/// <reference types="node" />
/* global NodeJS, setInterval, clearInterval */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export type TimerState = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK' | 'PAUSED';

export interface TimerSettings {
    pomodoroTime: number;      // in minutes
    shortBreakTime: number;    // in minutes
    longBreakTime: number;     // in minutes
    autoStartBreaks: boolean;
    autoStartPomodoros: boolean;
    longBreakInterval: number; // number of pomodoros before long break
}

declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
    }
}

// Create audio context and sources outside the component
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

// Preload audio files
const preloadAudio = async (url: string): Promise<AudioBuffer | null> => {
    if (!audioContext) return null;
    try {
        const response = await window.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        return audioBuffer;
    } catch (error) {
        console.error('Error loading audio:', error);
        return null;
    }
};

export function usePomodoroTimer() {
    // Timer Settings
    const [settings, setSettings] = useState<TimerSettings>({
        pomodoroTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
        autoStartBreaks: true,
        autoStartPomodoros: true,
        longBreakInterval: 4
    });

    // Core State
    const [timerState, setTimerState] = useState<TimerState>('POMODORO');
    const [timeRemaining, setTimeRemaining] = useState(settings.pomodoroTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [completedPomodoros, setCompletedPomodoros] = useState(0);

    // Refs for interval management
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Audio buffer refs
    const clickBuffer = useRef<AudioBuffer | null>(null);
    const tickBuffer = useRef<AudioBuffer | null>(null);
    const ringBuffer = useRef<AudioBuffer | null>(null);
    const tickSourceRef = useRef<AudioBufferSourceNode | null>(null);

    // Preload audio files on mount
    useEffect(() => {
        if (!audioContext) return;

        const loadAudio = async () => {
            clickBuffer.current = await preloadAudio('/sounds/click.mp3');
            tickBuffer.current = await preloadAudio('/sounds/tick.mp3');
            ringBuffer.current = await preloadAudio('/sounds/ring.mp3');
        };

        loadAudio();

        return () => {
            if (tickSourceRef.current) {
                tickSourceRef.current.stop();
                tickSourceRef.current.disconnect();
            }
        };
    }, []);

    // Play sound function
    const playSound = useCallback((buffer: AudioBuffer | null) => {
        if (!audioContext || !buffer) return;
        
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
        return source;
    }, []);

    // Play click sound function
    const playClickSound = useCallback(() => {
        if (clickBuffer.current) {
            playSound(clickBuffer.current);
        }
    }, [playSound]);

    // Handle tick sound
    useEffect(() => {
        if (!audioContext || !tickBuffer.current) return;

        if (timeRemaining <= 5 && timeRemaining > 0 && isActive) {
            if (!tickSourceRef.current) {
                const source = audioContext.createBufferSource();
                source.buffer = tickBuffer.current;
                source.loop = true;
                source.connect(audioContext.destination);
                source.start(0);
                tickSourceRef.current = source;
            }
        } else if (tickSourceRef.current) {
            tickSourceRef.current.stop();
            tickSourceRef.current.disconnect();
            tickSourceRef.current = null;
        }

        return () => {
            if (tickSourceRef.current) {
                tickSourceRef.current.stop();
                tickSourceRef.current.disconnect();
                tickSourceRef.current = null;
            }
        };
    }, [timeRemaining, isActive]);

    // Modified startTimer
    const startTimer = useCallback(() => {
        setIsActive(true);
        playClickSound();
    }, [playClickSound]);

    // Modified pauseTimer
    const pauseTimer = useCallback(() => {
        setIsActive(false);
        playClickSound();
    }, [playClickSound]);

    // Memoize getTotalTime
    const getTotalTime = useCallback((state: TimerState) => {
        switch (state) {
            case 'POMODORO': return settings.pomodoroTime * 60;
            case 'SHORT_BREAK': return settings.shortBreakTime * 60;
            case 'LONG_BREAK': return settings.longBreakTime * 60;
            default: return timeRemaining;
        }
    }, [settings.pomodoroTime, settings.shortBreakTime, settings.longBreakTime, timeRemaining]);

    // Handle timer completion
    const handleTimerComplete = useCallback(() => {
        if (tickSourceRef.current) {
            tickSourceRef.current.stop();
            tickSourceRef.current.disconnect();
            tickSourceRef.current = null;
        }
        
        if (ringBuffer.current) {
            playSound(ringBuffer.current);
        }

        if (timerState === 'POMODORO') {
            const nextPomodoroCount = completedPomodoros + 1;
            setCompletedPomodoros(nextPomodoroCount);
            
            // Determine next break type based on the new count
            const shouldTakeLongBreak = nextPomodoroCount % settings.longBreakInterval === 0;
            const nextState = shouldTakeLongBreak ? 'LONG_BREAK' : 'SHORT_BREAK';
            
            setTimerState(nextState);
            setTimeRemaining(getTotalTime(nextState));
            setIsActive(settings.autoStartBreaks);
        } else {
            setTimerState('POMODORO');
            setTimeRemaining(getTotalTime('POMODORO'));
            setIsActive(settings.autoStartPomodoros);
        }
    }, [timerState, completedPomodoros, settings, getTotalTime, playSound]);

    // Timer tick effect
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleTimerComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;  // Clear the ref
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;  // Clear the ref
            }
        };
    }, [isActive, handleTimerComplete]);

    // Memoize progress calculation
    const progress = useMemo(() => 
        (getTotalTime(timerState) - timeRemaining) / getTotalTime(timerState),
    [getTotalTime, timerState, timeRemaining]);

    const updateSettings = useCallback((newSettings: TimerSettings) => {
        // Check if the current phase's duration was changed
        const shouldResetTimer = (() => {
            switch (timerState) {
                case 'POMODORO':
                    return newSettings.pomodoroTime !== settings.pomodoroTime;
                case 'SHORT_BREAK':
                    return newSettings.shortBreakTime !== settings.shortBreakTime;
                case 'LONG_BREAK':
                    return newSettings.longBreakTime !== settings.longBreakTime;
                default:
                    return false;
            }
        })();

        setSettings(newSettings);
        
        // Only update time remaining if the current phase's duration was changed
        if (shouldResetTimer) {
            setTimeRemaining(prev => {
                if (timerState === 'POMODORO') {
                    return newSettings.pomodoroTime * 60;
                } else if (timerState === 'SHORT_BREAK') {
                    return newSettings.shortBreakTime * 60;
                } else if (timerState === 'LONG_BREAK') {
                    return newSettings.longBreakTime * 60;
                }
                return prev;
            });
        }
    }, [timerState, settings]);

    const resetTimer = useCallback(() => {
        setTimeRemaining(getTotalTime(timerState));
        setIsActive(false);
    }, [timerState, getTotalTime]);

    return {
        timerState,
        timeRemaining,
        isActive,
        completedPomodoros,
        settings,
        startTimer,
        pauseTimer,
        resetTimer,
        updateSettings,
        progress
    };
}
