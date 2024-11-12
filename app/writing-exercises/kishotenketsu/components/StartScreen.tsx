import { useState } from "react";
import Header from "../../components/Header";
import tutorial from "@/data/writing-exercises/kishotenketsu/kishotenketsu-tutorial.json";
import examples from "@/data/writing-exercises/kishotenketsu/kishotenketsu-examples.json";

type StartScreenProps = {
    onBegin: () => void;
};

export default function StartScreen({ onBegin }: StartScreenProps) {
    const [expandedExample, setExpandedExample] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header title={tutorial.tutorial.title} subtitle={tutorial.tutorial.introduction} />

                {/* Begin Button - Moved to top */}
                <div className="text-center mb-8">
                    <button
                        onClick={onBegin}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg text-xl 
                                 hover:bg-green-700 transition-colors transform hover:scale-105
                                 transition-all duration-200"
                    >
                        Begin Exercise
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Tutorial Section */}
                    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold text-white mb-4">Structure Overview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {tutorial.tutorial.parts.map((part) => (
                                <div key={part.partNumber} className="bg-gray-700/50 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-green-400 mb-2">{part.partName}</h3>
                                    <p className="text-gray-300 text-sm mb-2">{part.purpose}</p>
                                    <p className="text-gray-400 text-sm italic">{part.consider}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Examples Section */}
                    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold text-white mb-4">Example Stories</h2>
                        <div className="space-y-4">
                            {examples.examples.map((example, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700/70 transition-colors"
                                    onClick={() => setExpandedExample(expandedExample === i ? null : i)}
                                >
                                    <h3 className="text-lg font-medium text-green-400 mb-2">{example.title}</h3>
                                    <div className="space-y-2">
                                        {example.parts.map((part, j) => (
                                            <div
                                                key={j}
                                                className={`transition-all duration-200 ${
                                                    expandedExample === i || j < 2
                                                        ? "opacity-100 h-auto"
                                                        : "opacity-0 h-0 overflow-hidden"
                                                }`}
                                            >
                                                <span className="text-gray-400 font-medium">{part.partName}:</span>{" "}
                                                <span className="text-gray-300">{part.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {example.parts.length > 2 && (
                                        <button
                                            className="text-green-400 text-sm mt-2 hover:text-green-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedExample(expandedExample === i ? null : i);
                                            }}
                                        >
                                            {expandedExample === i ? "Show Less" : "Show More"}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
