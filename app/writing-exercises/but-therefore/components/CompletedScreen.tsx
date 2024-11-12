import Header from "../../components/Header";
import Link from "next/link";

type CompletedScreenProps = {
    exercise: {
        initialPrompt: string;
        storyBeats: Array<{ text: string; type: "BUT" | "THEREFORE" }>;
        totalBeats: number;
        resetExercise: () => void;
    };
};

export default function CompletedScreen({ exercise }: CompletedScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Story Complete!" 
                    subtitle="Here's your completed story with But/Therefore beats" 
                />
                
                <div className="bg-gray-800 rounded-lg p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Your Story</h2>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 shadow-lg">
                            <p className="text-gray-200 leading-relaxed text-lg space-y-4">
                                <span className="block mb-4 text-white">
                                    {exercise.initialPrompt}
                                </span>
                                {exercise.storyBeats.map((beat, index) => (
                                    <span key={index} className="inline">
                                        {" "}
                                        <span className="inline-flex items-center font-semibold text-lg">
                                            <span className={`
                                                ${beat.type === "BUT" ? "text-red-400" : "text-emerald-400"}
                                                transition-colors duration-200
                                            `}>
                                                {beat.type}
                                            </span>
                                        </span>
                                        {" "}
                                        <span>{beat.text}</span>
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={exercise.resetExercise}
                            className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 
                                     text-white rounded-lg text-center font-medium
                                     hover:from-blue-500 hover:to-blue-600 
                                     transition-all duration-200 shadow-lg"
                        >
                            Try Another Story
                        </button>
                        <Link
                            href="/writing-exercises"
                            className="px-6 py-3 bg-gradient-to-br from-gray-600 to-gray-700 
                                     text-white rounded-lg text-center font-medium
                                     hover:from-gray-500 hover:to-gray-600 
                                     transition-all duration-200 shadow-lg"
                        >
                            Back to Exercises
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
