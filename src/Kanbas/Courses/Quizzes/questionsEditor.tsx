import React from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateQuiz } from "./reducer";
import { useDispatch } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import MultipleChoiceEditor from "./multipleChoiceEditor";

export default function QuestionsEditor() {
    const { qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>();
    const [questions, setQuestions] = useState<{ _id: string; order: number; points: number; question: string; editing: boolean }[]>([]);
    const dispatch = useDispatch();
    const fetchQuestions = () => {
        const quiz = quizzes.find((q: any) => q._id === qid);
        setQuiz(quiz);
        setQuestions(quiz.questions);
    };
    const addNewQuestion = () => {
        const newQuestion = {
            _id: new Date().getTime().toString(),
            order: questions.length + 1,
            points: 1,
            question: "",
            editing: false,
        };
        setQuestions([...questions, newQuestion]);
    };
    const deleteQuestion = (qId: string) => {
        const updatedQuestions = questions.filter((q: any) => q._id !== qId)
            .map((q: any, index: number) => ({
                ...q,
                order: index + 1, // 配列のインデックスに基づいて order を再計算
            }));
        setQuestions(updatedQuestions);
    };
    const updateQuestion = (q: any) => {
        const updatedQuestions = questions.map((question: any) => question._id === q._id ? q : question);
        setQuestions(updatedQuestions);
    }
    useEffect(fetchQuestions, [quizzes]);
    return (
        <div>
            <div>
                {questions.map((q: any) => (
                    <div key={q._id} className="card rounded-0 mt-3">
                        <div className="card-header">
                            <b className="float-start fs-5">Question {q.order}</b>
                            <button className="float-end mt-1 border-0 bg-secondary"
                                onClick={() => deleteQuestion(q._id)}>
                                <FaTrash className="fs-5 text-danger" />
                            </button>
                            <button className="float-end ms-2 mt-1 border-0 bg-secondary"
                                onClick={() => {
                                    const updatedQuestion = { ...q, editing: !q.editing };
                                    updateQuestion(updatedQuestion);
                                }}>
                                <FaEdit className="fs-4 text-success"/>
                            </button>
                            <b className="float-end pt-2">{q.points} pts</b>
                            <div className="dropdown float-end me-3">
                                <select className="form-select" aria-label="Default select example" defaultValue="Multiple Choice"
                                    onChange={(e) => {
                                        const updatedQuestion = {...q, type: e.target.value};
                                        updateQuestion(updatedQuestion);
                                    }}>
                                    <option value="Multiple Choice" className="dropdown-item">Multiple Choice</option>
                                    <option value="True False" className="dropdown-item">True/False</option>
                                    <option value="Fill in the Blank" className="dropdown-item">Fill in the Blank</option>
                                </select>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-text">
                                {q.editing ? <MultipleChoiceEditor /> : 
                                    (q.question !== "" ? q.question: "Click to edit question")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary mt-5 mb-5" onClick={ () => addNewQuestion() }><FaPlus /> New Question</button>
            </div>
            <hr />
            <button className="btn btn-danger float-end">Save</button>
            <button className="btn btn-secondary float-end me-2">Cancel</button>
        </div>
    );
}