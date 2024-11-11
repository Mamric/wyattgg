import { useState, useCallback } from 'react';
import literaryDevices from "@/data/writing-exercises/literary-devices.json";
import { LiteraryDevice } from "../types";

const typedLiteraryDevices = literaryDevices as { [key: string]: LiteraryDevice };
const deviceKeys = Object.keys(typedLiteraryDevices);

type QuizQuestion = {
    device: LiteraryDevice;
    correctDefinition: string;
    options: string[];
}

export function useQuiz() {
    const [quizState, setQuizState] = useState<"start" | "in-progress" | "completed">("start");
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);

    const generateQuestions = useCallback(() => {
        const allQuestions: QuizQuestion[] = deviceKeys.map(key => {
            const device = typedLiteraryDevices[key];
            const otherDefinitions = deviceKeys
                .filter(k => k !== key)
                .map(k => typedLiteraryDevices[k].definition)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            const options = [...otherDefinitions, device.definition]
                .sort(() => Math.random() - 0.5);

            return {
                device,
                correctDefinition: device.definition,
                options
            };
        }).sort(() => Math.random() - 0.5);

        setQuestions(allQuestions);
    }, []);

    const beginQuiz = () => {
        generateQuestions();
        setQuizState("in-progress");
    };

    const handleAnswer = (selectedDefinition: string) => {
        const currentQuestion = questions[currentIndex];
        const isCorrect = selectedDefinition === currentQuestion.correctDefinition;
        
        if (currentIndex === questions.length - 1) {
            setAnswers([...answers, isCorrect]);
            setQuizState("completed");
        } else {
            setAnswers([...answers, isCorrect]);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const calculateGrade = () => {
        const correctAnswers = answers.filter(answer => answer).length;
        const percentage = (correctAnswers / questions.length) * 100;
        
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
    };

    const restartQuiz = () => {
        setQuizState("start");
        setCurrentIndex(0);
        setAnswers([]);
        setQuestions([]);
    };

    const progress = {
        current: currentIndex + 1,
        total: questions.length,
        percentage: (currentIndex / questions.length) * 100
    };

    const results = {
        questions,
        answers,
        grade: calculateGrade(),
        totalCorrect: answers.filter(answer => answer).length,
        totalQuestions: questions.length
    };

    const currentQuestion = questions[currentIndex];

    return {
        quizState,
        currentQuestion,
        progress,
        results,
        beginQuiz,
        handleAnswer,
        restartQuiz
    };
}