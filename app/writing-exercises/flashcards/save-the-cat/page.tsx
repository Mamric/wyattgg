"use client";

import { FlashcardGame } from "@/app/components/flashcards/FlashcardGame";
import saveTheCatData from "@/data/writing-exercises/flashcards/save-the-cat.json";
import Header from "@/app/writing-exercises/components/Header";

type SaveTheCatBeat = {
    id: string;
    term: string;
    definition: string;
    example: string;
    additionalInfo: {
        purpose: string;
        pacing: string;
        whenToUseIt: string;
        pitfalls: string;
        commonVariations: string;
    };
};

export default function SaveTheCatFlashcards() {
    const cards = Object.entries(saveTheCatData as Record<string, SaveTheCatBeat>).map(([id, beat]) => ({
        id,
        term: beat.term,
        definition: beat.definition,
        example: beat.example,
        additionalInfo: {
            purpose: beat.additionalInfo.purpose,
            timing: beat.additionalInfo.pacing,
            whenToUseIt: beat.additionalInfo.whenToUseIt,
            pitfalls: beat.additionalInfo.pitfalls,
            commonVariations: beat.additionalInfo.commonVariations,
            example: beat.example,
        },
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="Save the Cat! Flashcards"
                    subtitle="Master Blake Snyder's 15 story beats with interactive flashcards"
                />
                <FlashcardGame
                    cards={cards}
                    title="Save the Cat!"
                    subtitle="Master the 15 essential story beats"
                    config={{
                        allowPracticeMode: true,
                        showExamples: true,
                        additionalFields: ["purpose", "timing", "whenToUseIt", "commonVariations", "pitfalls", "example"],
                        reverseMode: true,
                        showProgress: true,
                        allowShuffle: true,
                        subheaderField: "commonVariations",
                        layout: {
                            mainFields: ["purpose", "whenToUseIt"],
                            secondaryFields: ["example", "pitfalls"],
                            footerFields: ["timing"],
                        },
                        hideHeader: true,
                    }}
                />
            </div>
        </div>
    );
}
