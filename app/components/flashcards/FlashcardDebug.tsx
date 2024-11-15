import { FlashcardGameState } from "./types";

interface FlashcardDebugProps {
    state: FlashcardGameState;
}

export default function FlashcardDebug({ state }: FlashcardDebugProps) {
    return (
        <div className="mt-8 p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <h3 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Debug State
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                    <p className="text-gray-400">
                        <span className="text-gray-500">Current Index:</span>{" "}
                        <span className="text-blue-400">{state.currentIndex}</span>
                    </p>
                    <p className="text-gray-400">
                        <span className="text-gray-500">Is Started:</span>{" "}
                        <span className={state.isStarted ? "text-green-400" : "text-red-400"}>
                            {String(state.isStarted)}
                        </span>
                    </p>
                    <p className="text-gray-400">
                        <span className="text-gray-500">Is Reverse Mode:</span>{" "}
                        <span className={state.isReverseMode ? "text-green-400" : "text-red-400"}>
                            {String(state.isReverseMode)}
                        </span>
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-400">
                        <span className="text-gray-500">Is Practice Mode:</span>{" "}
                        <span className={state.isInPracticeMode ? "text-green-400" : "text-red-400"}>
                            {String(state.isInPracticeMode)}
                        </span>
                    </p>
                    <p className="text-gray-400">
                        <span className="text-gray-500">Is Revealed:</span>{" "}
                        <span className={state.isRevealed ? "text-green-400" : "text-red-400"}>
                            {String(state.isRevealed)}
                        </span>
                    </p>
                </div>
            </div>

            {/* Deck displays side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full" />
                        <h4 className="text-blue-400 font-medium">
                            Main Deck ({state.deck.length} cards)
                        </h4>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg h-[400px] overflow-y-auto
                                  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {state.deck.map((card, i) => (
                            <p key={i} 
                               className={`py-0.5 ${
                                   i === state.currentIndex 
                                   ? "text-yellow-400 font-medium" 
                                   : "text-gray-400"
                               }`}>
                                {i+1}: {card.term}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                        <h4 className="text-green-400 font-medium">
                            Practice Deck ({state.practiceDeck.length} cards)
                        </h4>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg h-[400px] overflow-y-auto
                                  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {state.practiceDeck.map((card, i) => (
                            <p key={i} className="text-gray-400 py-0.5">
                                {i+1}: {card.term}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}