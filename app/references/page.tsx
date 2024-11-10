import Link from "next/link";
import { Metadata } from "next";
import referencesData from "@/data/references.json";

export const metadata: Metadata = {
    title: "Wyatt.gg | Game Dev References",
    description: "Curated resources for game developers",
};

type Reference = {
    name: string;
    url: string;
    mediaType: "video" | "article" | "powerpoint" | "other";
    description: string;
};

export default function ReferencesPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Game Dev References</h1>
                <div className="mb-12 text-center">
                    <p className="text-xl italic mb-2">&quot;{referencesData.pageQuote}&quot;</p>
                    <p className="text-lg">- {referencesData.pageQuoteAuthor}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 mb-12">
                    <p className="text-gray-300">
                        Below is a running list of game development resources that I have collected over the years. The
                        intention for this list is to inspire independent game developers and to give them a few
                        pointers from those that came before them. It is far from a complete list, and I intend to add
                        onto it as time progresses, and as I find more articles and resources that I find useful.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {referencesData.references.map((reference) => (
                        <ReferenceCard key={reference.name} reference={reference} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReferenceCard({ reference }: { reference: Reference }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{reference.name}</h2>
                <p className="text-gray-300 mb-4">{reference.description}</p>
                <Link
                    href={reference.url}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {reference.mediaType === "article"
                        ? "Read Article"
                        : reference.mediaType === "video"
                        ? "Watch Video"
                        : reference.mediaType === "powerpoint"
                        ? "View Presentation"
                        : "View Resource"}{" "}
                    ↗
                </Link>
            </div>
        </div>
    );
}
