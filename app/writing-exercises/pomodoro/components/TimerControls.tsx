type TimerControlsProps = {
    isActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onOpenSettings: () => void;
    isSettingsOpen: boolean;
};

export default function TimerControls({ 
    isActive, 
    onStart, 
    onPause, 
    onReset, 
    onOpenSettings, 
    isSettingsOpen 
}: TimerControlsProps) {
    const handleStartPause = () => {
        isActive ? onPause() : onStart();
    };

    return (
        <div className="flex justify-center items-center gap-4">
            <button
                onClick={onReset}
                className="px-4 py-2 text-gray-400 rounded-lg
                         transition-colors duration-75 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
            </button>

            <button
                onClick={handleStartPause}
                className={`w-32 px-6 py-3 rounded-lg text-lg font-medium text-white
                          transition-[transform,box-shadow] duration-75
                          flex items-center justify-center gap-2
                          ${isActive 
                            ? 'bg-yellow-600 translate-y-[2px]' 
                            : 'bg-green-600 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)]'
                          }
                          active:translate-y-[2px] active:shadow-none`}
            >
                {isActive ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
                {isActive ? 'Pause' : 'Start'}
            </button>

            <button
                onClick={onOpenSettings}
                className={`px-4 py-2 rounded-lg transition-colors duration-75 
                           flex items-center gap-2 ${
                    isSettingsOpen ? 'text-purple-400' : 'text-gray-400'
                }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
            </button>
        </div>
    );
}
