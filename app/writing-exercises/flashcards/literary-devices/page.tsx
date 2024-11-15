"use client";

import { FlashcardGame } from "@/app/components/flashcards/FlashcardGame";
import literaryDevicesData from "@/data/writing-exercises/flashcards/literary-devices.json";
import Header from "@/app/writing-exercises/components/Header";

export default function LiteraryDevicesFlashcards() {
    // Create a type for the device data structure
    type LiteraryDevice = {
        id: string;
        term: string;
        definition: string;
        example: string;
        additionalInfo: {
            pronunciation: string;
            whyUseIt: string;
            howToUseIt: string;
            school: string;
            derivation: string;
        };
    };

    const cards = Object.entries(literaryDevicesData as Record<string, LiteraryDevice>).map(([id, device]) => ({
        id,
        term: device.term,
        definition: device.definition,
        example: device.example,
        additionalInfo: {
            pronunciation: device.additionalInfo.pronunciation,
            whyUseIt: device.additionalInfo.whyUseIt,
            howToUseIt: device.additionalInfo.howToUseIt,
            example: device.example,
            derivation: device.additionalInfo.derivation,
            school: device.additionalInfo.school,
        },
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="Literary Devices Flashcards"
                    subtitle="Master the tools and techniques of effective writing"
                />
                <FlashcardGame
                    cards={cards}
                    title="Literary Devices"
                    subtitle="Master the tools of effective writing"
                    config={{
                        allowPracticeMode: true,
                        showExamples: true,
                        additionalFields: [
                            "whyUseIt",
                            "howToUseIt",
                            "example",
                            "derivation",
                            "pronunciation",
                            "school",
                        ],
                        reverseMode: true,
                        showProgress: true,
                        allowShuffle: true,
                        subheaderField: "pronunciation",
                        layout: {
                            mainFields: ["whyUseIt", "howToUseIt"],
                            secondaryFields: ["example", "derivation"],
                            footerFields: ["school"],
                        },
                        hideHeader: true,
                    }}
                />
            </div>
        </div>
    );
}
