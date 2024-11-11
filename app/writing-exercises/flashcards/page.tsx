"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Flashcard from "./components/Flashcard";
import StartScreen from "./components/StartScreen";
import literaryDevices from "@/data/writing-exercises/literary-devices.json";
import { LiteraryDevice } from "../types";

const typedLiteraryDevices = literaryDevices as { [key: string]: LiteraryDevice };

function shuffleDeck(): LiteraryDevice[] {
    const devices = Object.values(typedLiteraryDevices);
    for (let i = devices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [devices[i], devices[j]] = [devices[j], devices[i]];
    }
    return devices;
}

export default function WritingExercisesFlashcards() {
    const [isStarted, setIsStarted] = useState(false);
    const [isReverseMode, setIsReverseMode] = useState(false);
    const [deck, setDeck] = useState<LiteraryDevice[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (deck.length > 0) {
            setCurrentIndex(0);
        }
    }, [deck.length]);

    const handleNext = () => {
        if (currentIndex < deck.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleBegin = (reverse: boolean) => {
        setIsReverseMode(reverse);
        setDeck(shuffleDeck());
        setIsStarted(true);
    };

    const handleShuffle = () => {
        setDeck(shuffleDeck());
        setCurrentIndex(0);
    };

    if (!isStarted) {
        return <StartScreen onBegin={handleBegin} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="Literary Devices Flashcards"
                    subtitle="Study literary devices with interactive flashcards"
                />
                <Flashcard
                    device={deck[currentIndex]}
                    isReverseMode={isReverseMode}
                    onNext={handleNext}
                    isLastCard={currentIndex === deck.length - 1}
                    onShuffle={handleShuffle}
                    currentIndex={currentIndex}
                    deckLength={deck.length}
                    totalCards={deck.length}
                />
            </div>
        </div>
    );
}
