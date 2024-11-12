import { useState } from "react";
import Header from "../../components/Header";
import tutorial from "@/data/writing-exercises/kishotenketsu/kishotenketsu-tutorial.json";

type ExerciseScreenProps = {
    exercise: {
        currentPart: number;
        storyParts: Array<{
            part: number;
            partName: string;
            content: string;
        }>;
        currentPartData?: {
            partNumber: number;
            partName: string;
            purpose: string;
            consider: string;
        };
        // eslint-disable-next-line
        submitPart: (content: string) => void;
    };
};

export default function ExerciseScreen({ exercise }: ExerciseScreenProps) {
    const [currentInput, setCurrentInput] = useState("");

    const handleSubmit = () => {
        if (currentInput.trim()) {
            exercise.submitPart(currentInput);
            setCurrentInput("");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Writing Your Kishōtenketsu Story"
                    subtitle={`Part ${exercise.currentPart} of ${tutorial.tutorial.parts.length}`}
                />

                <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                        <div className="flex justify-between mb-2 text-[10px] sm:text-sm">
                            {tutorial.tutorial.parts.map((part) => (
                                <div 
                                    key={part.partNumber}
                                    className={`font-medium px-1 sm:px-2 text-center ${
                                        part.partNumber === exercise.currentPart
                                            ? "text-green-400"
                                            : part.partNumber < exercise.currentPart
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                    }`}
                                >
                                    <span className="hidden sm:inline">{part.partName}</span>
                                    <span className="sm:hidden">
                                        {part.partName.split(' ')[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                            <div 
                                className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                                style={{ 
                                    width: `${((exercise.currentPart - 1) / tutorial.tutorial.parts.length) * 100}%` 
                                }}
                            />
                        </div>
                    </div>

                    {/* Current Part Input */}
                    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {exercise.currentPartData?.partName}
                            </h3>
                            <p className="text-gray-300 mb-2">
                                {exercise.currentPartData?.purpose}
                            </p>
                            <p className="text-green-400 italic">
                                {exercise.currentPartData?.consider}
                            </p>
                        </div>

                        <textarea
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            placeholder={`Write your ${exercise.currentPartData?.partName} here...`}
                            className="w-full h-48 bg-gray-700 text-white rounded-lg p-4 
                                     placeholder-gray-400 focus:outline-none focus:ring-2 
                                     focus:ring-green-500 mb-4"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={!currentInput.trim()}
                            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg
                                     hover:bg-green-700 transition-colors disabled:opacity-50
                                     disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {exercise.currentPart === tutorial.tutorial.parts.length 
                                ? "Complete Story" 
                                : "Continue to Next Part"}
                        </button>
                    </div>

                    {/* Story So Far */}
                    {exercise.storyParts.length > 0 && (
                        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-4">Story So Far</h2>
                            <div className="space-y-4">
                                {exercise.storyParts.map((part, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gray-700/50 rounded-lg p-4"
                                    >
                                        <h3 className="text-lg font-medium text-green-400 mb-2">
                                            {part.partName}
                                        </h3>
                                        <p className="text-gray-300 whitespace-pre-wrap">
                                            {part.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
