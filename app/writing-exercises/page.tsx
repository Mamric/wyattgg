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
                        <Link
                            href="/writing-exercises/flashcards"
                            className="block bg-gray-700 p-8 rounded-lg hover:bg-gray-600 transition-colors border-2 border-blue-500/20 hover:border-blue-500/40"
                        >
                            <h2 className="text-3xl font-bold text-white mb-3">Literary Devices Flashcards</h2>
                            <p className="text-gray-300 text-lg">
                                Study literary devices using interactive flashcards to learn definitions and usage.
                            </p>
                        </Link>
                        <Link
                            href="/writing-exercises/quiz"
                            className="block bg-gray-700/50 p-6 rounded-lg hover:bg-gray-600/50 transition-colors"
                        >
                            <h2 className="text-2xl font-bold text-white mb-3">Literary Devices Quiz</h2>
                            <p className="text-gray-300">
                                Practice using literary devices by writing your own examples based on provided
                                sentences.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
