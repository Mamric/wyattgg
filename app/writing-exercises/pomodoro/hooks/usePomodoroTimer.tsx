/// <reference lib="dom" />
/// <reference types="node" />
/* global NodeJS, setInterval, clearInterval */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";

export type TimerState = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK" | "PAUSED";

export interface TimerSettings {
    pomodoroTime: number; // in minutes
    shortBreakTime: number; // in minutes
    longBreakTime: number; // in minutes
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
const audioContext =
    typeof window !== "undefined"
        ? new (window.AudioContext || window.webkitAudioContext)({
              // This might help with iOS silent mode
              sampleRate: 44100,
              latencyHint: "interactive",
          })
        : null;

// Add this function to resume audio context
const resumeAudioContext = async () => {
    if (audioContext?.state === "suspended") {
        await audioContext.resume();
    }
};

// Preload audio files
const preloadAudio = async (url: string): Promise<AudioBuffer | null> => {
    if (!audioContext) return null;
    try {
        const response = await window.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        return audioBuffer;
    } catch (error) {
        console.error("Error loading audio:", error);
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
        longBreakInterval: 4,
    });

    // Core State
    const [timerState, setTimerState] = useState<TimerState>("POMODORO");
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
    const tickStartTimeRef = useRef<number | null>(null);

    // Preload audio files on mount
    useEffect(() => {
        if (!audioContext) return;

        const loadAudio = async () => {
            clickBuffer.current = await preloadAudio("/sounds/click.mp3");
            tickBuffer.current = await preloadAudio("/sounds/tick.mp3");
            ringBuffer.current = await preloadAudio("/sounds/ring.mp3");
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
    const playSound = useCallback(async (buffer: AudioBuffer | null) => {
        if (!audioContext || !buffer) return;

        await resumeAudioContext();

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

        // Start the tick sound when we enter the 5-second window
        if (timeRemaining === 5 && isActive) {
            const source = audioContext.createBufferSource();
            source.buffer = tickBuffer.current;
            source.loop = true;
            source.connect(audioContext.destination);
            source.start(0);
            tickSourceRef.current = source;
            tickStartTimeRef.current = audioContext.currentTime;
        } else if (timeRemaining === 0 || !isActive) {
            // Stop the sound when we reach 0 or pause the timer
            if (tickSourceRef.current) {
                tickSourceRef.current.stop();
                tickSourceRef.current.disconnect();
                tickSourceRef.current = null;
                // Don't reset tickStartTimeRef here so we can use it for resuming
            }
        }

        // If we're resuming and we're in the last 5 seconds, restart the tick
        if (isActive && timeRemaining <= 5 && timeRemaining > 0 && !tickSourceRef.current) {
            const source = audioContext.createBufferSource();
            source.buffer = tickBuffer.current;
            source.loop = true;
            source.connect(audioContext.destination);
            
            // Calculate the offset based on how much time has passed
            let offset = 0;
            if (tickStartTimeRef.current !== null) {
                offset = (audioContext.currentTime - tickStartTimeRef.current) % tickBuffer.current.duration;
            }
            
            source.start(0, offset);
            tickSourceRef.current = source;
        }

        // Cleanup function
        return () => {
            if (tickSourceRef.current && (timeRemaining === 0 || !isActive)) {
                tickSourceRef.current.stop();
                tickSourceRef.current.disconnect();
                tickSourceRef.current = null;
                // Reset tickStartTimeRef only when the timer completes
                if (timeRemaining === 0) {
                    tickStartTimeRef.current = null;
                }
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
    const getTotalTime = useCallback(
        (state: TimerState) => {
            switch (state) {
                case "POMODORO":
                    return settings.pomodoroTime * 60;
                case "SHORT_BREAK":
                    return settings.shortBreakTime * 60;
                case "LONG_BREAK":
                    return settings.longBreakTime * 60;
                default:
                    return timeRemaining;
            }
        },
        [settings.pomodoroTime, settings.shortBreakTime, settings.longBreakTime, timeRemaining]
    );

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

        if (timerState === "POMODORO") {
            const nextPomodoroCount = completedPomodoros + 1;
            setCompletedPomodoros(nextPomodoroCount);

            // Determine next break type based on the new count
            const shouldTakeLongBreak = nextPomodoroCount % settings.longBreakInterval === 0;
            const nextState = shouldTakeLongBreak ? "LONG_BREAK" : "SHORT_BREAK";

            setTimerState(nextState);
            setTimeRemaining(getTotalTime(nextState));
            setIsActive(settings.autoStartBreaks);
        } else {
            setTimerState("POMODORO");
            setTimeRemaining(getTotalTime("POMODORO"));
            setIsActive(settings.autoStartPomodoros);
        }
    }, [timerState, completedPomodoros, settings, getTotalTime, playSound]);

    // Timer tick effect
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
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
                intervalRef.current = null; // Clear the ref
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null; // Clear the ref
            }
        };
    }, [isActive, handleTimerComplete]);

    // Memoize progress calculation
    const progress = useMemo(
        () => (getTotalTime(timerState) - timeRemaining) / getTotalTime(timerState),
        [getTotalTime, timerState, timeRemaining]
    );

    const updateSettings = useCallback(
        (newSettings: TimerSettings) => {
            // Check if the current phase's duration was changed
            const shouldResetTimer = (() => {
                switch (timerState) {
                    case "POMODORO":
                        return newSettings.pomodoroTime !== settings.pomodoroTime;
                    case "SHORT_BREAK":
                        return newSettings.shortBreakTime !== settings.shortBreakTime;
                    case "LONG_BREAK":
                        return newSettings.longBreakTime !== settings.longBreakTime;
                    default:
                        return false;
                }
            })();

            setSettings(newSettings);

            // Only update time remaining if the current phase's duration was changed
            if (shouldResetTimer) {
                setTimeRemaining((prev) => {
                    if (timerState === "POMODORO") {
                        return newSettings.pomodoroTime * 60;
                    } else if (timerState === "SHORT_BREAK") {
                        return newSettings.shortBreakTime * 60;
                    } else if (timerState === "LONG_BREAK") {
                        return newSettings.longBreakTime * 60;
                    }
                    return prev;
                });
            }
        },
        [timerState, settings]
    );

    const resetTimer = useCallback(() => {
        setTimeRemaining(getTotalTime(timerState));
        setIsActive(false);
    }, [timerState, getTotalTime]);

    // Add effect to handle audio context state
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Try to resume audio context on any user interaction
            const handleInteraction = () => {
                resumeAudioContext();
            };

            window.addEventListener("touchstart", handleInteraction);
            window.addEventListener("mousedown", handleInteraction);
            window.addEventListener("keydown", handleInteraction);

            return () => {
                window.removeEventListener("touchstart", handleInteraction);
                window.removeEventListener("mousedown", handleInteraction);
                window.removeEventListener("keydown", handleInteraction);
            };
        }
    }, []);

    const skipTimer = useCallback(() => {
        // Stop the current timer if it's running
        if (isActive) {
            setIsActive(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        // Determine next state
        if (timerState === "POMODORO") {
            // Check if we should go to long break
            if ((completedPomodoros + 1) % settings.longBreakInterval === 0) {
                setTimerState("LONG_BREAK");
                setTimeRemaining(settings.longBreakTime * 60);
            } else {
                setTimerState("SHORT_BREAK");
                setTimeRemaining(settings.shortBreakTime * 60);
            }
            setCompletedPomodoros((prev) => prev + 1);
        } else {
            // If we're in any break, go to next pomodoro
            setTimerState("POMODORO");
            setTimeRemaining(settings.pomodoroTime * 60);
        }
    }, [timerState, completedPomodoros, settings, isActive]);

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
        progress,
        skipTimer,
    };
}
