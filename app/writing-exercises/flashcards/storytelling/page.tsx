"use client";

import { FlashcardGame } from "@/app/components/flashcards/FlashcardGame";
import storytellingData from "@/data/writing-exercises/flashcards/storytelling.json";
import Header from "@/app/writing-exercises/components/Header";

type StorytellingTerm = {
    id: string;
    term: string;
    definition: string;
    example: string;
    additionalInfo: {
        purpose: string;
        howToUseIt: string;
        pitfalls?: string;
        origin?: string;
        commonVariations: string;
    };
};

export default function StorytellingFlashcards() {
    const cards = Object.entries(storytellingData as Record<string, StorytellingTerm>).map(([id, term]) => ({
        id,
        term: term.term,
        definition: term.definition,
        example: term.example,
        additionalInfo: {
            purpose: term.additionalInfo.purpose,
            howToUseIt: term.additionalInfo.howToUseIt,
            pitfalls: term.additionalInfo.pitfalls || "",
            origin: term.additionalInfo.origin || "",
            commonVariations: term.additionalInfo.commonVariations,
            example: term.example,
        },
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="Storytelling Terms Flashcards"
                    subtitle="Master essential storytelling concepts and techniques"
                />
                <FlashcardGame
                    cards={cards}
                    title="Storytelling Terms"
                    subtitle="Master the fundamentals of storytelling"
                    config={{
                        allowPracticeMode: true,
                        showExamples: true,
                        additionalFields: ["purpose", "howToUseIt", "pitfalls", "origin", "example", "commonVariations"],
                        reverseMode: true,
                        showProgress: true,
                        allowShuffle: true,
                        subheaderField: "commonVariations",
                        layout: {
                            mainFields: ["purpose", "howToUseIt"],
                            secondaryFields: ["example", "pitfalls"],
                            footerFields: ["origin"],
                        },
                        hideHeader: true,
                    }}
                />
            </div>
        </div>
    );
}
