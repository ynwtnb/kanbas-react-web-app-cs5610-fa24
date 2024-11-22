import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import * as db from "./Database";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourse from "./ProtectedCourse";
import React from "react";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
	const [courses, setCourses] = useState<any[]>(db.courses);
	const { currentUser } = useSelector((state: any) => state.accountReducer);
	const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
	const fetchCourses = async () => {
		try {
			const courses = await userClient.findMyCourses();
			setCourses(courses);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchCourses();
	}, [currentUser, enrollments]);
	const [course, setCourse] = useState<any>({
		_id: "0",
		name: "New Course",
		number: "New Number",
		startDate: "2023-09-10",
		endDate: "2023-12-15",
		image: "/images/reactjs.jpg",
		description: "New Description",
	});
	const addNewCourse = async () => {
		const newCourse = await userClient.createCourse(course);
		setCourses([...courses, { ...course, ...newCourse }]);
		setCourse({
			_id: "0",
			name: "New Course",
			number: "New Number",
			startDate: "2023-09-10",
			endDate: "2023-12-15",
			image: "/images/reactjs.jpg",
			description: "New Description"
		});
	};
	const deleteCourse = async (courseId: string) => {
		const status = await courseClient.deleteCourse(courseId);
		if (course._id === courseId) {
			setCourse({
				_id: "0",
				name: "New Course",
				number: "New Number",
				startDate: "2023-09-10",
				endDate: "2023-12-15",
				image: "/images/reactjs.jpg",
				description: "New Description"
			});
		}
		setCourses(courses.filter((course) => course._id !== courseId));
	};
	const updateCourse = async () => {
		await courseClient.updateCourse(course);
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
		<Session>
			<div id="wd-kanbas">
				<KanbasNavigation />
				<div className="wd-main-content-offset p-3">
					<Routes>
						<Route path="/" element={<Navigate to="Dashboard" />} />
						<Route path="/Account/*" element={<Account />} />
						<Route
							path="/Dashboard"
							element={
								<ProtectedRoute>
									<Dashboard
										courses={courses}
										course={course}
										setCourse={setCourse}
										addNewCourse={addNewCourse}
										deleteCourse={deleteCourse}
										updateCourse={updateCourse}
									/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/Courses"
							element={
								<ProtectedRoute>
									<Navigate to="Courses" />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/Courses/:cid/*"
							element={
								<ProtectedCourse>
									<Courses courses={courses} />
								</ProtectedCourse>
							}
						/>
						<Route path="/Calendar" element={<h1>Calendar</h1>} />
						<Route path="/Inbox" element={<h1>Inbox</h1>} />
					</Routes>
				</div>
			</div>
		</Session>
	);
}
