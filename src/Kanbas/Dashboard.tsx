import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "./Database";
import ProtectedContent from "./ProtectedContent";
import { useState } from "react";
import { addEnrollment, deleteEnrollment } from "./enrollmentsReducer";
import { useDispatch } from "react-redux";

export default function Dashboard({
  courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse 
}: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) 
{
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const dispatch = useDispatch();
  const enroll = (course: any) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: currentUser._id,
        course: course._id,
      }
      dispatch(addEnrollment(newEnrollment));
  }
  const unenroll = (course: any) => {
    const foundEnrollment = enrollments.find((e: any) => (
      e.user === currentUser._id &&
      e.course === course._id
    ));
    if (foundEnrollment) {
      dispatch(deleteEnrollment(foundEnrollment._id));
    }
  }
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <ProtectedContent role='STUDENT'>
          <button className="btn btn-primary float-end" data-bs-toggle="button" onClick={() => setShowEnrollments(!showEnrollments)}>Enrollments</button>
        </ProtectedContent>
      </h1>
      <hr />
      <ProtectedContent role='FACULTY'>
        <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                  onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
        </h5>
        <br />
        <input value={course.name} className="form-control mb-2" 
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <textarea value={course.description} className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
        <hr />
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      </ProtectedContent>
      { !showEnrollments && 
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses
            .filter((course) => 
              enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              )
            )
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={course.image} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title overflow-y-hidden" style={{ maxHeight: 50 }}>
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      <button className="btn btn-primary"> Go </button>
                      <ProtectedContent role='FACULTY'>
                        <button onClick={(event) => {
                                  event.preventDefault();
                                  deleteCourse(course._id);
                                }} className="btn btn-danger float-end"
                                id="wd-delete-course-click">
                                Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
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
      }
      { showEnrollments &&
        <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
          .map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={course.image} width="100%" height={160} />
                </Link>
                    <div className="card-body">
                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                      <h5 className="wd-dashboard-course-title card-title overflow-y-hidden" style={{ maxHeight: 50 }}>
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                    </Link>
                      { enrollments.find((e: any) => (
                          e.user === currentUser._id &&
                          e.course === course._id)) ?
                            <button className="btn btn-danger float-end mt-3" onClick={() => unenroll(course)}>Unenroll</button>
                            : <button className="btn btn-success float-end mt-3" onClick={() => enroll(course)}>Enroll</button>
                      }
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      }
    </div>
  );
}

