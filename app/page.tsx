import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRightIcon,
    MicrophoneIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";

const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
);

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
        icon: YouTubeIcon,
    },
    {
        title: "Discord",
        description: "Join the community",
        url: "https://discord.gg/scpWyatt",
        icon: DiscordIcon,
    },
    {
        title: "Twitter",
        description: "Follow me on Twitter",
        url: "https://x.com/scpwyatt",
        icon: XIcon,
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
            <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
        className="block p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 ease-in-out"
    >
        <div className="flex items-center">
            <Icon className="h-6 w-6 text-blue-400 mr-3" />
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    </Link>
);

const ExternalCard = ({ title, description, url, icon: Icon }: PageInfo) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 bg-gray-800 bg-opacity-50 rounded-lg shadow-sm hover:bg-opacity-75 transition duration-150 ease-in-out"
    >
        <div className="flex items-center">
            <Icon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
    </a>
);