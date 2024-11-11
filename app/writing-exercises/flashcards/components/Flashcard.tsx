import { useState } from "react";
import { LiteraryDevice } from "../../types";

type FlashcardProps = {
    device: LiteraryDevice;
    onNext: () => void;
    isReverseMode: boolean;
};

export default function Flashcard({ device, onNext, isReverseMode }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <div className="mb-8">
                {!isFlipped ? (
                    <div className="text-center mb-6">
                        {!isReverseMode ? (
                            <h2 className="text-3xl font-bold text-white">{device.name}</h2>
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Definition</h3>
                                <p className="text-gray-300 text-xl">{device.definition}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{device.name}</h2>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">Definition</h3>
                            <p className="text-gray-300">{device.definition}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Why use it?</h3>
                                <p className="text-gray-300">{device.whyUseIt}</p>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-green-400 mb-2">How to use it?</h3>
                                <p className="text-gray-300">{device.howToUseIt}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400">School: {device.school}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                             transition-colors"
                >
                    {isFlipped ? "Hide Answer" : "Show Answer"}
                </button>
                <button
                    onClick={() => {
                        setIsFlipped(false);
                        onNext();
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 
                             transition-colors"
                >
                    Next Device
                </button>
            </div>
        </div>
    );
}
