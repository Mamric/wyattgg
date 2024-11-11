import Header from "../../components/Header";
import { LiteraryDevice } from "../../types";

type QuizScreenProps = {
    currentQuestion: {
        device: LiteraryDevice;
        options: string[];
    };
    onAnswer: (answer: string) => void;
    progress: {
        current: number;
        total: number;
        percentage: number;
    };
};

export default function QuizScreen({ currentQuestion, onAnswer, progress }: QuizScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header title="Literary Devices Quiz" subtitle="Test your knowledge of literary devices" />

                <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">
                                Question {progress.current} of {progress.total}
                            </span>
                            <span className="text-gray-300">{Math.round(progress.percentage)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress.percentage}%` }}
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6">
                        What is the definition of "{currentQuestion.device.name}"?
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => onAnswer(option)}
                                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 
                                         rounded-lg transition-colors text-gray-300"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
