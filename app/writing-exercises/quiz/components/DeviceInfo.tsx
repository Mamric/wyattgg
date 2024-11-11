import { LiteraryDevice } from "../../types";

type DeviceInfoProps = {
    device: LiteraryDevice;
};

export default function DeviceInfo({ device }: DeviceInfoProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{device.name}</h2>
            <p className="text-gray-300 mb-4">{device.definition}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
