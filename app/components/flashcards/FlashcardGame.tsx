/* global setTimeout */
import { useReducer, useState } from "react";
import {
    FlashcardGameProps,
    FlashcardGameState,
    FlashcardGameAction,
    FlashcardData,
    FlashcardGameConfig,
} from "./types";
import FlashcardCard from "./FlashcardCard";
import FlashcardStart from "./FlashcardStart";
// import FlashcardDebug from "./FlashcardDebug";

const initialState: FlashcardGameState = {
    currentIndex: 0,
    isStarted: false,
    isReverseMode: false,
    deck: [],
    practiceDeck: [],
    isInPracticeMode: false,
    isRevealed: false,
    originalDeck: [],
};

function shuffleArray(array: FlashcardData[]): FlashcardData[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function gameReducer(state: FlashcardGameState, action: FlashcardGameAction): FlashcardGameState {
    switch (action.type) {
        case "START_GAME": {
            const shuffledDeck = shuffleArray(state.originalDeck);
            return {
                ...state,
                isStarted: true,
                isReverseMode: action.payload.reverseMode,
                deck: shuffledDeck,
                originalDeck: [...state.originalDeck],
                currentIndex: 0,
            };
        }

        case "NEXT_CARD":
            if (state.currentIndex < state.deck.length - 1) {
                return {
                    ...state,
                    currentIndex: state.currentIndex + 1,
                    isRevealed: false,
                };
            } else if (!state.isInPracticeMode && state.practiceDeck.length > 0) {
                return {
                    ...state,
                    deck: state.practiceDeck,
                    practiceDeck: [],
                    currentIndex: 0,
                    isInPracticeMode: true,
                    isRevealed: false,
                };
            }
            return state;

        case "REVEAL_CARD":
            return {
                ...state,
                isRevealed: true,
            };

        case "ADD_TO_PRACTICE":
            if (state.currentIndex === state.deck.length - 1) {
                return {
                    ...state,
                    deck: [...state.practiceDeck, action.payload],
                    practiceDeck: [],
                    currentIndex: 0,
                    isInPracticeMode: true,
                    isRevealed: false,
                };
            }
            return {
                ...state,
                practiceDeck: [...state.practiceDeck, action.payload],
                currentIndex: state.currentIndex + 1,
                isRevealed: false,
            };

        case "SHUFFLE_DECK": {
            return {
                ...state,
                deck: shuffleArray([...state.originalDeck]),
                practiceDeck: [],
                currentIndex: 0,
                isInPracticeMode: false,
                isRevealed: false,
            };
        }

        case "RESET_GAME": {
            return {
                ...initialState,
                deck: shuffleArray([...state.originalDeck]),
                originalDeck: state.originalDeck,
            };
        }

        case "START_PRACTICE_MODE":
            return {
                ...state,
                deck: state.practiceDeck,
                practiceDeck: [],
                currentIndex: 0,
                isInPracticeMode: true,
                isRevealed: false,
            };

        case "RESET_AND_SHUFFLE": {
            return {
                ...initialState,
                isStarted: true,
                deck: shuffleArray([...state.originalDeck]),
                originalDeck: state.originalDeck,
                isReverseMode: state.isReverseMode,
            };
        }

        default:
            return state;
    }
}

export default function FlashcardGame({ cards, title, subtitle, config = {} }: FlashcardGameProps) {
    const [state, dispatch] = useReducer(gameReducer, {
        ...initialState,
        originalDeck: cards,
    });
    const [isFlipped, setIsFlipped] = useState(false);

    const defaultConfig: FlashcardGameConfig = {
        allowPracticeMode: true,
        showExamples: true,
        showProgress: true,
        allowShuffle: true,
        reverseMode: false,
        additionalFields: [],
        ...config,
    };

    const handleStart = (reverseMode: boolean) => {
        dispatch({ type: "START_GAME", payload: { reverseMode } });
    };

    const handleReveal = () => {
        setIsFlipped(true);
        dispatch({ type: "REVEAL_CARD" });
    };

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            if (isLastCard) {
                if (state.isInPracticeMode || state.practiceDeck.length === 0) {
                    dispatch({ type: "SHUFFLE_DECK" });
                } else {
                    dispatch({ type: "START_PRACTICE_MODE" });
                }
            } else {
                dispatch({ type: "NEXT_CARD" });
            }
        }, 275);
    };

    const handleAddToPractice = (card: FlashcardData) => {
        setIsFlipped(false);
        setTimeout(() => {
            dispatch({ type: "ADD_TO_PRACTICE", payload: card });
        }, 275);
    };

    const handleShuffle = () => {
        setIsFlipped(false);
        setTimeout(() => {
            if (state.isInPracticeMode) {
                dispatch({ type: "RESET_AND_SHUFFLE" });
            } else {
                dispatch({ type: "SHUFFLE_DECK" });
            }
        }, 275);
    };

    // const handleReset = () => {
    //     setIsFlipped(false);

    //     dispatch({ type: "RESET_GAME" });
    // };

    const currentCard = state.deck[state.currentIndex];
    const isLastCard = state.currentIndex === state.deck.length - 1;

    if (!state.isStarted) {
        return (
            <FlashcardStart
                title={title}
                subtitle={subtitle}
                onBegin={handleStart}
                config={defaultConfig}
                hideHeader={defaultConfig.hideHeader}
            />
        );
    }

    return (
        <div className="">
            {/* Top section */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-300 text-sm sm:text-base">
                    {state.isInPracticeMode
                        ? `Reviewing card ${state.currentIndex + 1} of ${state.deck.length}`
                        : `Card ${state.currentIndex + 1} of ${state.deck.length}`}
                </div>
                <button
                    onClick={handleShuffle}
                    className="px-4 py-1.5 bg-gray-700 text-white rounded 
                             hover:bg-gray-600 transition-colors text-sm"
                >
                    Shuffle Deck
                </button>
            </div>

            {/* Main action buttons */}
            <div className="flex justify-center gap-4 mb-4">
                {defaultConfig.allowPracticeMode && !state.isInPracticeMode && state.isRevealed && (
                    <button
                        onClick={() => handleAddToPractice(currentCard)}
                        className="px-6 py-2 bg-gray-600 text-white rounded 
                                 hover:bg-gray-700 transition-colors text-base"
                    >
                        Practice Again Later
                    </button>
                )}
                <button
                    onClick={state.isRevealed ? handleNext : handleReveal}
                    className="px-6 py-2 bg-blue-600 text-white rounded 
                             hover:bg-blue-700 transition-colors text-base"
                >
                    {state.isRevealed
                        ? isLastCard
                            ? state.isInPracticeMode || state.practiceDeck.length === 0
                                ? "Shuffle Deck"
                                : "Start Practice"
                            : "Next Card"
                        : "Show Answer"}
                </button>
            </div>

            {/* Main Card */}
            <FlashcardCard
                card={currentCard}
                isRevealed={state.isRevealed}
                onReveal={handleReveal}
                onNext={handleNext}
                onAddToPractice={handleAddToPractice}
                isInPracticeMode={state.isInPracticeMode}
                currentIndex={state.currentIndex}
                totalCards={state.deck.length}
                isReverseMode={state.isReverseMode}
                config={defaultConfig}
                isLastCard={isLastCard}
                isFlipped={isFlipped}
            />
        </div>
    );
}

export { FlashcardGame };
