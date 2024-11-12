import { useState } from 'react';
import stages from '@/data/writing-exercises/heroes-journey/journey-stages.json';

export default function useHeroesJourneyExercise() {
    const [exercise, setExercise] = useState({
        currentStage: 1,
        storyBeats: [] as Array<{
            stage: number;
            stageName: string;
            content: string;
        }>,
    });

    const handleSubmitStage = (content: string) => {
        const currentStageData = stages.tutorial.stages.find(s => s.stageNumber === exercise.currentStage);
        
        if (!currentStageData || !content.trim()) return;

        const newStoryBeats = [...exercise.storyBeats, {
            stage: exercise.currentStage,
            stageName: currentStageData.stageName,
            content: content.trim()
        }];

        setExercise(prev => ({
            currentStage: prev.currentStage + 1,
            storyBeats: newStoryBeats
        }));
    };

    const resetExercise = () => {
        setExercise({
            currentStage: 1,
            storyBeats: [],
        });
    };

    return {
        exercise,
        handleSubmitStage,
        resetExercise,
        isComplete: exercise.currentStage > stages.tutorial.stages.length
    };
}
