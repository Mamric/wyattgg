"use client";

import { useState, useEffect } from "react";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import StartScreen from "./components/StartScreen";
import PomodoroTimer from "./components/PomodoroTimer";

type Screen = "start" | "timer";

export default function PomodoroPage() {
    const [currentScreen, setCurrentScreen] = useState<Screen>("start");
    const timer = usePomodoroTimer();

    useEffect(() => {
        const handleKeyPress = (e: globalThis.KeyboardEvent) => {
            if (e.code === 'Space' && 
                e.target instanceof globalThis.Element && 
                !['INPUT', 'TEXTAREA'].includes(e.target.tagName)
            ) {
                e.preventDefault();
                if (currentScreen === 'timer') {
                    timer.isActive ? timer.pauseTimer() : timer.startTimer();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentScreen, timer]);

    useEffect(() => {
        const minutes = Math.floor(timer.timeRemaining / 60);
        const seconds = timer.timeRemaining % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (currentScreen === 'timer') {
            document.title = `Wyatt.gg | ${timeString}`;
        } else {
            document.title = 'Wyatt.gg | Writing Exercises';
        }

        return () => {
            document.title = 'Wyatt.gg | Writing Exercises';
        };
    }, [currentScreen, timer.timeRemaining]);

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
