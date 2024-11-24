import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { MdRocketLaunch } from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ProtectedContent from "../../ProtectedContent";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "./reducer";

export default function Quizzes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const today = new Date();

    const checkQuizAvailability = (availableFrom: string, availableUntil: string) => {
        const availableUntilDate = new Date(availableUntil);
        const availableFromDate = new Date(availableFrom);
        if (availableFromDate > today) {
            return <><b>Not available until</b> {availableFrom}</>;
        }
        else if (availableUntilDate < today) {
            return <b>Closed</b>
        }
        else {
            return <b>Available</b>
        }
    }
    const updatePublishStatus = (quiz: any) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        dispatch(updateQuiz(updatedQuiz));
    }
    return (
        <div id = "wd-quizzes">
            <div className="input-group float-start" style = {{ width: "250px" }}>
                <span className="input-group-text bg-body border-secondary-subtle border-end-0"><FaMagnifyingGlass className="fs-5 text-secondary" /></span>
                <input id = "wd-search-quiz" className="form-control border-secondary-subtle border-start-0" placeholder = "Search..." />
            </div>
            <ProtectedContent role='FACULTY'>
                <button id = "wd=add-quiz" className="btn btn-primary float-end me-1 bg-danger border-danger"
                    onClick={(e) => {
                        const newId =  new Date().getTime().toString();  
                        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newId}/edit`);
                    }}>
                    <FaPlus className="mb-1"/> Quiz
                </button> 
            </ProtectedContent>
            <br /><br />
            <ul className="list-group rounded-0">
                <li className="list-group-item p-0 mb-5 fs-5 border-gray border-1">
                    <div id = "wd-quizzes-title" className="wd-title p-3 ps-2 bg-secondary">
                        <ProtectedContent role='FACULTY'><BsGripVertical className="me-2 fs-3 float-start" /></ProtectedContent>
                        <span className="fw-bold">QUIZZES</span>
                        <ProtectedContent role='FACULTY'>
                            <button className="float-end border-0 bg-secondary p-0"><IoEllipsisVertical className="fs-4 mb-2" /></button>
                            <button className="float-end border-0 bg-secondary"><FaPlus className="mb-2"/></button>
                        </ProtectedContent>
                    </div>
                    <ul id= "wd-quiz-list" className="list-group rounded-0">
                        {quizzes.filter((quiz: any) => quiz.course === cid)
                            .map((quiz: any) => (
                                <li key={quiz._id} className = "wd-quiz-list-item list-group-item d-flex justify-content-between align-items-center">
                                    <div className="text-nowrap">
                                        <ProtectedContent role='FACULTY'><BsGripVertical className="me-2 fs-3" /></ProtectedContent>
                                        <MdRocketLaunch className="me-2 fs-5 text-success mt-1" />
                                    </div>
                                    <div className="ms-3 me-3" style ={{ width: "90%" }} >
                                        <a className = "wd-quiz-link text-decoration-none text-black fw-bold"
                                            href = {`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                                            {quiz.title}
                                        </a>
                                        <br />
                                        <span className="fs-6">
                                            {checkQuizAvailability(quiz.availableFrom, quiz.availableUntil)} | <b>Due</b> {quiz.due} | {quiz.points} pts | {quiz.questions.length} questions
                                        </span>
                                    </div>
                                    <ProtectedContent role='FACULTY'>
                                        <span className="d-flex float-end">
                                            {quiz.published ? 
                                                <button className="border-0 bg-white p-0" onClick={() => { updatePublishStatus(quiz); }}><GreenCheckmark /></button> : 
                                                <button className="border-0 bg-white p-0" onClick={() => { updatePublishStatus(quiz); }}><FcCancel className="fs-3 mb-1" /></button>}
                                            <div className="dropdown">
                                                <button className="border-0 bg-transparent" data-bs-toggle="dropdown" id="quiz-context-menu"><IoEllipsisVertical className="fs-4 mb-2" /></button>
                                                <ul className="dropdown-menu" aria-labelledby="quiz-context-menu">
                                                    <li><a className="dropdown-item" onClick={() => 
                                                            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>Edit</a></li>
                                                    <li><a className="dropdown-item" onClick={
                                                        () => dispatch(deleteQuiz(quiz._id))
                                                    }>Delete</a></li>
                                                    <li><a className="dropdown-item" onClick={
                                                        () => { updatePublishStatus(quiz); }
                                                    }>{quiz.published ? "Unpublish" : "Publish"}</a></li>
                                                    <li><a className="dropdown-item">Copy</a></li>
                                                    <li><a className="dropdown-item">Sort</a></li>
                                                </ul>
                                            </div>
                                        </span>
                                        </ProtectedContent>
                                </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}