import CompletionStats from "./CompletionStats";

type CompletedScreenProps = {
    exercise: {
        startTime: Date | null;
        endTime: Date | null;
        userAnswers: { [key: string]: string };
        deviceKeys: string[];
        exportResults: () => void;
        restartExercise: () => void;
    };
};

export default function CompletedScreen({ exercise }: CompletedScreenProps) {
    const duration = exercise.startTime && exercise.endTime
        ? Math.floor((exercise.endTime.getTime() - exercise.startTime.getTime()) / 1000)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Exercise Complete!</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={exercise.exportResults}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                                         transition-colors w-full sm:w-auto"
                            >
                                Export Results
                            </button>
                            <button
                                onClick={exercise.restartExercise}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 
                                         transition-colors w-full sm:w-auto"
                            >
                                Start New Exercise
                            </button>
                        </div>
                    </div>

                    <CompletionStats
                        startTime={exercise.startTime}
                        endTime={exercise.endTime}
                        duration={duration}
                    />

                    <div className="space-y-6">
                        {exercise.deviceKeys.map((key) => (
                            <div key={key} className="bg-gray-700 rounded-lg p-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <h3 className="text-xl font-bold text-white mb-2 md:mb-0">
                                        {key}
                                    </h3>
                                </div>
                                <div className="bg-gray-800 rounded p-4">
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-sm">Your Answer:</span>{' '}
                                        <span className={exercise.userAnswers[key] ? "text-white" : "text-gray-500 italic"}>
                                            {exercise.userAnswers[key] || "No answer provided"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
