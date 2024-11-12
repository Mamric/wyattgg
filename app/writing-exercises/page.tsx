"use client";

import Link from "next/link";

export default function WritingExercisesLanding() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg p-4 sm:p-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Writing Exercises</h1>
                    <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
                        Choose an exercise type to practice and improve your writing skills.
                    </p>
                    <div className="space-y-4 sm:space-y-6">
                        {/* Flashcards - Primary Card */}
                        <Link
                            href="/writing-exercises/flashcards"
                            className="block bg-gradient-to-r from-blue-900 to-purple-900 p-4 sm:p-8 rounded-lg 
                                     hover:from-blue-800 hover:to-purple-800 transition-all transform 
                                     hover:scale-[1.02] border-2 border-blue-500/20 hover:border-blue-500/40
                                     shadow-xl"
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="bg-blue-500/10 p-3 sm:p-4 rounded-lg flex-shrink-0">
                                    <span className="text-3xl sm:text-4xl">📚</span>
                                </div>
                                <div className="text-left">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                                        Literary Devices Flashcards
                                    </h2>
                                    <p className="text-gray-300 text-sm sm:text-lg">
                                        Master literary devices through interactive flashcards with detailed
                                        explanations and examples.
                                    </p>
                                </div>
                            </div>
                        </Link>
                        {/* But/Therefore Story Builder */}
                        <Link
                            href="/writing-exercises/but-therefore"
                            className="block bg-gradient-to-r from-orange-900 to-red-900 p-4 sm:p-8 rounded-lg 
                                     hover:from-orange-800 hover:to-red-800 transition-all transform 
                                     hover:scale-[1.02] border-2 border-orange-500/20 hover:border-orange-500/40
                                     shadow-xl"
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="bg-orange-500/10 p-3 sm:p-4 rounded-lg flex-shrink-0">
                                    <span className="text-3xl sm:text-4xl">📖</span>
                                </div>
                                <div className="text-left">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                                        But/Therefore Story Builder
                                    </h2>
                                    <p className="text-gray-300 text-sm sm:text-lg">
                                        Create engaging story progressions using the But/Therefore principle to avoid
                                        weak "and then" storytelling.
                                    </p>
                                </div>
                            </div>
                        </Link>
                        {/* Secondary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Quiz Card */}
                            <Link
                                href="/writing-exercises/quiz"
                                className="block bg-gray-700/50 p-4 sm:p-6 rounded-lg hover:bg-gray-600/50 
                                         transition-all transform hover:scale-[1.01]"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="bg-purple-500/10 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                                        <span className="text-xl sm:text-2xl">📝</span>
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                                            Knowledge Quiz
                                        </h2>
                                        <p className="text-gray-300 text-sm">
                                            Test your understanding of literary devices with multiple choice questions.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Practice Card */}
                            <Link
                                href="/writing-exercises/practice"
                                className="block bg-gray-700/50 p-4 sm:p-6 rounded-lg hover:bg-gray-600/50 
                                         transition-all transform hover:scale-[1.01]"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="bg-green-500/10 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                                        <span className="text-xl sm:text-2xl">✍️</span>
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                                            Writing Practice
                                        </h2>
                                        <p className="text-gray-300 text-sm">
                                            Create your own examples using literary devices in context.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
