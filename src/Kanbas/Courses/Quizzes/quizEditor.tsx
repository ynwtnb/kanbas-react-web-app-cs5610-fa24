import React from "react";
import ProtectedContent from "../../ProtectedContent";
import { Routes, Route, Navigate } from "react-router-dom";
import DetailsEditor from "./detailsEditor";
import QuestionsEditor from "./questionsEditor";
import QuizEditorNavigation from "./quizEditorNavigation";

export default function QuizEditor() {
    return (
        <div>
            <QuizEditorNavigation />
            <Routes>       
                <Route path={'/'} element={<Navigate to="details" />} />
                <Route path={'details'} element={<DetailsEditor />} />
                <Route path={'questions'} element={<QuestionsEditor />} />
            </Routes>
        </div>
    );
}