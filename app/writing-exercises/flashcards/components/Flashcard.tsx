/* global setTimeout */
import { useState, useEffect } from "react";
import { LiteraryDevice } from "../../types";

type FlashcardProps = {
    device: LiteraryDevice;
    onNext: () => void;
    onShuffle: () => void;
    isReverseMode: boolean;
    isLastCard: boolean;
    currentIndex: number;
    deckLength: number;
    totalCards: number;
};

export default function Flashcard({
    device,
    onNext,
    onShuffle,
    isReverseMode,
    isLastCard,
    currentIndex,
    deckLength,
    totalCards,
}: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [displayedDevice, setDisplayedDevice] = useState(device);

    useEffect(() => {
        if (!isFlipped) {
            setDisplayedDevice(device);
        }
    }, [device, isFlipped]);

    const handleAction = () => {
        if (isFlipped) {
            if (isLastCard) {
                setIsFlipped(false);
                setTimeout(() => {
                    onShuffle();
                }, 275);
            } else {
                setIsFlipped(false);
                setTimeout(() => {
                    onNext();
                }, 275);
            }
        } else {
            setIsFlipped(true);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-300 text-sm sm:text-base">
                    Card {Math.min(currentIndex + 1, totalCards)} of {totalCards}
                </div>
                <button
                    onClick={() => {
                        setIsFlipped(false);
                        setTimeout(onShuffle, 275);
                    }}
                    className="px-4 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600 
                             transition-colors text-sm"
                >
                    Shuffle Deck
                </button>
            </div>

            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={handleAction}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                             transition-colors text-base"
                >
                    {isFlipped ? (isLastCard ? "Shuffle Deck" : "Next Device") : "Show Answer"}
                </button>
            </div>

            <div className="h-[650px] sm:h-[525px] perspective-1000">
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                        isFlipped ? "rotate-y-180" : ""
                    }`}
                >
                    {/* Front of card */}
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg p-4 sm:p-8 shadow-lg backface-hidden">
                        <div className="flex items-start sm:items-center justify-center h-full pt-8 sm:pt-0">
                            {isReverseMode ? (
                                <div className="text-center">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {displayedDevice.name}
                                    </h2>
                                    <p className="text-gray-400 text-sm">{displayedDevice.pronunciation}</p>
                                </div>
                            ) : (
                                <div className="max-w-lg">
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Definition</h3>
                                    <p className="text-gray-300 text-lg sm:text-xl">{displayedDevice.definition}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg shadow-lg backface-hidden rotate-y-180">
                        <div className="h-full overflow-y-auto p-4 sm:p-7">
                            <div className="space-y-3">
                                <div className="text-center">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                        {displayedDevice.name}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-2">{displayedDevice.pronunciation}</p>
                                    <div className="max-w-2xl mx-auto">
                                        <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-1">
                                            Definition
                                        </h3>
                                        <p className="text-gray-300 text-sm sm:text-base mb-3">
                                            {displayedDevice.definition}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-gray-700 rounded-lg p-3">
                                        <h3 className="text-base font-semibold text-blue-400 mb-1">Why use it?</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {displayedDevice.whyUseIt}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 rounded-lg p-3">
                                        <h3 className="text-base font-semibold text-green-400 mb-1">How to use it?</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {displayedDevice.howToUseIt}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-gray-700/50 rounded-lg p-2.5">
                                        <h3 className="text-sm font-semibold text-yellow-400 mb-1">Example</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed italic">
                                            {displayedDevice.example}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700/50 rounded-lg p-2.5">
                                        <h3 className="text-sm font-semibold text-purple-400 mb-1">Derivation</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {displayedDevice.derivation}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center pb-2">
                                    <p className="text-gray-400 text-sm">School: {displayedDevice.school}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
