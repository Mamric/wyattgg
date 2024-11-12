import Header from "../../components/Header";
import tutorial from "@/data/writing-exercises/kishotenketsu/kishotenketsu-tutorial.json";

type CompletedScreenProps = {
    exercise: {
        storyParts: Array<{
            part: number;
            partName: string;
            content: string;
        }>;
        resetExercise: () => void;
    };
};

export default function CompletedScreen({ exercise }: CompletedScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Story Complete!" 
                    subtitle="Here's your completed Kishōtenketsu story" 
                />
                
                {/* Conclusion with Buttons */}
                <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm mb-8">
                    <p className="text-gray-300 mb-6">
                        {tutorial.tutorial.conclusion}
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={exercise.resetExercise}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg
                                     hover:bg-green-700 transition-colors transform 
                                     hover:scale-105 transition-all duration-200
                                     text-sm sm:text-base"
                        >
                            Write Another Story
                        </button>
                        <button
                            onClick={() => {
                                const text = exercise.storyParts
                                    .map(part => `${part.partName}:\n${part.content}\n`)
                                    .join('\n');
                                if (typeof window !== 'undefined') {
                                    window.navigator.clipboard.writeText(text)
                                        .then(() => window.alert('Copied to clipboard!'))
                                        .catch(console.error);
                                }
                            }}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white rounded-lg
                                     hover:bg-gray-700 transition-colors transform 
                                     hover:scale-105 transition-all duration-200
                                     text-sm sm:text-base"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Completed Story */}
                    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-6">Your Story</h2>
                        <div className="space-y-6">
                            {exercise.storyParts.map((part, index) => (
                                <div 
                                    key={index}
                                    className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 
                                             rounded-lg p-4 shadow-md hover:from-gray-700/40 
                                             hover:to-gray-800/40 transition-all duration-200
                                             border border-green-500/10 hover:border-green-500/20"
                                >
                                    <h3 className="text-lg font-medium text-green-400 mb-2 
                                               flex items-center gap-2">
                                        <span className="text-xs bg-green-500/10 px-2 
                                                     py-0.5 rounded-full">
                                            Part {part.part}
                                        </span>
                                        {part.partName}
                                    </h3>
                                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {part.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Story Structure Analysis */}
                    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-white mb-4">Story Structure</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {tutorial.tutorial.parts.map((part) => (
                                <div 
                                    key={part.partNumber}
                                    className="bg-gray-700/50 rounded-lg p-4"
                                >
                                    <h3 className="text-lg font-medium text-green-400 mb-2">
                                        {part.partName}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-2">
                                        {part.purpose}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
