import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRightIcon,
    MicrophoneIcon,
    BookOpenIcon,
    VideoCameraIcon,
    ChatBubbleLeftRightIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: "Wyatt.gg | Voice Over Artist & Content Creator",
    description: "Wyatt's personal website showcasing voice over work and content creation",
};

type PageInfo = {
    title: string;
    description: string;
    url: string;
    icon: React.ElementType;
};

const internalLinks: PageInfo[] = [
    {
        title: "Voice Over Work",
        description: "Explore my voice over portfolio",
        url: "/works",
        icon: MicrophoneIcon,
    },
    {
        title: "Game Dev References",
        description: "Curated resources for game developers",
        url: "/references",
        icon: BookOpenIcon,
    },
];

const externalLinks: PageInfo[] = [
    {
        title: "YouTube",
        description: "Watch my latest content",
        url: "https://youtube.com/scpWyatt",
        icon: VideoCameraIcon,
    },
    {
        title: "Discord",
        description: "Join the community",
        url: "https://discord.gg/scpWyatt",
        icon: ChatBubbleLeftRightIcon,
    },
    {
        title: "Reddit",
        description: "Engage in discussions",
        url: "https://reddit.com/r/scpWyatt2",
        icon: NewspaperIcon,
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
            <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
                        Welcome to{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Wyatt.gg
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8">
                        Voice Over Artist | Content Creator | Game Enthusiast
                    </p>
                    <Link
                        href="/about"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
                    >
                        Learn More About Me
                        <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <section className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">My Work</h2>
                        <div className="space-y-4">
                            {internalLinks.map((link) => (
                                <InternalCard key={link.title} {...link} />
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                        <div className="space-y-4">
                            {externalLinks.map((link) => (
                                <ExternalCard key={link.title} {...link} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

const InternalCard = ({ title, description, url, icon: Icon }: PageInfo) => (
    <Link
        href={url}
        className="block p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 ease-in-out"
    >
        <div className="flex items-center">
            <Icon className="h-8 w-8 text-blue-400 mr-4" />
            <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
        </div>
    </Link>
);

const ExternalCard = ({ title, description, url, icon: Icon }: PageInfo) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 bg-gray-800 bg-opacity-50 rounded-lg shadow-sm hover:bg-opacity-75 transition duration-150 ease-in-out"
    >
        <div className="flex items-center">
            <Icon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
                <h3 className="text-base font-medium">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    </a>
);