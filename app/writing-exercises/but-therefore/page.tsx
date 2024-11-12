"use client";

import { useButThereforeExercise } from "../hooks/useButThereforeExercise";
import StartScreen from "./components/StartScreen";
import CompletedScreen from "./components/CompletedScreen";
import ExerciseScreen from "./components/ExerciseScreen";

export default function WritingExercisesButTherefore() {
    const exercise = useButThereforeExercise();

    if (exercise.exerciseState === "start") {
        return <StartScreen onBegin={exercise.beginExercise} />;
    }

    if (exercise.exerciseState === "completed") {
        return <CompletedScreen exercise={exercise} />;
    }

    return <ExerciseScreen exercise={exercise} />;
}
