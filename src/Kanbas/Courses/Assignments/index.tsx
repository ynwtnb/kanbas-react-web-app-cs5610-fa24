import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as db from "../../Database";

export default function Assignments() {
    const assignments = db.assignments;
    const { cid } = useParams();
    return (
        <div id = "wd-assignments">
            <div className="input-group float-start" style = {{ width: "250px" }}>
                <span className="input-group-text bg-body border-secondary-subtle border-end-0"><FaMagnifyingGlass className="fs-5 text-secondary" /></span>
                <input id = "wd-search-assignment" className="form-control border-secondary-subtle border-start-0" placeholder = "Search..." />
            </div>
            <button id = "wd=add-assignment" className="btn btn-primary float-end me-1 bg-danger border-danger"><FaPlus className="mb-1"/> Assignment</button> 
            <button id = "wd-add-assignment-group" className="btn btn-secondary float-end me-1"><FaPlus className="mb-1"/> Group</button> 
            <br /><br />
            <ul className="list-group rounded-0">
                <li className="list-group-item p-0 mb-5 fs-5 border-gray border-1">
                    <div id = "wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3 float-start" />
                        <span className="fw-bold">ASSIGNMENTS</span>
                        <button className="float-end border-0 bg-secondary p-0"><IoEllipsisVertical className="fs-4 mb-2" /></button>
                        <button className="float-end border-0 bg-secondary"><FaPlus className="mb-2"/></button>
                        <div className="float-end border rounded-5 ps-2 pe-2 border-dark-subtle fs-6">
                            40% of Total
                        </div>
                    </div>
                    <ul id= "wd-assignment-list" className="list-group rounded-0">
                        {assignments.filter((assignment) => assignment.course === cid)
                            .map((assignment) => (
                                <li key={assignment._id} className = "wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                                    <div className="text-nowrap">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <TfiWrite className="me-2 fs-5 text-success mt-1" />
                                    </div>
                                    <div className="text-truncate ms-3 me-3" style ={{ width: "90%" }} >
                                        <a className = "wd-assignment-link text-decoration-none text-black fw-bold"
                                            href = {`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                            {assignment.title}
                                        </a>
                                        <br />
                                        <span className="fs-6">
                                            <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {assignment.availableFrom} |
                                            <br />
                                            <b>Due</b> {assignment.due} | {assignment.points} pts
                                        </span>
                                    </div>
                                    <span className="text-nowrap"><LessonControlButtons /></span>
                                </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}