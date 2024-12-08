import React from "react";
import ProtectedContent from "../../ProtectedContent";
import { Routes, Route, Navigate } from "react-router-dom";
import DetailsEditor from "./detailsEditor";
import QuestionsEditor from "./questionsEditor";
import QuizEditorNavigation from "./quizEditorNavigation";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "../Assignments/client";
import { addAssignment, updateAssignment } from "../Assignments/reducer";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [quizzes, setQuizzes] = useState<any>([]);
    const [quiz, setQuiz] = useState<any>({});
    const [newQuiz, setNewQuiz] = useState(false);
    const [quizResponse, setQuizResponse] = useState<any>([]);
    const dispatch = useDispatch();
    const getQuizzes = () => {
        const fetchedQuizzes = assignments.filter((assignment: any) => assignment.assignmentGroup === "QUIZZES");
        setQuizzes(fetchedQuizzes);
    }; 
    const getQuiz = () => {
        const editedQuiz = quizzes.find((q: any) => (q._id == qid))
        if (editedQuiz) {
            setQuiz(editedQuiz);
            setNewQuiz(false);
        }
        else {
            setQuiz({ 
                title: "",
                course: cid,
                description: "",
                display: "Percentage",
                submissionType: "Online",
                onlineEntry: [],
                assignmentGroup: "QUIZZES",
                assignTo: "Everyone",
                published: false,
                quizType: "Graded Quiz",
                shuffleAnswers: true,
                timeLimitEnabled: true,
                timeLimit: 20,
                multipleAttempts: false,
                howManyAttempts: 1,
                showCorrectAnswers: true,
                accessCode: "",
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestionsAfter: false,
                questions: [],
            });
            setNewQuiz(true);
        }
    };
    const createQuiz = async (quiz: any) => {
        const newQuiz = await coursesClient.createAssignmentForCourse(cid as string, quiz);
        dispatch(addAssignment(newQuiz));
    };
    const updateQuiz = (quiz: any) => {
        const updatedQuiz = assignmentsClient.updateAssignment(quiz._id, quiz);
        dispatch(updateAssignment(updatedQuiz));
    }
    useEffect (() => {
        getQuizzes();
    }, []);
    useEffect(() => {
        getQuiz();
    }, [quizzes]);
    return (
        <div>
            <QuizEditorNavigation />
            <Routes>       
                <Route path={'/'} element={<Navigate to="details" />} />
                <Route path={'details'} element={<DetailsEditor quiz={quiz} setQuiz={setQuiz} />} />
                <Route path={'questions'} element={<QuestionsEditor quiz={quiz} setQuiz={setQuiz} />} />
            </Routes>
            <hr />
            <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                <button className="btn btn-primary btn-success me-5 float-end"
                    onClick={(e) => {
                        if (newQuiz) {
                            createQuiz(quiz);
                        } else {
                            updateQuiz(quiz);
                        }
                    }}>
                Save</button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                <button className="btn btn-primary btn-danger me-2 float-end"
                    onClick={(e) => {
                        if (newQuiz) {
                            const publishedQuiz = { ...quiz, published: true };
                            setQuiz(publishedQuiz);
                            createQuiz(publishedQuiz);
                        } else {
                            const publishedQuiz = { ...quiz, published: true };
                            setQuiz(publishedQuiz);
                            updateQuiz(publishedQuiz);
                        }
                    }}>
                Save and Publish</button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                <button className="btn btn-secondary me-2 float-end">Cancel</button>
            </Link>
        </div>
    );
}