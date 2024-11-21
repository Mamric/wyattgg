import { TimerState } from "../hooks/usePomodoroTimer";

type TimerControlsProps = {
    isActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onSkip: () => void;
    timerState: TimerState;
};

export default function TimerControls({ 
    isActive, 
    onStart, 
    onPause, 
    onReset,
    onSkip,
    timerState
}: TimerControlsProps) {
    const handleStartPause = () => {
        isActive ? onPause() : onStart();
    };

    const getButtonColors = () => {
        switch (timerState) {
            case 'POMODORO':
                return {
                    active: 'bg-rose-500',
                    hover: 'hover:bg-rose-600'
                };
            case 'SHORT_BREAK':
                return {
                    active: 'bg-blue-500',
                    hover: 'hover:bg-blue-600'
                };
            case 'LONG_BREAK':
                return {
                    active: 'bg-purple-500',
                    hover: 'hover:bg-purple-600'
                };
            default:
                return {
                    active: 'bg-gray-500',
                    hover: 'hover:bg-gray-600'
                };
        }
    };

    const colors = getButtonColors();

    return (
        <div className="flex justify-center items-center gap-8 mt-8">
            <button
                onClick={onReset}
                className="p-4 text-gray-400 rounded-full hover:bg-[#1a1a2e] 
                         transition-all duration-200 hover:scale-105"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>

            <button
                onClick={handleStartPause}
                className={`w-32 h-32 rounded-full font-medium text-white
                          transition-all duration-200 relative
                          flex flex-col items-center justify-center
                          shadow-lg
                          ${isActive 
                            ? `${colors.active} translate-y-1 shadow-inner` 
                            : `${colors.active} hover:brightness-110`
                          }
                          before:absolute before:inset-0 before:rounded-full
                          before:transition-opacity before:duration-200
                          ${isActive
                            ? 'before:bg-black/20 before:opacity-100'
                            : 'before:bg-white/10 before:opacity-0 hover:before:opacity-100'
                          }`}
            >
                {isActive ? (
                    <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
                <span className="text-lg">{isActive ? 'Pause' : 'Start'}</span>
            </button>

            <button
                onClick={onSkip}
                className="p-4 text-gray-400 rounded-full hover:bg-[#1a1a2e] 
                         transition-all duration-200 hover:scale-105"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
