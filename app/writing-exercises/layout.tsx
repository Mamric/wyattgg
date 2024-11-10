import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wyatt.gg | Writing Exercises",
    description: "Personal writing exercise workspace",
};

export default function WritingExercisesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
