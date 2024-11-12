import { useState } from "react";
import tutorial from "@/data/writing-exercises/kishotenketsu/kishotenketsu-tutorial.json";

type ExerciseState = "start" | "in-progress" | "completed";

export function useKishotenketsuExercise() {
    const [exerciseState, setExerciseState] = useState<ExerciseState>("start");
    const [currentPart, setCurrentPart] = useState(1);
    const [storyParts, setStoryParts] = useState<
        Array<{
            part: number;
            partName: string;
            content: string;
        }>
    >([]);

    const beginExercise = () => {
        setExerciseState("in-progress");
    };

    const submitPart = (content: string) => {
        const currentPartData = tutorial.tutorial.parts.find((p) => p.partNumber === currentPart);

        if (!currentPartData) return;

        const newStoryParts = [
            ...storyParts,
            {
                part: currentPart,
                partName: currentPartData.partName,
                content: content.trim(),
            },
        ];

        if (currentPart === tutorial.tutorial.parts.length) {
            setStoryParts(newStoryParts);
            setExerciseState("completed");
        } else {
            setCurrentPart((prev) => prev + 1);
            setStoryParts(newStoryParts);
        }
    };

    const resetExercise = () => {
        setCurrentPart(1);
        setStoryParts([]);
        setExerciseState("start");
    };

    return {
        exerciseState,
        currentPart,
        storyParts,
        currentPartData: tutorial.tutorial.parts.find((p) => p.partNumber === currentPart),
        beginExercise,
        submitPart,
        resetExercise,
    };
}
