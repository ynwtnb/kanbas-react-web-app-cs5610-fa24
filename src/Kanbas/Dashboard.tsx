import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "./Database";
import ProtectedContent from "./ProtectedContent";
import { useEffect, useState } from "react";
import {
	addEnrollment,
	deleteEnrollment,
} from "./Enrollments/enrollmentsReducer";
import { useDispatch } from "react-redux";
import React from "react";
import * as courseClient from "./Courses/client";
import * as usersClient from "./Account/client";
import * as enrollmentsClient from "./Enrollments/client";

export default function Dashboard({
	courses,
	course,
	setCourse,
	addNewCourse,
	deleteCourse,
	updateCourse,
	enrolling,
	setEnrolling,
	updateEnrollment,
}: {
	courses: any[];
	course: any;
	setCourse: (course: any) => void;
	addNewCourse: () => void;
	deleteCourse: (course: any) => void;
	updateCourse: () => void;
	enrolling: boolean;
	setEnrolling: (enrolling: boolean) => void;
	updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
	const { currentUser } = useSelector((state: any) => state.accountReducer);
	const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
	const [allCourses, setAllCoursees] = useState<any[]>(db.courses);
	const fetchAllCourses = async () => {
		try {
			const fetchedCourses = await courseClient.fetchAllCourses();
			setAllCoursees(fetchedCourses);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchAllCourses();
	}, []);
	return (
		<div id="wd-dashboard">
			<h1 id="wd-dashboard-title">
				Dashboard
				<ProtectedContent role={["STUDENT", "TA"]}>
					<button
						onClick={() => setEnrolling(!enrolling)}
						className="float-end btn btn-primary"
					>
						{enrolling ? "My Courses" : "All Courses"}
					</button>
				</ProtectedContent>
			</h1>
			<hr />
			<ProtectedContent role={["FACULTY", "ADMIN"]}>
				<h5>
					New Course
					<button
						className="btn btn-primary float-end"
						id="wd-add-new-course-click"
						onClick={addNewCourse}
					>
						{" "}
						Add{" "}
					</button>
					<button
						className="btn btn-warning float-end me-2"
						onClick={updateCourse}
						id="wd-update-course-click"
					>
						Update
					</button>
				</h5>
				<br />
				<input type="file" className="form-control mb-2" id="file-upload"
					defaultValue=""
					onChange={(e) => {
						if (e.target.files) {
							const filename = e.target.files[0].name;
							setCourse({ ...course, image: `/images/${filename}` });
						}
					}} />
				<input
					value={course.name}
					className="form-control mb-2"
					onChange={(e) => setCourse({ ...course, name: e.target.value })}
				/>
				<textarea
					value={course.description}
					className="form-control"
					onChange={(e) =>
						setCourse({ ...course, description: e.target.value })
					}
				/>
				<hr />
				<h2 id="wd-dashboard-published">
					Published Courses ({courses.length})
				</h2>{" "}
				<hr />
			</ProtectedContent>
			<div id="wd-dashboard-courses" className="row">
				<div className="row row-cols-1 row-cols-md-5 g-4">
					{courses.map((course) => (
						<div className="wd-dashboard-course col" style={{ width: "300px" }}>
							<div className="card rounded-3 overflow-hidden">
								<Link
									to={`/Kanbas/Courses/${course._id}/Home`}
									className="wd-dashboard-course-link text-decoration-none text-dark"
								>
									<img src={course.image} width="100%" height={160} />
									<div className="card-body">
										<h5
											className="wd-dashboard-course-title card-title overflow-y-hidden"
											style={{ maxHeight: 50 }}
										>
											{course.name}{" "}
										</h5>
										<p
											className="wd-dashboard-course-title card-text overflow-y-hidden"
											style={{ maxHeight: 100 }}
										>
											{course.description}{" "}
										</p>
										{!enrolling ? (
											<button className="btn btn-primary"> Go </button>
										) : null}
										<ProtectedContent role={["STUDENT", "TA"]}>
											{enrolling ? (
												<button
													className={`btn float-end mb-2 ${
														course.enrolled ? "btn-danger" : "btn-success"
													}`}
													onClick={(e) => {
														e.preventDefault();
														updateEnrollment(course._id, !course.enrolled);
													}}
												>
													{course.enrolled ? "Unenroll" : "Enroll"}
												</button>
											) : null}
										</ProtectedContent>
										<ProtectedContent role={["FACULTY", "ADMIN"]}>
											<button
												onClick={(event) => {
													event.preventDefault();
													deleteCourse(course._id);
												}}
												className="btn btn-danger float-end"
												id="wd-delete-course-click"
											>
												Delete
											</button>
											<button
												id="wd-edit-course-click"
												onClick={(event) => {
													event.preventDefault();
													setCourse(course);
												}}
												className="btn btn-warning me-2 float-end"
											>
												Edit
											</button>
										</ProtectedContent>
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
