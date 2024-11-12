import Header from "../../components/Header";
import { useState } from "react";

type ExerciseScreenProps = {
    exercise: {
        initialPrompt: string;
        currentBeatType: "BUT" | "THEREFORE";
        storyBeats: Array<{ text: string; type: "BUT" | "THEREFORE" }>;
        currentBeat: number;
        totalBeats: number;
        beatsRemaining: number;
        allowUserChoice: boolean;
		// eslint-disable-next-line no-unused-vars
        submitBeat: (text: string, userSelectedType?: "BUT" | "THEREFORE") => void;
    };
};

export default function ExerciseScreen({ exercise }: ExerciseScreenProps) {
    const [currentInput, setCurrentInput] = useState("");
    const [selectedType, setSelectedType] = useState<"BUT" | "THEREFORE">("BUT");
    
    const handleSubmit = () => {
        if (currentInput.trim()) {
            exercise.submitBeat(
                currentInput.trim(), 
                exercise.allowUserChoice ? selectedType : undefined
            );
            setCurrentInput("");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="But/Therefore Story Exercise" 
                    subtitle="Continue the story using But and Therefore beats" 
                />
                
                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Beat {exercise.currentBeat + 1} of {exercise.totalBeats}</span>
                            <span>{exercise.beatsRemaining} beats remaining</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${(exercise.currentBeat / exercise.totalBeats) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Story So Far */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Story So Far</h3>
                        <p className="text-gray-300 italic mb-4 pl-2 border-l-4 border-blue-400/30">
                            {exercise.initialPrompt}
                        </p>
                        {exercise.storyBeats.map((beat, index) => (
                            <div key={index} className="mb-2 pl-2 border-l-4 border-blue-400/30">
                                <span className={`text-sm font-semibold ${
                                    beat.type === "BUT" ? "text-red-400" : "text-emerald-400"
                                }`}>
                                    {beat.type}:{" "}
                                </span>
                                <span className="text-gray-300 italic">{beat.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Current Beat Input */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            {exercise.allowUserChoice ? (
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-semibold text-orange-400">
                                        Choose your beat type:
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedType("BUT")}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all
                                                ${selectedType === "BUT" 
                                                    ? "bg-red-500 text-white" 
                                                    : "bg-gray-600 text-gray-300 hover:bg-red-500/30"
                                                }`}
                                        >
                                            BUT
                                        </button>
                                        <button
                                            onClick={() => setSelectedType("THEREFORE")}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all
                                                ${selectedType === "THEREFORE" 
                                                    ? "bg-emerald-500 text-white" 
                                                    : "bg-gray-600 text-gray-300 hover:bg-emerald-500/30"
                                                }`}
                                        >
                                            THEREFORE
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <h3 className="text-lg font-semibold text-orange-400">
                                    Continue with a {exercise.currentBeatType} beat:
                                </h3>
                            )}
                            {exercise.beatsRemaining <= 2 && (
                                <span className="text-sm text-yellow-400">
                                    ({exercise.beatsRemaining} beats left - think about wrapping up!)
                                </span>
                            )}
                        </div>
                        <textarea
                            className="w-full p-3 bg-gray-800 text-white rounded-lg resize-y min-h-[100px] 
                                     border-2 border-gray-600 focus:border-orange-400/50 focus:outline-none
                                     transition-colors placeholder-gray-500"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            placeholder={`Continue the story with a "${exercise.allowUserChoice ? selectedType : exercise.currentBeatType}" beat...`}
                            rows={4}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={!currentInput.trim()}
                            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg 
                                     hover:bg-orange-700 transition-colors disabled:opacity-50
                                     disabled:cursor-not-allowed"
                        >
                            Submit Beat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
