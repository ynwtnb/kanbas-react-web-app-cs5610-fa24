import React from "react";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { RxTriangleRight, RxTriangleLeft } from "react-icons/rx";
import { GrEdit } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as quizzesClient from "./client";
import { error } from "console";
import ProtectedContent from "../../ProtectedContent";

export default function QuizResults() {
    const { cid, qid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [quizzes, setQuizzes] = useState<any>([]);
    const [quiz, setQuiz] = useState<any>({});
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [quizEntry, setQuizEntry] = useState<any>({});
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
    const fetchQuizResponse = async () => {
        const prevQuizEntry = await quizzesClient.getQuizResponse(qid as string);
        setQuizEntry(prevQuizEntry);
        if (prevQuizEntry !== null) {
            const prevQuizResponse = prevQuizEntry.quizResponse;
            setQuizResponse(prevQuizResponse);
        } else {
            return null;
        }
    };
    useEffect (() => {
        getQuizzes();
    }, []);
    useEffect(() => {
        getQuiz();
    }, [quizzes]);
    useEffect(() => {
        fetchQuizResponse();
    }, [quiz]);
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
    };
    const getCorrectStatus = (questionId: String, optionId: String) => {
        const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === questionId);
        if (currentQuestionResponse && quiz.showCorrectAnswers) {
            const currentOption = quiz.questions.find((q: any) => q._id === questionId).options.find((o: any) => o._id === optionId);
            const currentOptionResponse = currentQuestionResponse.options.find((o: any) => o.optionId === optionId);
            if (currentOptionResponse.selected && currentOption.correct) {
                return <div className="bg-success text-white text-center position-absolute top-0" style={{width: "120px", left: "-130px"}}>Correct!</div>
            } else if (currentOptionResponse.selected && !currentOption.correct) {
                return <div className="bg-danger text-white text-center position-absolute top-0" style={{width: "120px", left: "-130px"}}>Incorrect!</div>
            } else if (!currentOptionResponse.selected && currentOption.correct) {
                return <div className="bg-secondary text-black text-center position-absolute top-0" style={{width: "120px", left: "-130px"}}>Correct Answer</div>
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    const getCorrectStatusForAnswer = (questionId: String) => {
        const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === questionId);
        if (currentQuestionResponse && quiz.showCorrectAnswers) {
            if (currentQuestionResponse.correct) {
                return <div className="bg-success text-white text-center position-absolute top-0" style={{width: "120px", left: "-130px"}}>Correct!</div>
            } else {
                return <div className="bg-danger text-white text-center position-absolute top-0" style={{width: "120px", left: "-130px"}}>Incorrect!</div>
            }
    }};
    const getQuestionPoints = (questionId: String) => {
        const currentQuestionResponse = quizResponse.find((qr: any) => qr.questionId === questionId);
        if (currentQuestionResponse) {
            return currentQuestionResponse.points;
        } else {
            return 0;
        }
    };
    const getTotalPoints = () => {
        let totalPoints = 0;
        quizResponse.map((qr: any) => {
            totalPoints += qr.points;
        });
        return totalPoints;
    };
    return (
        <div>
            <h2>
                Quiz Results
                <ProtectedContent role={['FACULTY']}>
                    <button className="btn btn-danger float-end"
                        onClick={() => {navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt`);}}>New Attempt</button>
                </ProtectedContent>
            </h2>
            Attempts {quizEntry ? quizEntry.attemptNumber : null}<br />
            Submitted: {quizEntry ? new Date(quizEntry.submissionDate).toLocaleString() : null}<br />
            <b>Total Score: {getTotalPoints()}</b>
            <hr />
            {quiz.questions && quiz.questions.map((question: any) => {
                return (
                    <div key={question._id} className="card rounded-0 mt-3 me-3" style={ quiz.showCorrectAnswers ? { marginLeft: "120px" } : {}}>
                        <div className="card-header">
                            <b>{question ? question.title : null}</b>   
                            <b className="float-end">{question ? `${getQuestionPoints(question._id)} / ${question.points}` : null} pts</b>
                        </div> 
                        <div className="card-body">
                            <div className="card-text">
                                {question ? <span dangerouslySetInnerHTML={{ __html: question.question }} /> : null}
                                {question && 
                                    question.quizType == 'True/False' ? 
                                        question.options.map((option: any) => {
                                        return (
                                            <div className="form-check position-relative">
                                                <input type="radio" name={`option-${question._id}`} id={`radio-answer-${question._id}-${option._id}`} checked={getChecked(question._id, option._id)} className="form-check-input" />
                                                <label htmlFor={`radio-answer-${question._id}-${option._id}`} className="form-check-label">{option.answer}</label>
                                                {getCorrectStatus(question._id, option._id)}
                                            </div>
                                        );})
                                : null}
                                {question && 
                                    question.quizType == 'Multiple Choice' ? 
                                        question.options.map((option: any) => {
                                        return (
                                            <div className="form-check position-relative">
                                                <input type="checkbox" name={`option-${question._id}`} id={`check-answer-${question._id}-${option._id}`} checked={getChecked(question._id, option._id)} className="form-check-input" />
                                                <label htmlFor={`check-answer-${question._id}-${option._id}`} className="form-check-label">{option.answer}</label>
                                                {getCorrectStatus(question._id, option._id)}
                                            </div>
                                        );})
                                : null}
                                {question && 
                                    question.quizType == 'Fill in the Blank' ? 
                                        <div className="position-relative">
                                            <input type="text" className="form-control mt-2" value={getAnswer(question._id)} />
                                            {getCorrectStatusForAnswer(question._id)}
                                        </div>
                                : null}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}