type CompletionStatsProps = {
    startTime: Date | null;
    endTime: Date | null;
    duration: number;
};

export default function CompletionStats({ startTime, endTime, duration }: CompletionStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-700 rounded-lg p-6">
            <div className="text-gray-300">
                <div className="flex flex-col space-y-1 mb-4">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-semibold text-sm">Date:</span>
                    </div>
                    <span className="text-base pl-7">{startTime?.toLocaleDateString(undefined, { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-sm">Duration:</span>
                    </div>
                    <span className="text-base pl-7">{Math.floor(duration / 60)} minutes, {duration % 60} seconds</span>
                </div>
            </div>
            <div className="text-gray-300">
                <div className="flex flex-col space-y-1 mb-4">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-sm">Start Time:</span>
                    </div>
                    <span className="text-base pl-7">{startTime?.toLocaleTimeString(undefined, { 
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-sm">End Time:</span>
                    </div>
                    <span className="text-base pl-7">{endTime?.toLocaleTimeString(undefined, { 
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}</span>
                </div>
            </div>
        </div>
    );
}
