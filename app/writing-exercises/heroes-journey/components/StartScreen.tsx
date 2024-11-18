import Header from "../../components/Header";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import tutorial from "@/data/writing-exercises/heroes-journey/journey-tutorial.json";
import stages from "@/data/writing-exercises/heroes-journey/journey-stages.json";
import examples from "@/data/writing-exercises/heroes-journey/journey-examples.json";

type StartScreenProps = {
    onBegin: () => void;
};

export default function StartScreen({ onBegin }: StartScreenProps) {
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);
    const [expandedExample, setExpandedExample] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="Hero's Journey Builder"
                    subtitle="Create a compelling story outline using the classic Hero's Journey structure"
                />

                {/* Tutorial Section */}
                <div className="bg-gray-800/50 rounded-lg p-6 mb-6 backdrop-blur-sm">
                    {/* Introduction - Always visible */}
                    <p className="text-lg text-gray-300 mb-6">{stages.tutorial.introduction}</p>

                    {/* Collapsible Tutorial Content */}
                    <div className="border-t border-gray-700 pt-4">
                        <button
                            onClick={() => setIsTutorialOpen(!isTutorialOpen)}
                            className="w-full flex items-center justify-between text-white hover:text-purple-400 transition-colors"
                        >
                            <h2 className="text-xl font-semibold">Learn More About The Hero's Journey</h2>
                            {isTutorialOpen ? (
                                <ChevronUpIcon className="w-6 h-6" />
                            ) : (
                                <ChevronDownIcon className="w-6 h-6" />
                            )}
                        </button>

                        {isTutorialOpen && (
                            <div className="mt-4 space-y-6 text-gray-300">
                                {/* General Tips */}
                                <div className="border-t border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold text-purple-400 mb-3">
                                        Tips for Your Journey
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        {tutorial.generalTips.tipsForUsingTheExercise.map((tip, i) => (
                                            <li key={i}>
                                                <span className="text-purple-400 font-medium">{tip.tip}</span>{" "}
                                                {tip.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Example Stories */}
                                <div className="border-t border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold text-purple-400 mb-3">
                                        Examples from Literature
                                    </h3>
                                    <div className="space-y-4">
                                        {examples.examples.map((example, i) => (
                                            <div key={i} className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                                                <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                                                    {example.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-gray-400 mb-2">
                                                    Hero: {example.hero}
                                                </p>
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    {(expandedExample === i
                                                        ? example.stages
                                                        : example.stages.slice(0, 4)
                                                    ).map((stage, j) => (
                                                        <p key={j} className="ml-2 sm:ml-4 text-xs sm:text-sm">
                                                            <span className="text-purple-400 font-medium">
                                                                {stage.stageName}:
                                                            </span>{" "}
                                                            {stage.description}
                                                        </p>
                                                    ))}
                                                    {example.stages.length > 4 && expandedExample !== i && (
                                                        <button
                                                            onClick={() => setExpandedExample(i)}
                                                            className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 
                                                                     transition-colors ml-2 sm:ml-4 italic"
                                                        >
                                                            Show {example.stages.length - 4} more stages...
                                                        </button>
                                                    )}
                                                    {expandedExample === i && (
                                                        <button
                                                            onClick={() => setExpandedExample(null)}
                                                            className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 
                                                                     transition-colors ml-2 sm:ml-4 italic"
                                                        >
                                                            Show less
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Begin Exercise Button */}
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <button
                        onClick={onBegin}
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 
                                 text-white rounded-lg text-xl font-medium
                                 hover:from-purple-500 hover:to-indigo-600 
                                 transition-all duration-200 shadow-lg"
                    >
                        Begin Your Hero's Journey
                    </button>
                </div>
            </div>
        </div>
    );
}
