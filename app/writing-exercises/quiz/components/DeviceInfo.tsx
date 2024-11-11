import { LiteraryDevice } from "../../types";

type DeviceInfoProps = {
    device: LiteraryDevice;
};

export default function DeviceInfo({ device }: DeviceInfoProps) {
    return (
        <div className="mb-6 space-y-4">
            <div>
                <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-2xl font-bold text-white">{device.name}</h2>
                    <span className="text-gray-400">{device.pronunciation}</span>
                </div>
                <p className="text-gray-300 mb-2">{device.definition}</p>
                <p className="text-gray-400 text-sm italic mb-2">{device.derivation}</p>
                <div className="bg-gray-700/40 rounded p-2 mb-4">
                    <p className="text-gray-400 text-sm">
                        <span className="text-yellow-400/80 font-medium">Example: </span>
                        <span className="italic">{device.example}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Why use it?</h3>
                    <p className="text-gray-300">{device.whyUseIt}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">How to use it?</h3>
                    <p className="text-gray-300">{device.howToUseIt}</p>
                </div>
            </div>
        </div>
    );
}
