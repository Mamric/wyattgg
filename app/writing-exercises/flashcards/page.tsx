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
    const [practiceDeck, setPracticeDeck] = useState<LiteraryDevice[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInPracticeMode, setIsInPracticeMode] = useState(false);

    useEffect(() => {
        if (deck.length > 0) {
            setCurrentIndex(0);
        }
    }, [deck.length]);

    const handleNext = () => {
        if (currentIndex < deck.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (!isInPracticeMode && practiceDeck.length > 0) {
            // Switch to practice deck
            setDeck(practiceDeck);
            setPracticeDeck([]);
            setCurrentIndex(0);
            setIsInPracticeMode(true);
        }
    };

    const handleAddToPracticeDeck = (device: LiteraryDevice) => {
        setPracticeDeck([...practiceDeck, device]);
        if (currentIndex === deck.length - 1) {
            // If this is the last card, immediately switch to practice deck
            setDeck([...practiceDeck, device]);
            setPracticeDeck([]);
            setCurrentIndex(0);
            setIsInPracticeMode(true);
        } else {
            handleNext();
        }
    };

    const handleBegin = (reverse: boolean) => {
        setIsReverseMode(reverse);
        setDeck(shuffleDeck());
        setIsStarted(true);
    };

    const handleShuffle = () => {
        setDeck(shuffleDeck());
        setPracticeDeck([]);
        setCurrentIndex(0);
        setIsInPracticeMode(false);
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
                    onAddToPractice={handleAddToPracticeDeck}
                    isLastCard={currentIndex === deck.length - 1}
                    onShuffle={handleShuffle}
                    currentIndex={currentIndex}
                    totalCards={deck.length}
                    isInPracticeMode={isInPracticeMode}
                    showPracticeButton={!isInPracticeMode}
                    practiceDeckLength={practiceDeck.length}
                />
            </div>
        </div>
    );
}
