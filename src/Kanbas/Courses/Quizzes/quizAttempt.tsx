import React from "react";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { RxTriangleRight, RxTriangleLeft } from "react-icons/rx";
import { GrEdit } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as quizzesClient from "./client";
import { error } from "console";

export default function QuizAttempt() {
    const { cid, qid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [quizzes, setQuizzes] = useState<any>([]);
    const [quiz, setQuiz] = useState<any>({});
    const [startTime, setStartTime] = useState<any>();
    const [currentQuestion, setCurrentQuestion] = useState<any>();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [quizResponse, setQuizResponse] = useState<any>([]);
    const navigate = useNavigate();
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
    } 
    const getStartTime = () => {
        const start = new Date().getTime();
        setStartTime(new Date(start).toLocaleString());
    };
    const createNewAttempt = async () => {
        const newQuizResponse = quiz.questions.map((q: any) => ({ 
            questionId: q._id, 
            options:
                q.options ? q.options.map((o: any) => ({ optionId: o._id, selected: false, answer: "", correct: o.correct ? false : true })) : [],
            points: 0,
        }));
        setQuizResponse(newQuizResponse);
    };
    useEffect(() => {
        getQuizzes();
        getStartTime();
    }, []);
    useEffect(() => {
        getQuiz();
    }, [quizzes]);
    useEffect(() => {
        if (quiz.questions) {
            setCurrentQuestion(quiz.questions[0]);
            createNewAttempt();
        }
    }, [quiz]);
    const updateOptionSelection = (optionId: String, selected: Boolean) => {
        if (quizResponse && quizResponse.length > 0) {
            const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === currentQuestion._id);
            const currentOptionResponse = currentQuestionResponse.options.find((o: any) => o.optionId === optionId);
            const option = currentQuestion.options.find((o: any) => o._id === optionId);
            let updatedOptionResponse = currentOptionResponse;
            if (option && option.correct && selected) {
                updatedOptionResponse =  { ...currentOptionResponse, selected: selected, correct: true };
            } else if (option && option.correct && !selected) {
                updatedOptionResponse =  { ...currentOptionResponse, selected: selected, correct: false };
            } else if (option && !option.correct && selected) {
                updatedOptionResponse =  { ...currentOptionResponse, selected: selected, correct: false };
            } else {
                updatedOptionResponse =  { ...currentOptionResponse, selected: selected, correct: true };
            }
            let updatedQuestionResponse = {}
            if (currentQuestion.quizType === 'Multiple Choice') {
                updatedQuestionResponse = { ...currentQuestionResponse, options: currentQuestionResponse.options.map((o: any) => o.optionId === optionId ? updatedOptionResponse : o) };
            } else if (currentQuestion.quizType === 'True/False') {
                updatedQuestionResponse = { ...currentQuestionResponse, options: currentQuestionResponse.options.map((o: any) => o.optionId === optionId ? updatedOptionResponse : { ...o, selected: false }) };
            } else {
                console.error("Fill in the blank question type not supported");
            }
            setQuizResponse(quizResponse.map((qr: any) => qr.questionId === currentQuestion._id ? updatedQuestionResponse : qr));
        }    
    };
    const updateFillInTheBlankAnswer = (answer: String) => {
        const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === currentQuestion._id);
        if (currentQuestion.options) {
            const match = currentQuestion.options.some((o: any) => {
                return o.caseSensitive 
                    ? answer === o.answer
                    : answer.toLowerCase() === o.answer.toLowerCase();
            });
            const updatedQuestionResponse = { ...currentQuestionResponse, answer: answer, correct: match };
            setQuizResponse(quizResponse.map((qr: any) => qr.questionId === currentQuestion._id ? updatedQuestionResponse : qr));
        }
    };
    const getChecked = (questionId: String, optionId: String) => {
        if (quizResponse) {
            const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === questionId);
            if (currentQuestionResponse) {
                const currentOptionResponse = currentQuestionResponse.options.find((o: any) => o.optionId === optionId);
                return currentOptionResponse.selected;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    const getAnswer = (questionId: String) => {
        console.log(quizResponse);
        if (quizResponse) {
            const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === questionId);
            if (currentQuestionResponse) {
                return currentQuestionResponse.answer;
            } else {
                return "";
            }
        } else {
            return "";
        }
    }
    const submitQuiz = async () => {
        const pointsArray = quizResponse.map((qr: any) => {
            const question = quiz.questions.find((q: any) => q._id === qr.questionId);
            let correct = true;
            if (question.quizType !== 'Fill in the Blank' && qr.options) {
                qr.options.forEach((o: any) => {
                    correct = o.correct && correct;
                });
            } else if (question.quizType === 'Fill in the Blank') {
                correct = qr.correct;
            }
            return correct ? question.points : 0;
        });
        const updatedQuizResponse = quizResponse.map((qr: any, index: number) => { return { ...qr, points: pointsArray[index] }});
        const totalPoints = pointsArray.reduce((acc: number, points: number) => acc + points, 0);
        const response = await quizzesClient.addQuizResponse(quiz._id, startTime, updatedQuizResponse, totalPoints);
        if (response) {
            console.log("Quiz submitted successfully");
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
        } else {
            console.error("Error submitting quiz");
        }
    };
    return (
        <div>
            <h2>{quiz ? quiz.title : null}</h2>
            Started: {startTime}<br /><br />
            <h2>Quiz Instructions</h2>
            <hr />
            <div className="d-flex flex-row justify-content-between">
                <div className="flex-fill">
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
                                                <input type="radio" name="option" id={`radio-answer-${option._id}`} checked={getChecked(currentQuestion._id, option._id)} className="form-check-input"
                                                    onChange = {(e) => { updateOptionSelection(option._id, e.target.checked); }} />
                                                <label htmlFor={`radio-answer-${option._id}`} className="form-check-label">{option.answer}</label>
                                            </div>
                                        );})
                                : null}
                                {currentQuestion && 
                                    currentQuestion.quizType == 'Multiple Choice' ? 
                                        currentQuestion.options.map((option: any) => {
                                        return (
                                            <div className="form-check">
                                                <input type="checkbox" name="option" id={`check-answer-${option._id}`} checked={getChecked(currentQuestion._id, option._id)} className="form-check-input"
                                                    onChange = {(e) => { updateOptionSelection(option._id, e.target.checked); }} />
                                                <label htmlFor={`check-answer-${option._id}`} className="form-check-label">{option.answer}</label>
                                            </div>
                                        );})
                                : null}
                                {currentQuestion && 
                                    currentQuestion.quizType == 'Fill in the Blank' ? 
                                        <input type="text" className="form-control mt-2" value={getAnswer(currentQuestion._id)}
                                            onChange = {(e) => { updateFillInTheBlankAnswer(e.target.value); }} />
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
                </div>
                <div className="m-3">
                    {quiz.questions ? quiz.questions.map((q: any) => {
                        return (
                            <div>
                                <a className={ currentQuestion && currentQuestion._id === q._id ? "text-danger font-weight-bold" : "text-black"}
                                    onClick={() => { 
                                        setCurrentQuestion(q);
                                        setCurrentQIndex(quiz.questions.indexOf(q));
                                }}>
                                    {q.title}</a>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
            <div className="d-flex border mt-3 justify-content-end p-2">
                <button className="btn btn-secondary rounded-0"
                    onClick={() => {submitQuiz();}}>Submit Quiz</button>
            </div>
            <button className="mt-3 w-100 btn btn-secondary rounded-0"
                onClick={() => {navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`);}}><GrEdit /> Keep editing this quiz</button>
        </div>
    );
}