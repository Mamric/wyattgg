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

                    {/* Story Structure Section */}
                    <div className="space-y-6 mb-12">
                        <h2 className="text-2xl font-semibold text-white">Story Structure</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                            {/* Hero's Journey Exercise */}
                            <Link
                                href="/writing-exercises/heroes-journey"
                                className="block bg-gradient-to-br from-purple-900 to-indigo-900 p-4 sm:p-6 rounded-lg 
                                         hover:from-purple-800 hover:to-indigo-800 transition-all transform 
                                         hover:scale-[1.02] border-2 border-purple-500/20 hover:border-purple-500/40
                                         shadow-xl"
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-3xl">🦸</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Hero's Journey</h3>
                                        <p className="text-gray-300 text-sm">Classic monomyth structure</p>
                                    </div>
                                </div>
                            </Link>

                            {/* Kishōtenketsu */}
                            <Link
                                href="/writing-exercises/kishotenketsu"
                                className="block bg-gradient-to-br from-green-900 to-teal-900 p-4 sm:p-6 rounded-lg 
                                         hover:from-green-800 hover:to-teal-800 transition-all transform 
                                         hover:scale-[1.02] border-2 border-green-500/20 hover:border-green-500/40
                                         shadow-xl"
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-3xl">🎋</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Kishōtenketsu</h3>
                                        <p className="text-gray-300 text-sm">Japanese four-part structure</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Story Development Section */}
                    <div className="space-y-6 mb-12">
                        <h2 className="text-2xl font-semibold text-white">Story Development</h2>
                        <div className="flex justify-center">
                            <Link href="/writing-exercises/but-therefore" className="block bg-gradient-to-br from-orange-900 to-red-900 p-4 sm:p-6 rounded-lg hover:from-orange-800 hover:to-red-800 transition-all transform hover:scale-[1.02] border-2 border-orange-500/20 hover:border-orange-500/40 shadow-xl max-w-xl w-full">
                                <div className="flex items-center gap-3 justify-center">
                                    <span className="text-3xl">📖</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">But/Therefore Story Builder</h3>
                                        <p className="text-gray-300 text-sm">Create engaging story progressions</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Literary Device Mastery Section */}
                    <div className="space-y-6 mb-12">
                        <h2 className="text-2xl font-semibold text-white">Literary Device Mastery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <Link 
                                href="/writing-exercises/flashcards/literary-devices" 
                                className="block bg-gradient-to-br from-green-900 to-green-800 p-4 sm:p-6 rounded-lg 
                                         hover:from-green-800 hover:to-green-700 transition-all transform 
                                         hover:scale-[1.02] border-2 border-green-500/20 hover:border-green-500/40 
                                         shadow-xl"
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-3xl">📚</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Study</h3>
                                        <p className="text-gray-300 text-sm">Learn with flashcards</p>
                                    </div>
                                </div>
                            </Link>

                            <Link 
                                href="/writing-exercises/quiz" 
                                className="block bg-gradient-to-br from-purple-900 to-purple-800 p-4 sm:p-6 rounded-lg 
                                         hover:from-purple-800 hover:to-purple-700 transition-all transform 
                                         hover:scale-[1.02] border-2 border-purple-500/20 hover:border-purple-500/40 
                                         shadow-xl"
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-3xl">📝</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Quiz</h3>
                                        <p className="text-gray-300 text-sm">Test your knowledge</p>
                                    </div>
                                </div>
                            </Link>

                            <Link 
                                href="/writing-exercises/practice" 
                                className="block bg-gradient-to-br from-blue-900 to-blue-800 p-4 sm:p-6 rounded-lg 
                                         hover:from-blue-800 hover:to-blue-700 transition-all transform 
                                         hover:scale-[1.02] border-2 border-blue-500/20 hover:border-blue-500/40 
                                         shadow-xl"
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-3xl">✍️</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Create</h3>
                                        <p className="text-gray-300 text-sm">Practice writing examples</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Flashcards Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-white">Study with Flashcards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <Link href="/writing-exercises/flashcards/literary-devices" className="block bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all transform hover:scale-[1.02] border-2 border-blue-500/20 hover:border-blue-500/40 shadow-xl">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-2xl">📚</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Literary Devices</h3>
                                        <p className="text-gray-300 text-xs">Master writing tools</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/writing-exercises/flashcards/heroes-journey" className="block bg-gradient-to-br from-purple-900 to-purple-800 p-4 rounded-lg hover:from-purple-800 hover:to-purple-700 transition-all transform hover:scale-[1.02] border-2 border-purple-500/20 hover:border-purple-500/40 shadow-xl">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-2xl">🦸</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Hero's Journey</h3>
                                        <p className="text-gray-300 text-xs">Study the monomyth</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/writing-exercises/flashcards/save-the-cat" className="block bg-gradient-to-br from-green-900 to-green-800 p-4 rounded-lg hover:from-green-800 hover:to-green-700 transition-all transform hover:scale-[1.02] border-2 border-green-500/20 hover:border-green-500/40 shadow-xl">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-2xl">🐱</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Save the Cat!</h3>
                                        <p className="text-gray-300 text-xs">Learn screenplay beats</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/writing-exercises/flashcards/storytelling" className="block bg-gradient-to-br from-orange-900 to-orange-800 p-4 rounded-lg hover:from-orange-800 hover:to-orange-700 transition-all transform hover:scale-[1.02] border-2 border-orange-500/20 hover:border-orange-500/40 shadow-xl">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-2xl">📖</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Storytelling</h3>
                                        <p className="text-gray-300 text-xs">Core narrative concepts</p>
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
