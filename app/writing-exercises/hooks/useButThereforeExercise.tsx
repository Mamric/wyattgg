import { useState } from "react";
import prompts from "@/data/writing-exercises/but-therefore-prompts.json";

type StoryLength = "short" | "standard" | "extended";
type StoryMode = "standard" | "random" | "userChoice";
type StoryBeat = {
    text: string;
    type: "BUT" | "THEREFORE";
};

export function useButThereforeExercise() {
    const [exerciseState, setExerciseState] = useState<"start" | "in-progress" | "completed">("start");
    const [totalBeats, setTotalBeats] = useState<number>(0);
    const [currentBeat, setCurrentBeat] = useState<number>(0);
    const [initialPrompt, setInitialPrompt] = useState<string>("");
    const [storyBeats, setStoryBeats] = useState<StoryBeat[]>([]);
    const [currentBeatType, setCurrentBeatType] = useState<"BUT" | "THEREFORE">("BUT");
    const [storyMode, setStoryMode] = useState<StoryMode>("standard");
    const [allowUserChoice, setAllowUserChoice] = useState(false);

    const getBeatsForLength = (length: StoryLength): number => {
        switch (length) {
            case "short":
                return 5;
            case "standard":
                return Math.floor(Math.random() * 4) + 7; // 7-10 beats
            case "extended":
                return Math.floor(Math.random() * 6) + 15; // 15-20 beats
            default:
                return 7;
        }
    };

    const getNextBeatType = (currentType: "BUT" | "THEREFORE"): "BUT" | "THEREFORE" => {
        switch (storyMode) {
            case "standard":
                return currentType === "BUT" ? "THEREFORE" : "BUT";
            case "random":
                return Math.random() < 0.5 ? "BUT" : "THEREFORE";
            case "userChoice":
                return currentType; // Will be handled by user selection
            default:
                return "BUT";
        }
    };

    const beginExercise = (length: StoryLength, mode: StoryMode) => {
        const selectedBeats = getBeatsForLength(length);
        const randomPrompt = prompts.prompts[Math.floor(Math.random() * prompts.prompts.length)];
        
        setTotalBeats(selectedBeats);
        setInitialPrompt(randomPrompt);
        setStoryMode(mode);
        setAllowUserChoice(mode === "userChoice");
        setExerciseState("in-progress");
        setCurrentBeatType(Math.random() < 0.5 ? "BUT" : "THEREFORE");
    };

    const submitBeat = (beatText: string, userSelectedType?: "BUT" | "THEREFORE") => {
        const newBeat: StoryBeat = {
            text: beatText,
            type: userSelectedType || currentBeatType
        };

        setStoryBeats([...storyBeats, newBeat]);
        
        if (currentBeat + 1 === totalBeats) {
            setExerciseState("completed");
        } else {
            setCurrentBeat(currentBeat + 1);
            if (!allowUserChoice) {
                setCurrentBeatType(getNextBeatType(currentBeatType));
            }
        }
    };

    const resetExercise = () => {
        setExerciseState("start");
        setTotalBeats(0);
        setCurrentBeat(0);
        setInitialPrompt("");
        setStoryBeats([]);
        setCurrentBeatType("BUT");
        setStoryMode("standard");
        setAllowUserChoice(false);
    };

    return {
        exerciseState,
        totalBeats,
        currentBeat,
        initialPrompt,
        storyBeats,
        currentBeatType,
        beginExercise,
        submitBeat,
        resetExercise,
        beatsRemaining: totalBeats - currentBeat,
        allowUserChoice,
    };
}
