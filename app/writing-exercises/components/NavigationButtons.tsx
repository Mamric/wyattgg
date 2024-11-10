type NavigationButtonsProps = {
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isFirst: boolean;
    isLast: boolean;
};

export default function NavigationButtons({ 
    onPrevious, 
    onNext, 
    onSubmit, 
    isFirst, 
    isLast 
}: NavigationButtonsProps) {
    return (
        <div className="flex justify-between items-center">
            <button
                onClick={onPrevious}
                disabled={isFirst}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 
                         hover:bg-blue-700 transition-colors"
            >
                Previous
            </button>
            {isLast ? (
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded 
                             hover:bg-green-700 transition-colors"
                >
                    Submit
                </button>
            ) : (
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-blue-600 text-white rounded 
                             hover:bg-blue-700 transition-colors"
                >
                    Next
                </button>
            )}
        </div>
    );
}
