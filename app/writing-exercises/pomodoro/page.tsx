"use client";

import { useState } from "react";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import StartScreen from "./components/StartScreen";
import PomodoroTimer from "./components/PomodoroTimer";

type Screen = "start" | "timer";

export default function PomodoroPage() {
    const [currentScreen, setCurrentScreen] = useState<Screen>("start");
    const timer = usePomodoroTimer();

    const handleBegin = () => {
        setCurrentScreen("timer");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {currentScreen === "start" ? <StartScreen onBegin={handleBegin} /> : <PomodoroTimer timer={timer} />}
            </div>
        </div>
    );
}
