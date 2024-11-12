"use client";

import { useState } from "react";
import StartScreen from "./components/StartScreen";
import ExerciseScreen from "./components/ExerciseScreen";
import CompletedScreen from "./components/CompletedScreen";

type Screen = "start" | "exercise" | "completed";

export default function HeroesJourneyPage() {
    const [currentScreen, setCurrentScreen] = useState<Screen>("start");
    const [exercise, setExercise] = useState({
        currentStage: 1,
        storyBeats: [] as Array<{
            stage: number;
            stageName: string;
            content: string;
        }>,
    });

    const handleBegin = () => {
        setCurrentScreen("exercise");
    };

    const handleComplete = () => {
        setCurrentScreen("completed");
    };

    const handleReset = () => {
        setExercise({
            currentStage: 1,
            storyBeats: [],
        });
        setCurrentScreen("start");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            {currentScreen === "start" && (
                <StartScreen onBegin={handleBegin} />
            )}
            {currentScreen === "exercise" && (
                <ExerciseScreen 
                    exercise={exercise}
                    setExercise={setExercise}
                    onComplete={handleComplete}
                />
            )}
            {currentScreen === "completed" && (
                <CompletedScreen 
                    exercise={exercise}
                    onReset={handleReset}
                />
            )}
        </div>
    );
}
