import { useMemo } from 'react';
import stages from "@/data/writing-exercises/heroes-journey/journey-stages.json";

type JourneyProgressProps = {
    currentStage: number;
    totalStages: number;
    completedStages: number[];
};

// Define acts and their corresponding emojis
const acts = [
    { 
        name: "Departure", 
        emoji: "🏠", 
        stages: [1, 2, 3, 4], 
        width: 25,
        color: "from-purple-600 to-indigo-600"
    },
    { 
        name: "Initiation", 
        emoji: "⚔️", 
        stages: [5, 6, 7], 
        width: 25,
        color: "from-indigo-600 to-blue-600"
    },
    { 
        name: "Ordeal", 
        emoji: "🔥", 
        stages: [8, 9], 
        width: 25,
        color: "from-blue-600 to-purple-600"
    },
    { 
        name: "Return", 
        emoji: "👑", 
        stages: [10, 11, 12], 
        width: 25,
        color: "from-purple-600 to-indigo-600"
    }
];

export default function JourneyProgress({ currentStage, totalStages, completedStages }: JourneyProgressProps) {
    const currentAct = useMemo(() => {
        return acts.find(act => act.stages.includes(currentStage)) || acts[0];
    }, [currentStage]);

    const currentStageName = useMemo(() => {
        const stageData = stages.tutorial.stages.find(s => s.stageNumber === currentStage);
        return stageData?.stageName || "";
    }, [currentStage]);

    return (
        <div className="w-full sticky top-0 bg-gray-900/95 backdrop-blur-sm p-4 rounded-lg shadow-xl z-10">
            {/* Act Title */}
            <div className="text-center mb-4">
                <span className="text-2xl">{currentAct.emoji}</span>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 
                             bg-clip-text text-transparent">
                    Act {acts.indexOf(currentAct) + 1}: {currentAct.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                    {currentStageName}
                </p>
            </div>

            {/* Progress Section */}
            <div className="space-y-4">
                {/* Progress Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                                     text-purple-200 bg-purple-800/50">
                            Progress: {Math.round((completedStages.length / totalStages) * 100)}%
                        </span>
                    </div>
                </div>

                {/* Progress Bar and Labels */}
                <div className="space-y-2">
                    {/* Act Labels */}
                    <div className="flex">
                        {acts.map((act, index) => (
                            <div 
                                key={index} 
                                className="text-xs font-medium text-gray-400"
                                style={{ width: `${act.width}%` }}
                            >
                                {act.emoji} {act.name}
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar with Partition Lines */}
                    <div className="relative">
                        {/* Partition Lines */}
                        <div className="absolute inset-0 flex pointer-events-none">
                            <div className="w-1/4 border-r-2 border-gray-500/30 h-2" />
                            <div className="w-1/4 border-r-2 border-gray-500/30 h-2" />
                            <div className="w-1/4 border-r-2 border-gray-500/30 h-2" />
                            <div className="w-1/4" />
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="overflow-hidden h-2 flex rounded-full bg-gray-700/50">
                            {acts.map((act, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 bg-gradient-to-r ${act.color}`}
                                    style={{ 
                                        width: `${act.width}%`,
                                        opacity: index === acts.indexOf(currentAct) 
                                            ? 1 
                                            : index < acts.indexOf(currentAct)
                                                ? 0.8
                                                : 0.3
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stage Numbers */}
                    <div className="flex">
                        {acts.map((act, actIndex) => (
                            <div 
                                key={actIndex} 
                                className="flex justify-center gap-1"
                                style={{ width: `${act.width}%` }}
                            >
                                {act.stages.map(stageNum => (
                                    <div
                                        key={stageNum}
                                        className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                  text-xs font-medium transition-all duration-200 
                                                  ${stageNum === currentStage
                                                    ? "bg-purple-500 text-white"
                                                    : completedStages.includes(stageNum)
                                                        ? "bg-purple-700/50 text-purple-200"
                                                        : "bg-gray-700/50 text-gray-400"
                                                  }`}
                                    >
                                        {stageNum}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
