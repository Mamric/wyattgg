import Link from "next/link";
import { Metadata } from "next";
import worksData from "@/data/works.json";

export const metadata: Metadata = {
    title: "Wyatt.gg | Works",
    description: "Explore Wyatt's voice over portfolio and projects",
};
type Work = {
    name: string;
    url: string;
    mediaType: "video";
    description: string;
    attributions: string;
};

export default function WorksPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 text-center">My Works</h1>
                <div className="mb-12 text-center">
                    <p className="text-xl italic mb-2">&quot;{worksData.pageQuote}&quot;</p>
                    <p className="text-lg">- {worksData.pageQuoteAuthor}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 mb-12">
                    <p className="text-gray-300">
                        Below is a list of works that I have lent my voice to. As I continue to work on more projects, I
                        will update this page with more information, and with additional sections. But for now, I hope
                        you enjoy the works that I have been a part of.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {worksData.works.map((work) => (
                        <WorkCard key={work.name} work={work} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function WorkCard({ work }: { work: Work }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{work.name}</h2>
                <p className="text-gray-300 mb-4">{work.description}</p>
                <p className="text-sm text-gray-400 mb-4">
                    Played: <span className="italic">{work.attributions}</span>
                </p>
                <Link
                    href={work.url}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                    target="_blank"
                    rel="noreferrer"
                >
                    Watch Video
                </Link>
            </div>
        </div>
    );
}
