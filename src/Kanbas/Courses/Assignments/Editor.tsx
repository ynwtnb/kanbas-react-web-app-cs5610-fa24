import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const { assignments } = db;
    return (
        <div id = "wd-assignments-editor" className="m-5">
            {assignments.filter((assignment) => (assignment._id == aid))
                .map(
                    (assignment) => (
                        <div>
                            <label htmlFor = "wd-name" className="form-label">Assignment Name</label>
                            <input id = "wd-name" className="form-control" value = {assignment.title} /><br /><br />
                            <textarea id = "wd-description" className="form-control" cols = {50} rows = {8}>
                                {assignment.description}
                            </textarea>
                            <div className="row mt-5 me-5 row-col-2">
                                <label htmlFor = "wd-points" className="col form-label text-end mt-2">Points</label>
                                <input id = "wd-points" className="col form-control" value = {assignment.points} />
                            </div>
                            <div className="row mt-4 me-5 row-col-2">
                                <label htmlFor = "wd-group" className="col form-label text-end mt-2">Assignment Group</label>
                                <select id = "wd-group" className="col form-select" value={assignment.assignmentGroup}>
                                    <option value = "ASSIGNMENTS">ASSIGNMENTS</option>
                                    <option value = "QUIZZES">QUIZZES</option>
                                    <option value = "EXAMS">EXAMS</option>
                                    <option value = "PROJECTS">PROJECTS</option>
                                </select>
                            </div>
                            <div className="row mt-4 me-5 row-col-2">
                                <label htmlFor="wd-display-grade-as" className="col form-label text-end">
                                    Display Grade as
                                </label>
                                <select id = "wd-display-grade-as" className="col form-select" value={assignment.display}>
                                    <option value = "Percentage">Percentage</option>
                                </select>
                            </div>
                            <div className="row mt-4 me-5 row-col-2">
                                <label htmlFor = "wd-submission-type" className="col text-end form-label">Submission Type</label>
                                <div className="col border rounded-2 p-3">
                                    <select id = "wd-submission-type" className="form-select">
                                        <option value={assignment.submissionType}>Online</option>
                                    </select>
                                    <label className="form-label fw-bold mt-3">Online Entry Options</label>
                                    <div className="form-check mt-3">
                                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-text-entry" className="form-check-input"/>
                                        <label htmlFor = "wd-text-entry" className="form-check-label">Text Entry</label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-website-url" className="form-check-input" />
                                        <label htmlFor = "wd-website-url" className="form-check-label">Website URL</label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-media-recordings" className="form-check-input"/>
                                        <label htmlFor = "wd-media-recordings" className="form-check-label">Media Recordings</label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-student-annotation" className="form-check-input"/>
                                        <label htmlFor = "wd-student-annotation" className="form-check-label">Student Annotation</label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-file-upload" className="form-check-input"/>
                                        <label htmlFor = "wd-file-upload" className="form-check-label">File Upload</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4 me-5 row-col-2">
                                <label htmlFor = "wd-assign-to" className="col text-end">Assign</label>
                                <div className="col border rounded-2 p-3">
                                    <label htmlFor = "wd-assign-to" className="form-label">Assign to</label>
                                    <select id = "wd-assign-to" className="form-select" value={assignment.assignTo}><option>Everyone</option></select>
                                    <label htmlFor = "wd-due-date" className="form-label mt-3">Due</label>
                                    <input type = "datetime-local" value = {assignment.due} id = "wd-due-date" className="form-control" />
                                    <div className="row row-col-2 mt-3">
                                        <div className="col" style={{maxWidth: "50%"}}>
                                            <label htmlFor = "wd-available-from" className="form-label">Available from</label>
                                            <input type = "datetime-local" value = {assignment.availableFrom} id = "wd-available-from" className="form-control" />
                                        </div>
                                        <div className="col" style={{maxWidth: "50%"}}>
                                            <label htmlFor = "wd-available-until" className="form-label">Until</label>
                                            <input type = "datetime-local" value={assignment.availableUntil} id = "wd-available-until" className="form-control"/>`
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            <hr />
            <Link to={`../../../Kanbas/Courses/${cid}/Assignments`}><button className="btn btn-primary btn-danger me-5 float-end">Save</button></Link>
            <Link to={`../../../Kanbas/Courses/${cid}/Assignments`}><button className="btn btn-secondary me-2 float-end">Cancel</button></Link>
        </div>
    );
}