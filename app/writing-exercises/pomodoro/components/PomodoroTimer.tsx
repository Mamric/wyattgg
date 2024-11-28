import { TimerState, TimerSettings as TimerSettingsType } from "../hooks/usePomodoroTimer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerProgress from "./TimerProgress";
import TimerSettings from "./TimerSettings";

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
        skipTimer: () => void;
    };
};

export default function PomodoroTimer({ timer }: PomodoroTimerProps) {
    const getStateColors = () => {
        switch (timer.timerState) {
            case 'POMODORO':
                return {
                    badge: 'bg-rose-500',
                    border: 'border-rose-500/20'
                };
            case 'SHORT_BREAK':
                return {
                    badge: 'bg-blue-500',
                    border: 'border-blue-500/20'
                };
            case 'LONG_BREAK':
                return {
                    badge: 'bg-purple-500',
                    border: 'border-purple-500/20'
                };
            default:
                return {
                    badge: 'bg-gray-500',
                    border: 'border-gray-500/20'
                };
        }
    };

    const colors = getStateColors();
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            {/* Main Timer Section */}
            <div className="relative bg-[#16213e]/50 rounded-2xl p-6 backdrop-blur-lg">
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${colors.badge} px-6 py-2 rounded-full`}>
                    <span className="text-white font-medium">
                        Session {timer.completedPomodoros + 1}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center h-full py-8">
                    <TimerProgress progress={timer.progress} state={timer.timerState} />
                    <TimerDisplay timeRemaining={timer.timeRemaining} state={timer.timerState} />
                    <TimerControls
                        isActive={timer.isActive}
                        onStart={timer.startTimer}
                        onPause={timer.pauseTimer}
                        onReset={timer.resetTimer}
                        onSkip={timer.skipTimer}
                        timerState={timer.timerState}
                    />
                </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-[#16213e]/50 rounded-2xl p-6 backdrop-blur-lg">
                <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>
                <TimerSettings settings={timer.settings} onUpdateSettings={timer.updateSettings} />
            </div>
        </div>
    );
}
