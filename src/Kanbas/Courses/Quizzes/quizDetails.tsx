import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../Assignments/reducer";
import { useState, useEffect } from "react";
import React from "react";
import ProtectedContent from "../../ProtectedContent";
import { GrEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Assignments/util";
import * as quizzesClient from "./client";
import QuizResults from "./quizResults";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [quizzes, setQuizzes] = useState<any>([]);
    const [quiz, setQuiz] = useState<any>({});
    const [prevQuizEntry, setPrevQuizEntry] = useState<any>(null);
    const getQuizzes = () => {
        const fetchedQuizzes = assignments.filter((assignment: any) => assignment.assignmentGroup === "QUIZZES");
        setQuizzes(fetchedQuizzes);
    };
    const getQuiz = () => {
        const editedQuiz = quizzes.filter((q: any) => (q._id == qid))
        if (editedQuiz.length > 0) {
            editedQuiz.map((q: any) => setQuiz(q));
        }
        else {
            setQuiz({ _id: qid, course: cid });
        }
    };
    useEffect (() => {
        getQuizzes();
    }, []);
    useEffect(() => {
        getQuiz();
    }, [quizzes]);
    const fetchQuizEntry = async (quizId: string) => {
        const prevQuizEntry = await quizzesClient.getQuizResponse(qid as string);
        if (prevQuizEntry !== null) {
            setPrevQuizEntry(prevQuizEntry);
        } 
    };
    const selectNavigation = async (quizId: string) => {
        if (prevQuizEntry) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/results`);
        } else {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/attempt`);
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        const result = fetchQuizEntry(qid as string);
        console.log(result);
    }, []);
    return (
        <div id="wd-quiz-details">
            <ProtectedContent role={['FACULTY']}>
                <button id='wd-quiz-preview' className="btn btn-secondary me-2"
                    onClick={() => { selectNavigation(quiz._id); }}>Preview</button>
                <button id='wd-quiz-preview' className="btn btn-secondary"
                    onClick={() => { navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`); }}><GrEdit className="me-2" />Edit</button>
                <hr />
            </ProtectedContent>
            <h3 className="mb-4">{quiz.title}
                <ProtectedContent role={['STUDENT']}>
                {
                    prevQuizEntry !== null && prevQuizEntry.attemptNumber < quiz.howManyAttempts ?
                    <button className="btn btn-danger float-end"
                        onClick={() => {navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt`);}}>New Attempt</button>
                    : null
                }
                </ProtectedContent>
            </h3>
            <ProtectedContent role={['FACULTY']}>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Quiz Type</b>
                    </div>
                    <div className="col">
                        {quiz.quizType}
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Points</b>
                    </div>
                    <div className="col">
                        {quiz.points}
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Assignment Group</b>
                    </div>
                    <div className="col">
                        {quiz.assignmentGroup}
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Shuffle Answers</b>
                    </div>
                    <div className="col">
                        {quiz.shuffleAnswers ? "Yes" : "No"}
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Time Limit</b>
                    </div>
                    <div className="col">
                        {quiz.timeLimit} minutes
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Multiple Attempts</b>
                    </div>
                    <div className="col">
                        {quiz.multipleAttempts ? "Yes" : "No"}
                    </div>
                </div>
                {quiz.multipleAttempts ?
                    <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                        <div className="col text-end">
                            <b>How Many Attempts</b>
                        </div>
                        <div className="col">
                            {quiz.howManyAttempts}
                        </div>
                    </div>
                : null}
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Show Correct Answers</b>
                    </div>
                    <div className="col">
                        {quiz.showCorrectAnswers ? "Yes" : "No"}
                    </div>
                </div>
                {quiz.accessCode ?
                    <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                        <div className="col text-end">
                            <b>Access Code</b>
                        </div>
                        <div className="col">
                            {quiz.accessCode}
                        </div>
                    </div>
                : null}
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>One Question at a Time</b>
                    </div>
                    <div className="col">
                        {quiz.oneQuestionAtATime ? "Yes" : "No"}
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Webcam Required</b>
                    </div>
                    <div className="col">
                        {quiz.webcamRequired ? "Yes" : "No"}
                    </div>
                </div>
                <div id='wd-quiz-properties' className="row row-col-2 mb-2">
                    <div className="col text-end">
                        <b>Lock Questions After Answering</b>
                    </div>
                    <div className="col">
                        {quiz.lockQuestionsAfter ? "Yes" : "No"}
                    </div>
                </div>
                <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope='col'>Due</th>
                            <th scope='col'>Available from</th>
                            <th scope='col'>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formatDate(quiz.due)}</td>
                            <td>{formatDate(quiz.availableFrom)}</td>
                            <td>{formatDate(quiz.availableUntil)}</td>
                        </tr>
                    </tbody>
                </table>
            </ProtectedContent>
            <ProtectedContent role={['STUDENT']}>
                {
                    prevQuizEntry === null ?
                        <button className="btn btn-danger float-end"
                            onClick={() => { navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/attempt`); }}>Take quiz</button>
                        : null
                }
                {
                    prevQuizEntry !== null ?
                    <QuizResults />
                    : null
                }
            </ProtectedContent>
        </div>
    );
};