import { FlashcardCardProps } from "./types";
import { useEffect, useState } from "react";

function formatFieldName(field: string): string {
    const words = field.replace(/([A-Z])/g, " $1").toLowerCase();
    const formatted = words.charAt(0).toUpperCase() + words.slice(1);
    const hasMultipleWords = words.trim().includes(" ");
    return formatted + (hasMultipleWords ? "?" : "");
}

export default function FlashcardCard({ card, isReverseMode, config, isFlipped }: FlashcardCardProps) {
    const [displayedCard, setDisplayedCard] = useState(card);

    useEffect(() => {
        if (!isFlipped) {
            setDisplayedCard(card);
        }
    }, [card, isFlipped]);

    return (
        <div>
            <div className="h-[650px] sm:h-[525px] perspective-1000">
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d 
                               ${isFlipped ? "rotate-y-180" : ""}`}
                >
                    {/* Front of card */}
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg p-4 sm:p-8 shadow-lg backface-hidden">
                        <div className="flex items-start sm:items-center justify-center h-full pt-8 sm:pt-0">
                            {isReverseMode ? (
                                <div className="text-center">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {displayedCard.term}
                                    </h2>
                                    {displayedCard.additionalInfo?.pronunciation && (
                                        <p className="text-gray-400 text-sm">
                                            {displayedCard.additionalInfo.pronunciation}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="max-w-lg">
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Definition</h3>
                                    <p className="text-gray-300 text-lg sm:text-xl">{displayedCard.definition}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg shadow-lg backface-hidden rotate-y-180">
                        <div className="h-full overflow-y-auto p-4 sm:p-7">
                            <div className="space-y-3">
                                {/* Header */}
                                <div className="text-center">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                        {displayedCard.term}
                                    </h2>
                                    {config.subheaderField && displayedCard.additionalInfo?.[config.subheaderField] && (
                                        <p className="text-gray-400 text-sm mb-2">
                                            {displayedCard.additionalInfo[config.subheaderField]}
                                        </p>
                                    )}
                                    <div className="max-w-2xl mx-auto">
                                        <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-1">
                                            Definition
                                        </h3>
                                        <p className="text-gray-300 text-sm sm:text-base mb-3">
                                            {displayedCard.definition}
                                        </p>
                                    </div>
                                </div>

                                {/* Main Fields Grid */}
                                {config.layout?.mainFields && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {config.layout.mainFields.map(
                                            (field, index) =>
                                                displayedCard.additionalInfo?.[field] && (
                                                    <div key={field} className="bg-gray-700 rounded-lg p-3">
                                                        <h3
                                                            className={`text-base font-semibold ${
                                                                index === 0 ? "text-blue-400" : "text-green-400"
                                                            } mb-1`}
                                                        >
                                                            {formatFieldName(field)}
                                                        </h3>
                                                        <p className="text-gray-300 text-sm leading-relaxed">
                                                            {displayedCard.additionalInfo[field]}
                                                        </p>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}

                                {/* Secondary Fields Grid */}
                                {config.layout?.secondaryFields && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {config.layout.secondaryFields.map(
                                            (field, index) =>
                                                displayedCard.additionalInfo?.[field] && (
                                                    <div key={field} className="bg-gray-700/50 rounded-lg p-2.5">
                                                        <h3
                                                            className={`text-sm font-semibold mb-1 ${
                                                                index === 0 ? "text-yellow-400" : "text-purple-400"
                                                            }`}
                                                        >
                                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                                        </h3>
                                                        <p
                                                            className={`text-gray-300 text-sm leading-relaxed ${
                                                                field === "example" ? "italic" : ""
                                                            }`}
                                                        >
                                                            {displayedCard.additionalInfo[field]}
                                                        </p>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}

                                {/* Footer Fields */}
                                {config.layout?.footerFields && (
                                    <div className="text-center pb-2">
                                        {config.layout.footerFields.map(
                                            (field) =>
                                                displayedCard.additionalInfo?.[field] && (
                                                    <p key={field} className="text-gray-400 text-sm">
                                                        {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                                                        {displayedCard.additionalInfo[field]}
                                                    </p>
                                                )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
