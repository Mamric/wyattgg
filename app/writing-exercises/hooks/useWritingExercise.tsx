import { useState, useEffect } from "react";
import literaryDevices from "@/data/writing-exercises/literary-devices.json";
import templateSentences from "@/data/writing-exercises/template-sentences.json";
import { ExerciseState, LiteraryDevice, UserAnswers, ExerciseResult } from "../types";

type TemplateSentences = {
    [key: string]: {
        devices: string[];
        sentences: string[];
    };
};

const typedTemplateSentences = templateSentences as TemplateSentences;
const typedLiteraryDevices = literaryDevices as { [key: string]: LiteraryDevice };
const deviceKeys = Object.keys(typedLiteraryDevices);

export function useWritingExercise() {
    const [exerciseState, setExerciseState] = useState<ExerciseState>("start");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [currentSentence, setCurrentSentence] = useState<string>("");

    const currentDevice = typedLiteraryDevices[deviceKeys[currentDeviceIndex]];

    useEffect(() => {
        if (currentDevice) {
            const sentences = typedTemplateSentences[currentDevice.school].sentences;
            const randomIndex = Math.floor(Math.random() * sentences.length);
            setCurrentSentence(sentences[randomIndex]);
        }
    }, [currentDevice]);

    const beginExercise = () => {
        setExerciseState("in-progress");
        setStartTime(new Date());
    };

    const submitExercises = () => {
        setExerciseState("completed");
        setEndTime(new Date());
    };

    const handleAnswerChange = (value: string) => {
        setUserAnswers((prev) => ({
            ...prev,
            [deviceKeys[currentDeviceIndex]]: value,
        }));
    };

    const goToNext = () => {
        if (currentDeviceIndex < deviceKeys.length - 1) {
            setCurrentDeviceIndex((prev) => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentDeviceIndex > 0) {
            setCurrentDeviceIndex((prev) => prev - 1);
        }
    };

    const exportResults = () => {
        const results: ExerciseResult = {
            date: startTime?.toLocaleDateString() || "",
            startTime: startTime?.toLocaleTimeString() || "",
            endTime: endTime?.toLocaleTimeString() || "",
            duration: startTime && endTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0,
            exercises: deviceKeys.reduce((acc, key) => {
                acc[key] = {
                    deviceName: typedLiteraryDevices[key].name,
                    exampleSentence: typedTemplateSentences[typedLiteraryDevices[key].school].sentences[0],
                    userAnswer: userAnswers[key] || "No answer provided",
                };
                return acc;
            }, {} as ExerciseResult["exercises"]),
        };

        const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `writing-exercise-${results.date}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const restartExercise = () => {
        setExerciseState("start");
        setStartTime(null);
        setEndTime(null);
        setCurrentDeviceIndex(0);
        setUserAnswers({});
        setCurrentSentence("");
    };

    return {
        exerciseState,
        startTime,
        endTime,
        currentDevice,
        currentSentence,
        userAnswers,
        deviceKeys,
        currentDeviceIndex,
        beginExercise,
        submitExercises,
        handleAnswerChange,
        goToNext,
        goToPrevious,
        exportResults,
        restartExercise,
    };
}
