import { TimerState } from "../hooks/usePomodoroTimer";

type TimerProgressProps = {
    progress: number;  // 0 to 1
    state: TimerState;
};

export default function TimerProgress({ progress, state }: TimerProgressProps) {
    // Calculate circle properties
    const size = 280;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress * circumference);

    const getStateInfo = () => {
        switch (state) {
            case 'POMODORO':
                return {
                    color: '#f43f5e', // rose-500
                    label: 'Focus'
                };
            case 'SHORT_BREAK':
                return {
                    color: '#3b82f6', // blue-500
                    label: 'Short Break'
                };
            case 'LONG_BREAK':
                return {
                    color: '#a855f7', // purple-500
                    label: 'Long Break'
                };
            case 'PAUSED':
                return {
                    color: '#404040',
                    label: 'Paused'
                };
            default:
                return {
                    color: '#ffffff',
                    label: ''
                };
        }
    };

    const { color, label } = getStateInfo();

    return (
        <div className="w-[280px] h-[280px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-lg font-medium">{label}</span>
            </div>
            <svg className="transform -rotate-90 w-full h-full filter drop-shadow-[0_0_8px_rgba(233,69,96,0.3)]">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgb(55 65 81)"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
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
