import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, { payload: quizzes }) => {
            state.quizzes = quizzes;
        },
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
            )) as any;
            console.log("updated a quiz:", state.quizzes);
        },
    },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
