export type ExerciseState = "start" | "in-progress" | "completed";

export type LiteraryDevice = {
    name: string;
    pronunciation: string;
    definition: string;
    whyUseIt: string;
    howToUseIt: string;
    school: string;
    example: string;
    derivation: string;
};

export type UserAnswers = {
    [key: string]: string;
};

export type ExerciseResult = {
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    exercises: {
        [key: string]: {
            deviceName: string;
            exampleSentence: string;
            userAnswer: string;
        };
    };
};
