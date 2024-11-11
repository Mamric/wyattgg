/* global setTimeout */
import { useState, useEffect } from "react";
import { LiteraryDevice } from "../../types";

type FlashcardProps = {
    device: LiteraryDevice;
    onNext: () => void;
    isReverseMode: boolean;
};

export default function Flashcard({ device, onNext, isReverseMode }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [displayedDevice, setDisplayedDevice] = useState(device);

    useEffect(() => {
        if (!isFlipped) {
            setDisplayedDevice(device);
        }
    }, [device, isFlipped]);

    const handleNext = () => {
        if (isFlipped) {
            setIsFlipped(false);
            // Wait for the flip animation to complete before changing content
            setTimeout(() => {
                onNext();
            }, 275);
        } else {
            onNext();
        }
    };

    return (
        <div>
            <div className="h-[475px] perspective-1000">
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                        isFlipped ? "rotate-y-180" : ""
                    }`}
                >
                    {/* Front of card */}
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg p-8 shadow-lg backface-hidden">
                        <div className="flex items-center justify-center h-full">
                            {!isReverseMode ? (
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-white mb-2">{displayedDevice.name}</h2>
                                    <p className="text-gray-400 text-sm">{displayedDevice.pronunciation}</p>
                                </div>
                            ) : (
                                <div className="max-w-lg">
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Definition</h3>
                                    <p className="text-gray-300 text-xl">{displayedDevice.definition}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg p-7 shadow-lg backface-hidden rotate-y-180">
                        <div className="space-y-3.5">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-1.5">{displayedDevice.name}</h2>
                                <p className="text-gray-400 text-sm mb-2">{displayedDevice.pronunciation}</p>
                                <div className="max-w-2xl mx-auto">
                                    <h3 className="text-lg font-semibold text-blue-400 mb-1.5">Definition</h3>
                                    <p className="text-gray-300 text-base mb-3">{displayedDevice.definition}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                <div className="bg-gray-700 rounded-lg p-3.5">
                                    <h3 className="text-base font-semibold text-blue-400 mb-1.5">Why use it?</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{displayedDevice.whyUseIt}</p>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3.5">
                                    <h3 className="text-base font-semibold text-green-400 mb-1.5">How to use it?</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{displayedDevice.howToUseIt}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                <div className="bg-gray-700/50 rounded-lg p-2.5">
                                    <h3 className="text-sm font-semibold text-yellow-400 mb-1">Example</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed italic">{displayedDevice.example}</p>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-2.5">
                                    <h3 className="text-sm font-semibold text-purple-400 mb-1">Derivation</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{displayedDevice.derivation}</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">School: {displayedDevice.school}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    {isFlipped ? "Hide Answer" : "Show Answer"}
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    Next Device
                </button>
            </div>
        </div>
    );
}
