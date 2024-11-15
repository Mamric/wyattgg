"use client";

import { FlashcardGame } from "@/app/components/flashcards/FlashcardGame";
import heroesJourneyData from "@/data/writing-exercises/flashcards/heroes-journey.json";
import Header from "@/app/writing-exercises/components/Header";

type HeroJourneyStage = {
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

export default function HeroesJourneyFlashcards() {
    const cards = Object.entries(heroesJourneyData as Record<string, HeroJourneyStage>).map(([id, stage]) => ({
        id,
        term: stage.term,
        definition: stage.definition,
        example: stage.example,
        additionalInfo: {
            purpose: stage.additionalInfo.purpose,
            pacing: stage.additionalInfo.pacing,
            whenToUseIt: stage.additionalInfo.whenToUseIt,
            pitfalls: stage.additionalInfo.pitfalls,
            commonVariations: stage.additionalInfo.commonVariations,
            example: stage.example,
        },
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="The Hero's Journey Flashcards"
                    subtitle="Master Joseph Campbell's stages of the monomyth"
                />
                <FlashcardGame
                    cards={cards}
                    title="The Hero's Journey"
                    subtitle="Master the stages of the monomyth"
                    config={{
                        allowPracticeMode: true,
                        showExamples: true,
                        additionalFields: ["purpose", "pacing", "whenToUseIt", "commonVariations", "pitfalls"],
                        reverseMode: true,
                        showProgress: true,
                        allowShuffle: true,
                        subheaderField: "commonVariations",
                        layout: {
                            mainFields: ["purpose", "whenToUseIt"],
                            secondaryFields: ["example", "pitfalls"],
                            footerFields: ["pacing"],
                        },
                        hideHeader: true,
                    }}
                />
            </div>
        </div>
    );
}
