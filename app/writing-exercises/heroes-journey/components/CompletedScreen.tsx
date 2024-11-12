import Header from "../../components/Header";
import Link from "next/link";

// Reuse the acts array from JourneyProgress
const acts = [
    { name: "Departure", emoji: "🏠", stages: [1, 2, 3, 4] },
    { name: "Initiation", emoji: "⚔️", stages: [5, 6, 7] },
    { name: "Ordeal", emoji: "🔥", stages: [8, 9] },
    { name: "Return", emoji: "👑", stages: [10, 11, 12] }
];

type CompletedScreenProps = {
    exercise: {
        storyBeats: Array<{
            stage: number;
            stageName: string;
            content: string;
        }>;
    };
    onReset: () => void;
};

export default function CompletedScreen({ exercise, onReset }: CompletedScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Journey Complete!" 
                    subtitle="Here's your hero's complete journey through all stages" 
                />
                
                <div className="bg-gray-800 rounded-lg p-8">
                    {/* Action Buttons at Top */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
                        <button
                            onClick={() => {
                                const text = exercise.storyBeats
                                    .map(beat => `${beat.stageName}:\n${beat.content}\n`)
                                    .join('\n');
                                if (typeof window !== 'undefined') {
                                    window.navigator.clipboard.writeText(text)
                                        .then(() => window.alert('Copied to clipboard!'))
                                        // eslint-disable-next-line no-console
                                        .catch(console.error);
                                }
                            }}
                            className="px-6 py-3 bg-gradient-to-br from-gray-600 to-gray-700 
                                     text-white rounded-lg text-center font-medium
                                     hover:from-gray-500 hover:to-gray-600 
                                     transition-all duration-200 shadow-lg"
                        >
                            Copy to Clipboard
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
                        <button
                            onClick={onReset}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 
                                     text-white rounded-lg text-lg font-medium
                                     hover:from-purple-500 hover:to-indigo-600 
                                     transition-all duration-200 shadow-lg"
                        >
                            Start a New Journey
                        </button>
                    </div>

                    {/* Journey Content */}
                    <div className="space-y-6">
                        {acts.map((act, actIndex) => {
                            const actBeats = exercise.storyBeats.filter(beat => 
                                act.stages.includes(beat.stage)
                            );

                            if (actBeats.length === 0) return null;

                            return (
                                <div key={actIndex} className="space-y-3">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2 
                                                 sticky top-0 bg-gray-800/95 py-2 backdrop-blur-sm">
                                        <span className="bg-gray-700/50 p-1.5 rounded-lg">
                                            {act.emoji}
                                        </span>
                                        <span className="bg-gradient-to-r from-purple-400 to-indigo-400 
                                                     bg-clip-text text-transparent">
                                            Act {actIndex + 1}: {act.name}
                                        </span>
                                    </h3>
                                    <div className="space-y-3 pl-6 border-l-2 border-purple-500/20">
                                        {actBeats.map((beat, index) => (
                                            <div 
                                                key={index} 
                                                className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 
                                                         rounded-lg p-3 sm:p-4 shadow-md hover:from-gray-700/40 
                                                         hover:to-gray-800/40 transition-all duration-200
                                                         border border-purple-500/10 hover:border-purple-500/20"
                                            >
                                                <h4 className="text-sm sm:text-base font-medium text-purple-300 mb-1 sm:mb-1.5 
                                                           flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                    <span className="text-[10px] sm:text-xs bg-purple-500/10 px-1.5 sm:px-2 
                                                          py-0.5 rounded-full whitespace-nowrap">
                                                        Stage {beat.stage}
                                                    </span>
                                                    {beat.stageName}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                                                    {beat.content}
                                                </p>
                                            </div>
                                        ))}
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
