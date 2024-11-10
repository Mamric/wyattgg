type ResponseInputProps = {
    value: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void;
    deviceName: string;
};

export default function ResponseInput({ value, onChange, deviceName }: ResponseInputProps) {
    return (
        <div className="mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Your Response</h3>
                <textarea
                    className="w-full p-3 bg-gray-800 text-white rounded-lg resize-y min-h-[100px] 
                              border-2 border-gray-600 focus:border-orange-400/50 focus:outline-none
                              transition-colors placeholder-gray-500"
                    rows={3}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={`Rewrite the sentence using ${deviceName.toLowerCase()}...`}
                />
                <p className="text-gray-400 text-sm mt-2">
                    Try to incorporate {deviceName.toLowerCase()} into your response.
                </p>
            </div>
        </div>
    );
}
