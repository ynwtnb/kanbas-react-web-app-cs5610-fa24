import "./styles.css"
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import * as db from "./Database";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourse from "./ProtectedCourse";
import React from "react";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>(db.courses);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    const addNewCourse = () => {
        const newCourse = { ...course,
                            _id: new Date().getTime().toString() };
        setCourses([...courses, { ...course, ...newCourse }]);
    };
    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
            if (c._id === course._id) {
                return course;
            } else {
                return c;
            }
            })
        );
    };
    return (
        <div id="wd-kanbas">
            <KanbasNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<ProtectedRoute>
                                                        <Dashboard 
                                                            courses={courses}
                                                            course={course}
                                                            setCourse={setCourse}
                                                            addNewCourse={addNewCourse}
                                                            deleteCourse={deleteCourse}
                                                            updateCourse={updateCourse}
                                                        />
                                                    </ProtectedRoute>} />
                    <Route path="/Courses" element={<ProtectedRoute><Navigate to="Courses" /></ProtectedRoute>} />
                    <Route path="/Courses/:cid/*" element={<ProtectedCourse><Courses courses={courses} /></ProtectedCourse>} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}