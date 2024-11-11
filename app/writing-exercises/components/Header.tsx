import Link from "next/link";

type HeaderProps = {
    title: string;
    subtitle?: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <div className="relative mb-12">
            <div className="flex items-center justify-between mb-6">
                <Link 
                    href="/writing-exercises" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 
                             px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                        />
                    </svg>
                    <span className="text-sm font-medium">Back to Writing Exercises</span>
                </Link>
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
                {subtitle && (
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
