import { createSlice } from '@reduxjs/toolkit';
import * as db from "../../Database";

const initialState = {
    quizzes: db.quizzes,
}

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, { payload: quiz }) => {
            state.quizzes = [...state.quizzes, quiz] as any;
            console.log("added new quiz:", state.quizzes);
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId
            );
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) => (
                q._id === quiz._id ? quiz : q
            ));
            console.log("updated a quiz:", state.quizzes);
        },
    },
});

export const { addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
