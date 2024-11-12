import stages from "@/data/writing-exercises/heroes-journey/journey-stages.json";

type StagePromptProps = {
    stageNumber: number;
};

export default function StagePrompt({ stageNumber }: StagePromptProps) {
    const stageData = stages.tutorial.stages.find(s => s.stageNumber === stageNumber);

    if (!stageData) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
                {stageData.stageName}
            </h3>
            <p className="text-gray-300">
                {stageData.purpose}
            </p>
            <p className="text-purple-400 italic">
                {stageData.consider}
            </p>
        </div>
    );
}