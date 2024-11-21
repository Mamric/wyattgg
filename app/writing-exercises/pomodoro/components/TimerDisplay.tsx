import { TimerState } from "../hooks/usePomodoroTimer";

type TimerDisplayProps = {
    timeRemaining: number;
    state: TimerState;
};

export default function TimerDisplay({ timeRemaining, state }: TimerDisplayProps) {
    // Convert seconds to minutes and seconds
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    // Get color based on timer state
    const getColorClass = () => {
        switch (state) {
            case 'POMODORO':
                return 'text-green-400';
            case 'SHORT_BREAK':
                return 'text-blue-400';
            case 'LONG_BREAK':
                return 'text-purple-400';
            case 'PAUSED':
                return 'text-gray-400';
            default:
                return 'text-white';
        }
    };

    return (
        <div className="text-center">
            <div className={`font-mono text-7xl sm:text-8xl font-bold ${getColorClass()}`}>
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>
        </div>
    );
}
