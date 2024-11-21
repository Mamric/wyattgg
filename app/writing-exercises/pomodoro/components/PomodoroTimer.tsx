import { TimerState, TimerSettings as TimerSettingsType } from "../hooks/usePomodoroTimer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerProgress from "./TimerProgress";
import TimerSettings from "./TimerSettings";
import { useState } from "react";

type PomodoroTimerProps = {
    timer: {
        timerState: TimerState;
        timeRemaining: number;
        isActive: boolean;
        completedPomodoros: number;
        progress: number;
        startTimer: () => void;
        pauseTimer: () => void;
        resetTimer: () => void;
        settings: TimerSettingsType;
        // eslint-disable-next-line
        updateSettings: (settings: TimerSettingsType) => void;
    };
};

export default function PomodoroTimer({ timer }: PomodoroTimerProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const stateLabels: Record<TimerState, string> = {
        POMODORO: "Focus Session",
        SHORT_BREAK: "Short Break",
        LONG_BREAK: "Long Break",
        PAUSED: "Paused",
    };

    return (
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="mb-8 p-4 bg-blue-900/50 rounded-lg text-center">
                <p className="text-blue-200 font-medium">
                    🧪 Beta Feature: We'd love your feedback!
                    <br />
                    <span className="text-sm">
                        Contact <span className="font-mono bg-blue-800/50 px-2 py-0.5 rounded">@scpwyatt</span> on
                        Discord with suggestions
                    </span>
                </p>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{stateLabels[timer.timerState]}</h2>
                <div className="text-gray-400">Completed Sessions: {timer.completedPomodoros}</div>
            </div>

            <div className="relative">
                <TimerProgress progress={timer.progress} state={timer.timerState} />

                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <TimerDisplay timeRemaining={timer.timeRemaining} state={timer.timerState} />
                </div>
            </div>

            <div className="mt-8">
                <TimerControls
                    isActive={timer.isActive}
                    onStart={timer.startTimer}
                    onPause={timer.pauseTimer}
                    onReset={timer.resetTimer}
                    onOpenSettings={() => setIsSettingsOpen(!isSettingsOpen)}
                    isSettingsOpen={isSettingsOpen}
                />
            </div>

            <div
                className={`mt-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    isSettingsOpen ? "max-h-[800px] sm:max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="border-t border-gray-700 pt-6">
                    <TimerSettings settings={timer.settings} onUpdateSettings={timer.updateSettings} />
                </div>
            </div>
        </div>
    );
}
