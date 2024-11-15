type FlashcardStartProps = {
    title: string;
    subtitle: string;
    // eslint-disable-next-line
    onBegin: (isReverse: boolean) => void;
    config: {
        reverseMode?: boolean;
        allowShuffle?: boolean;
        hideHeader?: boolean;
    };
    hideHeader?: boolean;
};

export default function FlashcardStart({ title, subtitle, onBegin, config, hideHeader }: FlashcardStartProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {!hideHeader && (
                <div className="text-center mb-16">
                    <h1
                        className="text-5xl sm:text-6xl font-bold text-white mb-6 
                                tracking-tight leading-none"
                    >
                        {title}
                    </h1>
                    <p
                        className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto 
                                leading-relaxed"
                    >
                        {subtitle}
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-lg mx-auto mb-20">
                <button
                    onClick={() => onBegin(false)}
                    className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl 
                             text-lg font-semibold overflow-hidden
                             hover:bg-blue-700 transform hover:scale-105
                             transition-all duration-200 shadow-xl
                             border border-blue-500/20 hover:border-blue-500/40"
                >
                    <span className="relative z-10">Start Learning</span>
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/0 
                                  via-blue-400/10 to-blue-600/0 
                                  translate-x-[-100%] group-hover:translate-x-[100%] 
                                  transition-transform duration-1000"
                    />
                </button>

                {config.reverseMode && (
                    <button
                        onClick={() => onBegin(true)}
                        className="group relative px-8 py-4 bg-purple-600 text-white rounded-xl 
                                 text-lg font-semibold overflow-hidden
                                 hover:bg-purple-700 transform hover:scale-105
                                 transition-all duration-200 shadow-xl
                                 border border-purple-500/20 hover:border-purple-500/40"
                    >
                        <span className="relative z-10">Reverse Mode</span>
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/0 
                                      via-purple-400/10 to-purple-600/0 
                                      translate-x-[-100%] group-hover:translate-x-[100%] 
                                      transition-transform duration-1000"
                        />
                    </button>
                )}
            </div>

            {/* Instructions Card */}
            <div
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 
                          max-w-2xl mx-auto shadow-2xl 
                          border border-gray-700/50 hover:border-gray-600/50
                          transition-all duration-300"
            >
                <h2
                    className="text-2xl sm:text-3xl font-bold text-white mb-8 
                             text-center"
                >
                    How to Use
                </h2>
                <ul className="space-y-6 text-gray-300 text-lg">
                    <li className="flex items-center gap-4">
                        <span
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                       bg-blue-500/20 rounded-lg"
                        >
                            <span className="text-blue-400 text-xl">•</span>
                        </span>
                        <span>Click cards to reveal their content</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <span
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                       bg-purple-500/20 rounded-lg"
                        >
                            <span className="text-purple-400 text-xl">•</span>
                        </span>
                        <span>Use "Practice Again Later" for cards you want to review</span>
                    </li>
                    {config.allowShuffle && (
                        <li className="flex items-center gap-4">
                            <span
                                className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                           bg-green-500/20 rounded-lg"
                            >
                                <span className="text-green-400 text-xl">•</span>
                            </span>
                            <span>Shuffle the deck anytime to mix up the order</span>
                        </li>
                    )}
                    {config.reverseMode && (
                        <li className="flex items-center gap-4">
                            <span
                                className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                           bg-yellow-500/20 rounded-lg"
                            >
                                <span className="text-yellow-400 text-xl">•</span>
                            </span>
                            <span>Try Reverse Mode to test yourself differently</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
