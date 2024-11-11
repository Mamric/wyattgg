import Header from "../../components/Header";

type StartScreenProps = {
    onBegin: () => void;
};

export default function StartScreen({ onBegin }: StartScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Literary Devices Exercise" 
                    subtitle="Practice using various literary devices to enhance your writing skills." 
                />
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-300 text-lg mb-8">
                        You'll be presented with different literary devices and example sentences 
                        to practice with. Take your time and be creative with your responses.
                    </p>
                    <button
                        onClick={onBegin}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg text-xl 
                                 hover:bg-blue-700 transition-colors"
                    >
                        Begin
                    </button>
                </div>
            </div>
        </div>
    );
}
