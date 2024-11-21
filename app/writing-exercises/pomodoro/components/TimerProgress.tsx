import { TimerState } from "../hooks/usePomodoroTimer";

type TimerProgressProps = {
    progress: number;  // 0 to 1
    state: TimerState;
};

export default function TimerProgress({ progress, state }: TimerProgressProps) {
    // Calculate circle properties
    const size = 320;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress * circumference);

    // Get color based on timer state
    const getColor = () => {
        switch (state) {
            case 'POMODORO':
                return 'rgb(74 222 128)'; // text-green-400
            case 'SHORT_BREAK':
                return 'rgb(96 165 250)'; // text-blue-400
            case 'LONG_BREAK':
                return 'rgb(192 132 252)'; // text-purple-400
            case 'PAUSED':
                return 'rgb(156 163 175)'; // text-gray-400
            default:
                return 'white';
        }
    };

    return (
        <div className="w-[320px] h-[320px] mx-auto">
            {/* Background circle */}
            <svg
                className="transform -rotate-90 w-full h-full"
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgb(55 65 81)"  // bg-gray-700
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                />
            </svg>
        </div>
    );
}
