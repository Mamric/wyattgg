"use client";

import { useWritingExercise } from "../hooks/useWritingExercise";
import StartScreen from "./components/StartScreen";
import CompletedScreen from "./components/CompletedScreen";
import ExerciseScreen from "./components/ExerciseScreen";

export default function WritingExercisesQuiz() {
    const exercise = useWritingExercise();

    if (exercise.exerciseState === "start") {
        return <StartScreen onBegin={exercise.beginExercise} />;
    }

    if (exercise.exerciseState === "completed") {
        return <CompletedScreen exercise={exercise} />;
    }

    return <ExerciseScreen exercise={exercise} />;
}
