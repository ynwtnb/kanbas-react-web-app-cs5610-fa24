import CoursesNavigation from './Navigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import PeopleTable from './People/Table';
import AssignmentEditor from './Assignments/Editor';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { AsyncResource } from 'async_hooks';
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../Database";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);
    return (
        <div id="wd-courses">
            <h2>
                <FaAlignJustify className = "me-4 fs-4 mb-1" />
                <span className='text-danger'>{course && course.name}</span> 
                <span className='text-secondary'> {pathname.split("/")[4] === "Home" ? "" : "> " + pathname.split("/")[4]}</span></h2> 
            <hr />
            <div className = "d-flex">
                <div className  = "d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className = "flex-fill">
                    <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="Quizzes" element={<h2>Quizzes</h2>} />
                    <Route path="Zoom" element={<h2>Zoom</h2>} />
                    <Route path="Grades" element={<h2>Grades</h2>} />
                    <Route path="Piazza" element={<h2>Piazza</h2>} />
                    <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}  