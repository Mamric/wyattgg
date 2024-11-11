"use client";

import Link from "next/link";

export default function WritingExercisesLanding() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-6">Writing Exercises</h1>
                    <p className="text-gray-300 text-lg mb-8">
                        Choose an exercise type to practice and improve your writing skills.
                    </p>
                    <div className="space-y-6">
                        {/* Flashcards - Primary Card */}
                        <Link
                            href="/writing-exercises/flashcards"
                            className="block bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg 
                                     hover:from-blue-800 hover:to-purple-800 transition-all transform 
                                     hover:scale-[1.02] border-2 border-blue-500/20 hover:border-blue-500/40
                                     shadow-xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-500/10 p-4 rounded-lg">
                                    <span className="text-4xl">📚</span>
                                </div>
                                <div className="text-left">
                                    <h2 className="text-3xl font-bold text-white mb-2">Literary Devices Flashcards</h2>
                                    <p className="text-gray-300 text-lg">
                                        Master literary devices through interactive flashcards with detailed
                                        explanations and examples.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Quiz - Secondary Card */}
                        <Link
                            href="/writing-exercises/quiz"
                            className="block bg-gray-700/50 p-6 rounded-lg hover:bg-gray-600/50 
                                     transition-all transform hover:scale-[1.01]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-500/10 p-3 rounded-lg">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold text-white mb-2">Knowledge Quiz</h2>
                                    <p className="text-gray-300">
                                        Test your understanding of literary devices with multiple choice questions.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Practice - Secondary Card */}
                        <Link
                            href="/writing-exercises/practice"
                            className="block bg-gray-700/50 p-6 rounded-lg hover:bg-gray-600/50 
                                     transition-all transform hover:scale-[1.01]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-green-500/10 p-3 rounded-lg">
                                    <span className="text-2xl">✍️</span>
                                </div>
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold text-white mb-2">Writing Practice</h2>
                                    <p className="text-gray-300">
                                        Create your own examples using literary devices in context.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
