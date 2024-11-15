export interface FlashcardData {
    id: string; // Unique identifier
    term: string; // The main term/concept (front of card)
    definition: string; // The definition (back of card)
    example?: string; // Optional example
    additionalInfo?: {
        [key: string]: string; // For flexible additional fields
    };
}

export interface FlashcardGameConfig {
    allowPracticeMode?: boolean;
    showExamples?: boolean;
    additionalFields?: string[]; // Fields to show from additionalInfo
    reverseMode?: boolean; // Show definition first instead of term
    showProgress?: boolean;
    allowShuffle?: boolean;
    subheaderField?: string;
    layout?: {
        mainFields?: string[];
        secondaryFields?: string[];
        footerFields?: string[];
    };
    hideHeader?: boolean;
}

export interface FlashcardGameProps {
    cards: FlashcardData[];
    title: string;
    subtitle: string;
    config?: FlashcardGameConfig;
}

export interface FlashcardCardProps {
    card: FlashcardData;
    isRevealed: boolean;
    onReveal: () => void;
    onNext: () => void;
    // eslint-disable-next-line
    onAddToPractice?: (card: FlashcardData) => void;
    isInPracticeMode?: boolean;
    currentIndex: number;
    totalCards: number;
    isReverseMode?: boolean;
    config: FlashcardGameConfig;
    isLastCard: boolean;
    isFlipped: boolean;
}

export interface FlashcardStartProps {
    title: string;
    subtitle: string;
    // eslint-disable-next-line
    onBegin: (reverseMode: boolean) => void;
    config: FlashcardGameConfig;
}

export interface FlashcardGameState {
    currentIndex: number;
    isStarted: boolean;
    isReverseMode: boolean;
    deck: FlashcardData[];
    practiceDeck: FlashcardData[];
    isInPracticeMode: boolean;
    isRevealed: boolean;
    originalDeck: FlashcardData[];
}

export type FlashcardGameAction =
    | { type: "START_GAME"; payload: { reverseMode: boolean } }
    | { type: "NEXT_CARD" }
    | { type: "REVEAL_CARD" }
    | { type: "ADD_TO_PRACTICE"; payload: FlashcardData }
    | { type: "SHUFFLE_DECK" }
    | { type: "RESET_GAME" }
    | { type: "START_PRACTICE_MODE" }
    | { type: "RESET_AND_SHUFFLE" };
