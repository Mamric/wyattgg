/// <reference lib="dom" />
/// <reference types="node" />
/* global NodeJS, setInterval, clearInterval, HTMLAudioElement, Audio */

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

    // Audio refs (only for tick and ring which need to be controlled)
    const tickSound = useRef<HTMLAudioElement | null>(null);
    const ringSound = useRef<HTMLAudioElement | null>(null);

    // Initialize audio elements
    useEffect(() => {
        tickSound.current = new Audio('/sounds/tick.mp3');
        ringSound.current = new Audio('/sounds/ring.mp3');
        
        // Set tick sound to loop
        if (tickSound.current) {
            tickSound.current.loop = true;
        }

        // Cleanup
        return () => {
            tickSound.current = null;
            ringSound.current = null;
        };
    }, []);

    // Play click sound function (creates new instance each time)
    const playClickSound = useCallback(() => {
        const click = new Audio('/sounds/click.mp3');
        click.play();
    }, []);

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
        // Stop tick sound if it's playing
        if (tickSound.current) {
            tickSound.current.pause();
            tickSound.current.currentTime = 0;
        }
        
        // Play completion sound
        ringSound.current?.play();

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
    }, [timerState, completedPomodoros, settings, getTotalTime]);

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
