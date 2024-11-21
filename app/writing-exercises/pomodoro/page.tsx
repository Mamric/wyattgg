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
        <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
            <div className="w-full max-w-5xl px-4 py-4 sm:py-8">
                {currentScreen === "start" ? <StartScreen onBegin={handleBegin} /> : <PomodoroTimer timer={timer} />}
            </div>
        </div>
    );
}
