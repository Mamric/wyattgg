import { useState } from "react";
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
    const [furthestIndex, setFurthestIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [deviceSentences, setDeviceSentences] = useState<{ [key: string]: string }>({});

    const currentDevice = typedLiteraryDevices[deviceKeys[currentDeviceIndex]];
    const currentSentence = deviceSentences[deviceKeys[currentDeviceIndex]] || "";

    // Initialize random sentences for all devices when exercise begins
    const initializeExercise = () => {
        const sentences: { [key: string]: string } = {};
        deviceKeys.forEach((key) => {
            const device = typedLiteraryDevices[key];
            const availableSentences = typedTemplateSentences[device.school].sentences;
            const randomIndex = Math.floor(Math.random() * availableSentences.length);
            sentences[key] = availableSentences[randomIndex];
        });
        setDeviceSentences(sentences);
        setExerciseState("in-progress");
        setStartTime(new Date());
    };

    const beginExercise = () => {
        initializeExercise();
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
            const nextIndex = currentDeviceIndex + 1;
            setCurrentDeviceIndex(nextIndex);
            setFurthestIndex(Math.max(furthestIndex, nextIndex));
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
                    exampleSentence: deviceSentences[key],
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
        setFurthestIndex(0); // Add this line
        setUserAnswers({});
        setDeviceSentences({});
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
        deviceSentences,
        furthestIndex,
        setCurrentDeviceIndex,
        beginExercise,
        submitExercises,
        handleAnswerChange,
        goToNext,
        goToPrevious,
        exportResults,
        restartExercise,
    };
}
