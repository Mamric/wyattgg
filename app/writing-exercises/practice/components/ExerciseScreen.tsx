import DeviceInfo from "./DeviceInfo";
import ExampleSentence from "./ExampleSentence";
import ResponseInput from "./ResponseInput";
import NavigationButtons from "./NavigationButtons";
import { LiteraryDevice } from "../../types";
import ProgressBar from "./ProgressBar";
import Header from "../../components/Header";

type ExerciseScreenProps = {
    exercise: {
        currentDevice: LiteraryDevice;
        currentSentence: string;
        userAnswers: { [key: string]: string };
        deviceKeys: string[];
        currentDeviceIndex: number;
        furthestIndex: number;
        // eslint-disable-next-line no-unused-vars
        setCurrentDeviceIndex: (index: number) => void;
        // eslint-disable-next-line no-unused-vars
        handleAnswerChange: (value: string) => void;
        goToNext: () => void;
        goToPrevious: () => void;
        submitExercises: () => void;
    };
};

export default function ExerciseScreen({ exercise }: ExerciseScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <Header 
                    title="Literary Devices Exercise" 
                    subtitle="Practice literary devices with example sentences" 
                />
                <div className="bg-gray-800 rounded-lg p-6">
                    <ProgressBar
                        current={exercise.currentDeviceIndex}
                        total={exercise.deviceKeys.length}
                        userAnswers={exercise.userAnswers}
                        deviceKeys={exercise.deviceKeys}
                        furthestIndex={exercise.furthestIndex}
                        onQuestionSelect={exercise.setCurrentDeviceIndex}
                    />
                    <DeviceInfo device={exercise.currentDevice} />
                    <ExampleSentence sentence={exercise.currentSentence} />
                    <ResponseInput
                        value={exercise.userAnswers[exercise.deviceKeys[exercise.currentDeviceIndex]] || ""}
                        onChange={exercise.handleAnswerChange}
                        deviceName={exercise.currentDevice.name}
                    />
                    <NavigationButtons
                        onPrevious={exercise.goToPrevious}
                        onNext={exercise.goToNext}
                        onSubmit={exercise.submitExercises}
                        isFirst={exercise.currentDeviceIndex === 0}
                        isLast={exercise.currentDeviceIndex === exercise.deviceKeys.length - 1}
                    />
                </div>
            </div>
        </div>
    );
}
