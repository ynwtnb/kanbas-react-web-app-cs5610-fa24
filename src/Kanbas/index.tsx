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
	const [courses, setCourses] = useState<any[]>([]);
	const [enrolling, setEnrolling] = useState<boolean>(false);
	const { currentUser } = useSelector((state: any) => state.accountReducer);
	const findCoursesForUser = async () => {
		try {
			const courses = await userClient.findCoursesForUser(currentUser._id);
			setCourses(courses);
		} catch (error) {
			console.error(error);
		}
		console.log(courses);
	};
	const fetchCourses = async () => {
		try {
			const allCourses = await courseClient.fetchAllCourses();
			const enrolledCourses = await userClient.findCoursesForUser(
				currentUser._id
			);
			console.log(enrolledCourses);
			const courses = allCourses.map((course: any) => {
				if (enrolledCourses.find((c: any) => {
					if (c) return c._id === course._id;
					else return false
				})) {
					return { ...course, enrolled: true };
				} else {
					return course;
				}
			});
			setCourses(courses);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (enrolling) {
			fetchCourses();
		} else {
			findCoursesForUser();
		}
	}, [currentUser, enrolling]);
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
		// const newCourse = await userClient.createCourse(course);
		const newCourse = await courseClient.createCourse(course);
		setCourses([...courses, { ...course, ...newCourse }]);
		setCourse({
			_id: "0",
			name: "New Course",
			number: "New Number",
			startDate: "2023-09-10",
			endDate: "2023-12-15",
			image: "/images/reactjs.jpg",
			description: "New Description",
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
				description: "New Description",
			});
		}
		setCourses(courses.filter((course) => course._id !== courseId));
	};
	const updateCourse = async () => {
		await courseClient.updateCourse(course);
		setCourses(
			courses.map((c) => {
				if (c) {
					if (c._id === course._id) {
						return course;
					} else {
						return c;
					}
				}
			})
		);
		setCourse({
			_id: "0",
			name: "New Course",
			number: "New Number",
			startDate: "2023-09-10",
			endDate: "2023-12-15",
			image: "/images/reactjs.jpg",
			description: "New Description",
		});
	};
	const updateEnrollment = async (courseId: string, enrolled: boolean) => {
		if (enrolled) {
			await userClient.enrollIntoCourse(currentUser._id, courseId);
		} else {
			await userClient.unenrollFromCourse(currentUser._id, courseId);
		}
		setCourses(
			courses.map((course) => {
				if (course._id === courseId) {
					return { ...course, enrolled: enrolled };
				} else {
					return course;
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
										enrolling={enrolling}
										setEnrolling={setEnrolling}
										updateEnrollment={updateEnrollment}
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
								<ProtectedCourse courses={courses} enrolling={enrolling}>
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
