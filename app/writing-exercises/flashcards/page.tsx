"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Flashcard from "./components/Flashcard";
import literaryDevices from "@/data/writing-exercises/literary-devices.json";
import { LiteraryDevice } from "../types";

const typedLiteraryDevices = literaryDevices as { [key: string]: LiteraryDevice };
const deviceKeys = Object.keys(typedLiteraryDevices);

function getRandomDevice(): LiteraryDevice {
    const randomKey = deviceKeys[Math.floor(Math.random() * deviceKeys.length)];
    return typedLiteraryDevices[randomKey];
}

export default function WritingExercisesFlashcards() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentDevice, setCurrentDevice] = useState<LiteraryDevice | null>(null);
    const [isReverseMode, setIsReverseMode] = useState(false);
    
    useEffect(() => {
        setCurrentDevice(getRandomDevice());
        setIsLoading(false);
    }, []);

    const handleNext = () => {
        setCurrentDevice(getRandomDevice());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Literary Devices Flashcards"
                    subtitle="Study literary devices with interactive flashcards"
                />
                <div className="mb-6 text-center">
                    <button
                        onClick={() => setIsReverseMode(!isReverseMode)}
                        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 
                                 transition-colors text-sm"
                    >
                        {isReverseMode ? "Switch to Normal Mode" : "Switch to Definition Mode"}
                    </button>
                </div>
                {isLoading || !currentDevice ? (
                    <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center">
                        <p className="text-gray-300 text-lg">Loading...</p>
                    </div>
                ) : (
                    <Flashcard 
                        device={currentDevice} 
                        onNext={handleNext} 
                        isReverseMode={isReverseMode}
                    />
                )}
            </div>
        </div>
    );
}
