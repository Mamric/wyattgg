import Header from "../../components/Header";

type StartScreenProps = {
    // eslint-disable-next-line no-unused-vars
    onBegin: (reverse: boolean) => void;
};

export default function StartScreen({ onBegin }: StartScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header
                    title="Literary Devices Flashcards"
                    subtitle="Study literary devices with interactive flashcards"
                />
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-300 text-lg mb-8">
                        Choose your study mode. In Default Mode, you'll see the definition and guess the literary device. 
                        In Reverse Mode, you'll see the name and guess the definition.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => onBegin(false)}
                            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-2xl 
                                     hover:bg-blue-700 transition-all duration-200 shadow-lg 
                                     hover:scale-105"
                        >
                            Default Mode
                        </button>
                        <button
                            onClick={() => onBegin(true)}
                            className="px-8 py-3 bg-gray-600 text-white rounded-lg text-xl 
                                     hover:bg-gray-700 transition-all"
                        >
                            Reverse Mode
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
