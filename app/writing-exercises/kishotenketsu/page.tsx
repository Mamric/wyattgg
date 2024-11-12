"use client";

import { useKishotenketsuExercise } from "./hooks/useKishotenketsuExercise";
import StartScreen from "./components/StartScreen";
import ExerciseScreen from "./components/ExerciseScreen";
import CompletedScreen from "./components/CompletedScreen";

export default function KishotenketsuPage() {
    const exercise = useKishotenketsuExercise();

    if (exercise.exerciseState === "start") {
        return <StartScreen onBegin={exercise.beginExercise} />;
    }

    if (exercise.exerciseState === "completed") {
        return <CompletedScreen exercise={exercise} />;
    }

    return <ExerciseScreen exercise={exercise} />;
}
