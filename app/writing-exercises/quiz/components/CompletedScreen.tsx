import Header from "../../components/Header";

type CompletedScreenProps = {
    results: {
        questions: Array<{
            device: {
                name: string;
                definition: string;
            };
            correctDefinition: string;
            options: string[];
        }>;
        answers: boolean[];
        grade: string;
        totalCorrect: number;
        totalQuestions: number;
    };
    onRestart: () => void;
};

export default function CompletedScreen({ results, onRestart }: CompletedScreenProps) {
    const percentage = Math.round((results.totalCorrect / results.totalQuestions) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header title="Quiz Complete!" />
                <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <div className={`
                                w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center
                                border-4 flex-shrink-0
                                ${results.grade === 'A' ? 'border-green-500 text-green-400' : ''}
                                ${results.grade === 'B' ? 'border-blue-500 text-blue-400' : ''}
                                ${results.grade === 'C' ? 'border-yellow-500 text-yellow-400' : ''}
                                ${results.grade === 'D' ? 'border-orange-500 text-orange-400' : ''}
                                ${results.grade === 'F' ? 'border-red-500 text-red-400' : ''}
                            `}>
                                <span className="text-5xl sm:text-6xl font-bold">{results.grade}</span>
                            </div>
                            <div className="text-gray-300 text-center sm:text-left">
                                <div className="text-xl">{percentage}%</div>
                                <div className="text-sm">
                                    {results.totalCorrect} of {results.totalQuestions} correct
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onRestart}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg 
                                     hover:bg-purple-700 transition-colors text-sm w-full sm:w-auto"
                        >
                            Try Again
                        </button>
                    </div>

                    <div className="space-y-4">
                        {results.questions.map((question, index) => {
                            const isCorrect = results.answers[index];
                            return (
                                <div
                                    key={index}
                                    className={`bg-gray-700 rounded-lg p-4 border ${
                                        isCorrect ? 'border-green-500/30' : 'border-red-500/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-white">{question.device.name}</h3>
                                        <span className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                            {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-gray-300">
                                            <span className="text-green-400">Correct Answer:</span>{" "}
                                            {question.correctDefinition}
                                        </p>
                                        {!isCorrect && (
                                            <p className="text-gray-300">
                                                <span className="text-red-400">Your Answer:</span>{" "}
                                                {question.options.find(opt => opt !== question.correctDefinition)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
