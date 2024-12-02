import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ProtectedContent from "../../ProtectedContent";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DeleteDialog from "./DeleteDialog";
import React from "react";
import * as coursesClient from "../client";
import { useDispatch } from "react-redux";
import { setAssignments } from "./reducer";
import { fetchAssignments, formatDate, returnAvailability } from "./util";

export default function Assignments() {
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [currentAssignment, setCurrentAssignment] = useState<any>({_id: "", title:""});
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const now = new Date();
    useEffect(() => {
        fetchAssignments(cid, dispatch);
    }, []);
    return (
        <div id = "wd-assignments">
            <div className="input-group float-start" style = {{ width: "250px" }}>
                <span className="input-group-text bg-body border-secondary-subtle border-end-0"><FaMagnifyingGlass className="fs-5 text-secondary" /></span>
                <input id = "wd-search-assignment" className="form-control border-secondary-subtle border-start-0" placeholder = "Search..." />
            </div>
            <ProtectedContent role={['FACULTY']}>
                <button id = "wd=add-assignment" className="btn btn-primary float-end me-1 bg-danger border-danger"
                    onClick={(e) => {
                        const newId =  new Date().getTime().toString();  
                        navigate(`/Kanbas/Courses/${cid}/Assignments/${newId}`);
                    }}>
                    <FaPlus className="mb-1"/> Assignment
                </button> 
            </ProtectedContent>
            <br /><br />
            <ul className="list-group rounded-0">
                <li className="list-group-item p-0 mb-5 fs-5 border-gray border-1">
                    <div id = "wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary">
                        <ProtectedContent role={['FACULTY']}><BsGripVertical className="me-2 fs-3 float-start" /></ProtectedContent>
                        <span className="fw-bold">ASSIGNMENTS</span>
                        <ProtectedContent role={['FACULTY']}>
                            <button className="float-end border-0 bg-secondary p-0"><IoEllipsisVertical className="fs-4 mb-2" /></button>
                            <button className="float-end border-0 bg-secondary"><FaPlus className="mb-2"/></button>
                            <div className="float-end border rounded-5 ps-2 pe-2 border-dark-subtle fs-6">
                                40% of Total
                            </div>
                        </ProtectedContent>
                    </div>
                    <ul id= "wd-assignment-list" className="list-group rounded-0">
                        {assignments
                            .map((assignment: any) => (
                                <li key={assignment._id} className = "wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                                    <div className="text-nowrap">
                                        <ProtectedContent role={['FACULTY']}><BsGripVertical className="me-2 fs-3" /></ProtectedContent>
                                        {assignment.assignmentGroup === "QUIZZES" ? <MdRocketLaunch className="me-2 fs-5 text-success mt-1" /> :<TfiWrite className="me-2 fs-5 text-success mt-1" />}
                                    </div>
                                    <div className="text-truncate ms-3 me-3" style ={{ width: "90%" }} >
                                        <a className = "wd-assignment-link text-decoration-none text-black fw-bold"
                                            href = {assignment.assignmentGroup === 'QUIZZES' ? `#/Kanbas/Courses/${cid}/Quizzes/${assignment._id}`:`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                            {assignment.title}
                                        </a>
                                        <br />
                                        <span className="fs-6">
                                            <span className="text-danger">Multiple Modules</span> | 
                                            {returnAvailability(now, assignment.availableFrom, assignment.availableUntil)} |
                                            <br />
                                            <b>Due</b> {formatDate(assignment.due)} | {assignment.points} pts
                                        </span>
                                    </div>
                                    <ProtectedContent role={['FACULTY']}>
                                        <span className="d-flex">
                                            <FaTrash className="text-danger float-end me-2" onClick={() => setCurrentAssignment(assignment)} data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" /><LessonControlButtons /></span>
                                        </ProtectedContent>
                                </li>
                        ))}
                    </ul>
                </li>
            </ul>
            <DeleteDialog assignment={currentAssignment} />
        </div>
    );
}