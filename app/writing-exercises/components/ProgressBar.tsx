type ProgressBarProps = {
    current: number;
    total: number;
    userAnswers: { [key: string]: string };
    deviceKeys: string[];
    furthestIndex: number;
	// eslint-disable-next-line no-unused-vars
    onQuestionSelect: (index: number) => void;
};

export default function ProgressBar({ current, total, userAnswers, deviceKeys, furthestIndex, onQuestionSelect }: ProgressBarProps) {
    const progress = Math.round((current / (total - 1)) * 100);
    const furthestProgress = Math.round((furthestIndex / (total - 1)) * 100);

    return (
        <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>
                    Question {current + 1} of {total}
                </span>
                <span>
                    {Object.keys(userAnswers).length} of {total} Answered
                </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="relative w-full h-full">
                    {/* Progress bars */}
                    <div
                        className="absolute h-full bg-blue-900/30 rounded-full transition-all duration-300"
                        style={{ width: `${furthestProgress}%` }}
                    />
                    <div
                        className="absolute h-full bg-blue-500/50 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Progress dots */}
                    {deviceKeys.map((key, index) => (
                        <div
                            key={key}
                            onClick={() => onQuestionSelect(index)}
                            className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full transform -translate-x-1/2 z-10
                                transition-all duration-300 cursor-pointer
                                ${
                                    index === current
                                        ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800 scale-125 shadow-lg shadow-blue-500/50"
                                        : "hover:scale-110"
                                }
                                ${userAnswers[key] ? "bg-gray-400 hover:bg-gray-300" : "bg-gray-600 hover:bg-gray-500"}
                            `}
                            style={{ left: `${(index / (total - 1)) * 100}%` }}
                            title={`Question ${index + 1}${userAnswers[key] ? " (Completed)" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
