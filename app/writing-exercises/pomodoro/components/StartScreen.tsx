import Header from "../../components/Header";

type StartScreenProps = {
    onBegin: () => void;
};

export default function StartScreen({ onBegin }: StartScreenProps) {
    return (
        <>
            <Header title="Pomodoro Timer" subtitle="Stay focused and productive with timed work sessions" />

            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">How it works:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-2xl mb-2">🍅</div>
                            <h3 className="text-lg font-medium text-green-400 mb-2">Focus Session</h3>
                            <p className="text-sm">25 minutes of focused work on a single task</p>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-2xl mb-2">☕</div>
                            <h3 className="text-lg font-medium text-blue-400 mb-2">Short Break</h3>
                            <p className="text-sm">5-minute break to recharge between sessions</p>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-2xl mb-2">🌟</div>
                            <h3 className="text-lg font-medium text-purple-400 mb-2">Long Break</h3>
                            <p className="text-sm">15-minute break after completing 4 sessions</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={onBegin}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg text-xl 
                                 hover:bg-green-700 hover:scale-105 
                                 transition-all duration-200"
                    >
                        Start Timer
                    </button>
                </div>
            </div>
        </>
    );
}
