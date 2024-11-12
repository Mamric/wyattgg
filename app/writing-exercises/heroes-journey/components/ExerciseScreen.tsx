import { useState } from "react";
import Header from "../../components/Header";
import stages from "@/data/writing-exercises/heroes-journey/journey-stages.json";
import JourneyProgress from "./JourneyProgress";

type ExerciseScreenProps = {
    exercise: {
        currentStage: number;
        storyBeats: Array<{
            stage: number;
            stageName: string;
            content: string;
        }>;
    };
    setExercise: React.Dispatch<React.SetStateAction<{
        currentStage: number;
        storyBeats: Array<{
            stage: number;
            stageName: string;
            content: string;
        }>;
    }>>;
    onComplete: () => void;
};

export default function ExerciseScreen({ exercise, setExercise, onComplete }: ExerciseScreenProps) {
    const [currentInput, setCurrentInput] = useState("");
    const currentStageData = stages.tutorial.stages.find(s => s.stageNumber === exercise.currentStage);

    const handleSubmitStage = () => {
        if (!currentInput.trim()) return;

        const newStoryBeats = [...exercise.storyBeats, {
            stage: exercise.currentStage,
            stageName: currentStageData?.stageName || "",
            content: currentInput.trim()
        }];

        if (exercise.currentStage === stages.tutorial.stages.length) {
            setExercise(prev => ({
                ...prev,
                storyBeats: newStoryBeats
            }));
            onComplete();
        } else {
            setExercise(prev => ({
                currentStage: prev.currentStage + 1,
                storyBeats: newStoryBeats
            }));
            setCurrentInput("");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Header 
                title="Hero's Journey Builder"
                subtitle={`Stage ${exercise.currentStage}: ${currentStageData?.stageName}`}
            />

            {/* Progress Indicator - Now sticky */}
            <div className="mb-6">
                <JourneyProgress 
                    currentStage={exercise.currentStage}
                    totalStages={stages.tutorial.stages.length}
                    completedStages={exercise.storyBeats.map(beat => beat.stage)}
                />
            </div>

            {/* Two Column Layout */}
            <div className="space-y-6">
                {/* Current Input Section */}
                <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {currentStageData?.stageName}
                        </h3>
                        <p className="text-gray-300 mb-2">
                            {currentStageData?.purpose}
                        </p>
                        <p className="text-purple-400 italic">
                            {currentStageData?.consider}
                        </p>
                    </div>

                    <textarea
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder="Write your story for this stage..."
                        className="w-full h-32 bg-gray-700 text-white rounded-lg p-4 
                                 placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-purple-500"
                    />

                    <button
                        onClick={handleSubmitStage}
                        disabled={!currentInput.trim()}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700
                                 text-white rounded-lg font-medium
                                 hover:from-purple-500 hover:to-indigo-600
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-200"
                    >
                        {exercise.currentStage === stages.tutorial.stages.length ? 
                            "Complete Journey" : "Continue Journey"}
                    </button>
                </div>

                {/* Story So Far Section */}
                {exercise.storyBeats.length > 0 && (
                    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-purple-400 mb-4">
                            Your Journey So Far
                        </h3>
                        <div className="space-y-4">
                            {[...exercise.storyBeats].reverse().map((beat, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg p-4 
                                             border border-purple-500/10 hover:border-purple-500/20 
                                             transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                            Stage {beat.stage}
                                        </span>
                                        <h4 className="text-white font-semibold">
                                            {beat.stageName}
                                        </h4>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {beat.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
