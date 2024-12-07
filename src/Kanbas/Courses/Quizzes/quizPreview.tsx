import React from "react";
import { useParams, useNavigate } from "react-router";
import * as assignmentsClient from "../Assignments/client";
import { useEffect } from "react";
import { RxTriangleRight, RxTriangleLeft } from "react-icons/rx";
import { GrEdit } from "react-icons/gr";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>({});
    const [startTime, setStartTime] = useState<any>();
    const [currentQuestion, setCurrentQuestion] = useState<any>();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const navigate = useNavigate();
    const getQuiz = () => {
        const editedQuiz = quizzes.filter((q: any) => (q._id == qid))
        if (editedQuiz.length > 0) {
            editedQuiz.map((q: any) => setQuiz(q));
        }
        else {
            setQuiz({ _id: qid, course: cid });
        }
    }
    useEffect(() => {
        getQuiz();
        getStartTime();
    }, []);
    useEffect(() => {
        if (quiz.questions) {
            setCurrentQuestion(quiz.questions[0]);
        }
    }, [quiz]);
    const getStartTime = () => {
        const start = new Date().getTime();
        setStartTime(new Date(start).toLocaleString());
    };
    return (
        <div>
            <h2>{quiz ? quiz.title : null}</h2>
            Started: {startTime}<br /><br />
            <h2>Quiz Instructions</h2>
            <hr />
            <div className="card rounded-0 mt-3 ms-3 me-3">
                <div className="card-header">
                    <b>{currentQuestion ? currentQuestion.title : null}</b>   
                    <b className="float-end">{currentQuestion ? currentQuestion.points : null} pts</b>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        {currentQuestion ? <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }} /> : null}
                        {currentQuestion && 
                            currentQuestion.quizType == 'True/False' ? 
                                currentQuestion.options.map((option: any) => {
                                return (
                                    <div className="form-check">
                                        <input type="radio" name="option" id={`radio-answer-${option._id}`} value={option.answer} className="form-check-input" />
                                        <label htmlFor={`radio-answer-${option._id}`} className="form-check-label">{option.answer}</label>
                                    </div>
                                );})
                        : null}
                        {currentQuestion && 
                            currentQuestion.quizType == 'Multiple Choice' ? 
                                currentQuestion.options.map((option: any) => {
                                return (
                                    <div className="form-check">
                                        <input type="checkbox" name="option" id={`check-answer-${option._id}`} value={option.answer} className="form-check-input" />
                                        <label htmlFor={`check-answer-${option._id}`} className="form-check-label">{option.answer}</label>
                                    </div>
                                );})
                        : null}
                        {currentQuestion && 
                            currentQuestion.quizType == 'Fill in the Blank' ? 
                                <input type="text" className="form-control mt-2" />
                        : null}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between ms-3 me-3">
                { currentQIndex > 0 ? 
                    <button className="btn btn-secondary rounded-0 mt-3"
                        onClick={() => {
                            setCurrentQIndex(currentQIndex - 1);
                            setCurrentQuestion(quiz.questions[currentQIndex - 1]);
                        }} ><RxTriangleLeft />Previous</button> :
                    <div></div>}
                { quiz.questions && currentQIndex < quiz.questions.length - 1 ? 
                    <button className="btn btn-danger rounded-0 mt-3"
                    onClick={() => {
                        setCurrentQIndex(currentQIndex + 1);
                        setCurrentQuestion(quiz.questions[currentQIndex + 1]);
                    }} >Next<RxTriangleRight /></button> :
                    <div></div>}
            </div>
            <div className="d-flex border mt-3 justify-content-end p-2">
                <button className="btn btn-secondary rounded-0">Submit Quiz</button>
            </div>
            <button className="mt-3 w-100 btn btn-secondary rounded-0"
                onClick={() => {navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`);}}><GrEdit /> Keep editing this quiz</button>
        </div>
    );
}