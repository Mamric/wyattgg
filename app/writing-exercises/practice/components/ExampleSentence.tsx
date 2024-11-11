type ExampleSentenceProps = {
    sentence: string;
};

export default function ExampleSentence({ sentence }: ExampleSentenceProps) {
    return (
        <div className="mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Prompt Sentence</h3>
                <p className="text-gray-300 italic pl-2 border-l-4 border-purple-400/30">
                    {sentence}
                </p>
            </div>
        </div>
    );
}
