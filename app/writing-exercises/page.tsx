"use client";

import { useState, useEffect } from "react";
import literaryDevices from "@/data/writing-exercises/literary-devices.json";
import templateSentences from "@/data/writing-exercises/template-sentences.json";

type TemplateSentences = {
    [key: string]: {
        devices: string[];
        sentences: string[];
    };
};

type LiteraryDevice = {
    name: string;
    definition: string;
    whyUseIt: string;
    howToUseIt: string;
    school: string;
};

type UserAnswers = {
    [key: string]: string;
};

type DeviceKey = keyof typeof literaryDevices;

type ExerciseState = "start" | "in-progress" | "completed";

type ExerciseResult = {
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    exercises: {
        [key: string]: {
            deviceName: string;
            exampleSentence: string;
            userAnswer: string;
        };
    };
};

// Type assertion for templateSentences
const typedTemplateSentences = templateSentences as TemplateSentences;

export default function WritingExercises() {
    const [exerciseState, setExerciseState] = useState<ExerciseState>("start");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [currentSentence, setCurrentSentence] = useState<string>("");

    const deviceKeys = Object.keys(literaryDevices) as DeviceKey[];
    const currentDevice = literaryDevices[deviceKeys[currentDeviceIndex]] as LiteraryDevice;

    const beginExercise = () => {
        setExerciseState("in-progress");
        setStartTime(new Date());
    };

    const submitExercises = () => {
        setExerciseState("completed");
        setEndTime(new Date());
    };

    const getRandomSentence = (school: string) => {
        const schoolSentences = typedTemplateSentences[school].sentences;
        const randomIndex = Math.floor(Math.random() * schoolSentences.length);
        return schoolSentences[randomIndex];
    };

    useEffect(() => {
        setCurrentSentence(getRandomSentence(currentDevice.school));
    }, [currentDeviceIndex, currentDevice.school]);

    const handleAnswerChange = (answer: string) => {
        setUserAnswers({
            ...userAnswers,
            [deviceKeys[currentDeviceIndex]]: answer,
        });
    };

    const goToNext = () => {
        if (currentDeviceIndex < deviceKeys.length - 1) {
            setCurrentDeviceIndex(currentDeviceIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentDeviceIndex > 0) {
            setCurrentDeviceIndex(currentDeviceIndex - 1);
        }
    };

    const exportResults = () => {
        if (!startTime || !endTime) return;

        const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

        const exercises = deviceKeys.reduce((acc, key) => {
            acc[key] = {
                deviceName: literaryDevices[key].name,
                exampleSentence: typedTemplateSentences[literaryDevices[key].school].sentences[0],
                userAnswer: userAnswers[key] || "No answer provided",
            };
            return acc;
        }, {} as ExerciseResult["exercises"]);

        const results: ExerciseResult = {
            date: startTime.toLocaleDateString(),
            startTime: startTime.toLocaleTimeString(),
            endTime: endTime.toLocaleTimeString(),
            duration,
            exercises,
        };

        // Create and download the JSON file
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `writing-exercise-${startTime.toISOString().split("T")[0]}.json`;
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

    if (exerciseState === "start") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <h1 className="text-4xl font-bold text-white mb-6">Writing Exercises</h1>
                        <p className="text-gray-300 text-lg mb-8">
                            Practice using various literary devices to enhance your writing skills. You'll be presented
                            with different literary devices and example sentences to practice with. Take your time and
                            be creative with your responses.
                        </p>
                        <button
                            onClick={beginExercise}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg text-xl 
                                     hover:bg-blue-700 transition-colors"
                        >
                            Begin
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (exerciseState === "completed") {
        const duration = endTime && startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="bg-gray-800 rounded-lg p-8">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Exercise Complete!</h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={exportResults}
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
                                >
                                    Export Results
                                </button>
                                <button
                                    onClick={restartExercise}
                                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors w-full sm:w-auto"
                                >
                                    Start New Exercise
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-700 rounded-lg p-6">
                            <div className="text-gray-300">
                                <div className="flex flex-col space-y-1 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="font-semibold text-sm">Date:</span>
                                    </div>
                                    <span className="text-base pl-7">
                                        {startTime?.toLocaleDateString(undefined, {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="font-semibold text-sm">Duration:</span>
                                    </div>
                                    <span className="text-base pl-7">
                                        {Math.floor(duration / 60)} minutes, {duration % 60} seconds
                                    </span>
                                </div>
                            </div>
                            <div className="text-gray-300">
                                <div className="flex flex-col space-y-1 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="font-semibold text-sm">Start Time:</span>
                                    </div>
                                    <span className="text-base pl-7">
                                        {startTime?.toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="font-semibold text-sm">End Time:</span>
                                    </div>
                                    <span className="text-base pl-7">
                                        {endTime?.toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {deviceKeys.map((key) => (
                                <div key={key} className="bg-gray-700 rounded-lg p-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                        <h3 className="text-xl font-bold text-white mb-2 md:mb-0">
                                            {literaryDevices[key].name}
                                        </h3>
                                        <div className="text-sm text-gray-400">{literaryDevices[key].school}</div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-gray-400 text-sm">
                                            <span className="font-semibold">Example Sentence:</span>{" "}
                                            <span className="italic">
                                                {typedTemplateSentences[literaryDevices[key].school].sentences[0]}
                                            </span>
                                        </p>
                                        <div className="bg-gray-800 rounded p-4">
                                            <p className="text-gray-300 break-words whitespace-pre-wrap">
                                                <span className="font-semibold text-sm">Your Answer:</span>{" "}
                                                <span
                                                    className={`block mt-1 ${
                                                        userAnswers[key] ? "text-white" : "text-gray-500 italic"
                                                    }`}
                                                >
                                                    {userAnswers[key] || "No answer provided"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Writing Exercises</h1>
                    <p className="text-gray-300 text-lg mb-4">Practice literary devices with example sentences</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentDevice.name}</h2>
                        <p className="text-gray-300 mb-4">{currentDevice.definition}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Why use it?</h3>
                                <p className="text-gray-300">{currentDevice.whyUseIt}</p>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-green-400 mb-2">How to use it?</h3>
                                <p className="text-gray-300">{currentDevice.howToUseIt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-400 mb-2">Example Sentence</h3>
                            <p className="text-gray-300 italic pl-2 border-l-4 border-purple-400/30">
                                {currentSentence}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-orange-400 mb-2">Your Response</h3>
                            <textarea
                                className="w-full p-3 bg-gray-800 text-white rounded-lg resize-y min-h-[100px] 
                                          border-2 border-gray-600 focus:border-orange-400/50 focus:outline-none
                                          transition-colors placeholder-gray-500"
                                rows={3}
                                value={userAnswers[deviceKeys[currentDeviceIndex]] || ""}
                                onChange={(e) => handleAnswerChange(e.target.value)}
                                placeholder={`Rewrite the sentence using ${currentDevice.name.toLowerCase()}...`}
                            />
                            <p className="text-gray-400 text-sm mt-2">
                                Try to incorporate {currentDevice.name.toLowerCase()} into your response.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={goToPrevious}
                            disabled={currentDeviceIndex === 0}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 
                                     hover:bg-blue-700 transition-colors"
                        >
                            Previous
                        </button>
                        {currentDeviceIndex === deviceKeys.length - 1 ? (
                            <button
                                onClick={submitExercises}
                                className="px-4 py-2 bg-green-600 text-white rounded 
                                         hover:bg-green-700 transition-colors"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={goToNext}
                                className="px-4 py-2 bg-blue-600 text-white rounded 
                                         hover:bg-blue-700 transition-colors"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
