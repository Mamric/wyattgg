import Header from "../../components/Header";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import tutorial from "@/data/writing-exercises/but-therefore-tutorial.json";

type StoryLength = "short" | "standard" | "extended";
type StoryMode = "standard" | "random" | "userChoice";

type StartScreenProps = {
	// eslint-disable-next-line no-unused-vars
    onBegin: (length: StoryLength, mode: StoryMode) => void;
};

export default function StartScreen({ onBegin }: StartScreenProps) {
    const [selectedLength, setSelectedLength] = useState<StoryLength>("standard");
    const [selectedMode, setSelectedMode] = useState<StoryMode>("standard");
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);

    const lengthDescriptions = {
        short: "5 beats - Perfect for quick story practice",
        standard: "7-10 beats - Ideal for most stories",
        extended: "15-20 beats - For more complex narratives"
    };

    const modeDescriptions = {
        standard: "BUT and THEREFORE alternate back-to-back",
        random: "50/50 chance between BUT or THEREFORE for each beat",
        userChoice: "Choose which connector to use for each beat"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="But/Therefore Story Exercise" 
                    subtitle="Practice creating engaging story progressions using 'But' and 'Therefore' beats" 
                />

                {/* Tutorial Section */}
                <div className="bg-gray-800/50 rounded-lg p-6 mb-6 backdrop-blur-sm">
                    {/* Introduction - Always visible */}
                    <p className="text-lg text-gray-300 mb-6">
                        {tutorial.introduction}
                    </p>

                    {/* Collapsible Tutorial Content */}
                    <div className="border-t border-gray-700 pt-4">
                        <button
                            onClick={() => setIsTutorialOpen(!isTutorialOpen)}
                            className="w-full flex items-center justify-between text-white hover:text-blue-400 transition-colors"
                        >
                            <h2 className="text-xl font-semibold">Learn More About But/Therefore</h2>
                            {isTutorialOpen ? (
                                <ChevronUpIcon className="w-6 h-6" />
                            ) : (
                                <ChevronDownIcon className="w-6 h-6" />
                            )}
                        </button>

                        {isTutorialOpen && (
                            <div className="mt-4 space-y-6 text-gray-300">
                                {tutorial.sections.map((section, index) => (
                                    <div key={index} className="border-t border-gray-700 pt-4">
                                        <h3 className="text-lg font-semibold text-blue-400 mb-3">
                                            {section.title}
                                        </h3>

                                        {section.points && (
                                            <ul className="list-disc list-inside space-y-2 ml-4">
                                                {section.points.map((point, i) => (
                                                    <li key={i}>
                                                        <span className="text-blue-400 font-medium">
                                                            {point.split(":")[0]}
                                                        </span>
                                                        : {point.split(":")[1]}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.example && (
                                            <div className="bg-gray-700/50 rounded-lg p-4 mt-3">
                                                <p className="text-white mb-2">{section.example.start}</p>
                                                {section.example.progression.map((beat, i) => (
                                                    <p key={i} className="ml-4">
                                                        <span className={`font-semibold ${
                                                            beat.type === "BUT" ? "text-red-400" : "text-emerald-400"
                                                        }`}>
                                                            {beat.type}
                                                        </span>
                                                        {" "}{beat.text}
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        {section.examples && (
                                            <div className="space-y-4">
                                                {section.examples.map((example, i) => (
                                                    <div key={i} className="bg-gray-700/50 rounded-lg p-4">
                                                        <h4 className="text-white font-semibold mb-1">
                                                            {example.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-400 mb-2">
                                                            by {example.author}
                                                        </p>
                                                        <p className="text-white mb-2">{example.start}</p>
                                                        {example.progression.map((beat, j) => (
                                                            <p key={j} className="ml-4">
                                                                <span className={`font-semibold ${
                                                                    beat.type === "BUT" ? "text-red-400" : "text-emerald-400"
                                                                }`}>
                                                                    {beat.type}
                                                                </span>
                                                                {" "}{beat.text}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-8">
                    <div className="space-y-8">
                        {/* Story Length Selection */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Choose Story Length</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {(Object.keys(lengthDescriptions) as StoryLength[]).map((length) => (
                                    <button
                                        key={length}
                                        onClick={() => setSelectedLength(length)}
                                        className={`p-4 rounded-lg border-2 transition-all ${
                                            selectedLength === length
                                                ? "border-blue-500 bg-blue-500/10"
                                                : "border-gray-600 hover:border-blue-500/50"
                                        }`}
                                    >
                                        <h4 className="text-lg font-medium text-white capitalize mb-2">
                                            {length}
                                        </h4>
                                        <p className="text-sm text-gray-300">
                                            {lengthDescriptions[length]}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Story Mode Selection */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Choose Story Mode</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {(Object.keys(modeDescriptions) as StoryMode[]).map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setSelectedMode(mode)}
                                        className={`p-4 rounded-lg border-2 transition-all ${
                                            selectedMode === mode
                                                ? "border-orange-500 bg-orange-500/10"
                                                : "border-gray-600 hover:border-orange-500/50"
                                        }`}
                                    >
                                        <h4 className="text-lg font-medium text-white capitalize mb-2">
                                            {mode.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p className="text-sm text-gray-300">
                                            {modeDescriptions[mode]}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => onBegin(selectedLength, selectedMode)}
                            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                                     text-white rounded-lg text-xl font-medium
                                     hover:from-blue-500 hover:to-blue-600 
                                     transition-all duration-200 shadow-lg"
                        >
                            Begin Exercise
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
