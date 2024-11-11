"use client";

import { useQuiz } from "../hooks/useQuiz";
import QuizScreen from "./components/QuizScreen";
import CompletedScreen from "./components/CompletedScreen";
import StartScreen from "./components/StartScreen";

export default function WritingExercisesQuiz() {
    const quiz = useQuiz();

    if (quiz.quizState === "start") {
        return <StartScreen onBegin={quiz.beginQuiz} />;
    }

    if (quiz.quizState === "completed") {
        return <CompletedScreen results={quiz.results} onRestart={quiz.restartQuiz} />;
    }

    return <QuizScreen currentQuestion={quiz.currentQuestion} onAnswer={quiz.handleAnswer} progress={quiz.progress} />;
}
