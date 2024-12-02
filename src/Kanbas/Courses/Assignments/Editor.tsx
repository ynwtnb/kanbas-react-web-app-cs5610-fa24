import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useState, useEffect } from "react";
import React from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { formatDate } from "./util";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignment, setAssignment] = useState<any>({});
    const [isNewAssignment, setIsNewAssignment] = useState(false);
    const dispatch = useDispatch();
    const getAssignment = () => {
        const editedAssignment = assignments.filter((a: any) => (a._id == aid))
        if (editedAssignment.length > 0) {
            editedAssignment.map((a: any) => setAssignment(a));
        }
        else {
            setAssignment({ _id: aid, course: cid });
            setIsNewAssignment(true);
        }
    }
    useEffect(() => {
        getAssignment();
    }, []);
    const createAssignment = async (assignment: any) => {
        const newAssignment = await coursesClient.createAssignmentForCourse(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
    };
    const saveAssignment = async (assignment: any) => {
        const updatedAssignment = await assignmentsClient.updateAssignment(aid as string, assignment);
        dispatch(updateAssignment(updatedAssignment));
    };
    const updateOnlineEntry = (e: any, entryOption: string) => {
        if (e.target.checked) {
            setAssignment({
                ...assignment,
                onlineEntry: [...(assignment.onlineEntry || []), entryOption]
            });
        } else {
            setAssignment({
                ...assignment,
                onlineEntry: (assignment.onlineEntry || []).filter((type: string) => type !== entryOption)
            });
        }
    };
    return (
        <div id = "wd-assignments-editor" className="m-5">
            <div>
                <label htmlFor = "wd-name" className="form-label">Assignment Name</label>
                <input id = "wd-name" className="form-control" value = {assignment.title} 
                    onChange={(e) => setAssignment({...assignment, title: e.target.value }) }/><br /><br />
                <textarea id = "wd-description" value={assignment.description} className="form-control" cols = {50} rows = {8}
                    onChange={(e) => setAssignment({...assignment, description: e.target.value }) }/>
                <div className="row mt-5 me-5 row-col-2">
                    <label htmlFor = "wd-points" className="col form-label text-end mt-2">Points</label>
                    <input id = "wd-points" className="col form-control" value = {assignment.points} 
                        onChange={(e) => setAssignment({...assignment, points: e.target.value }) }/>
                </div>
                <div className="row mt-4 me-5 row-col-2">
                    <label htmlFor = "wd-group" className="col form-label text-end mt-2">Assignment Group</label>
                    <select id = "wd-group" className="col form-select" value={assignment.assignmentGroup}
                        onChange={(e) => setAssignment({...assignment, assignmentGroup: e.target.value }) }>
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
                    <select id = "wd-display-grade-as" className="col form-select" value={assignment.display}
                        onChange={(e) => setAssignment({...assignment, display: e.target.value }) }>
                        <option value = "Percentage">Percentage</option>
                        <option value = "Point">Point</option>
                    </select>
                </div>
                <div className="row mt-4 me-5 row-col-2">
                    <label htmlFor = "wd-submission-type" className="col text-end form-label">Submission Type</label>
                    <div className="col border rounded-2 p-3">
                        <select id = "wd-submission-type" className="form-select"
                            onChange={(e) => setAssignment({...assignment, submissionType: e.target.value }) }>
                            <option value={assignment.submissionType}>Online</option>
                        </select>
                        <label className="form-label fw-bold mt-3">Online Entry Options</label>
                        <div className="form-check mt-3">
                            <input type="checkbox" name="wd-online-entry-options" id="wd-text-entry" className="form-check-input"
                                checked={assignment.onlineEntry?.includes("Text Entry")}
                                onChange={(e) => {updateOnlineEntry(e, "Text Entry")}} />
                            <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                        </div>
                        <div className="form-check mt-3">
                            <input type = "checkbox" name = "wd-online-entry-options" id = "wd-website-url" className="form-check-input"
                            checked={assignment.onlineEntry?.includes("Website URL")}
                            onChange={(e) => {updateOnlineEntry(e, "Website URL")}} />
                            <label htmlFor = "wd-website-url" className="form-check-label">Website URL</label>
                        </div>
                        <div className="form-check mt-3">
                            <input type = "checkbox" name = "wd-online-entry-options" id = "wd-media-recordings" className="form-check-input"
                            checked={assignment.onlineEntry?.includes("Media Recordings")}
                            onChange={(e) => {updateOnlineEntry(e, "Media Recordings")}}/>
                            <label htmlFor = "wd-media-recordings" className="form-check-label">Media Recordings</label>
                        </div>
                        <div className="form-check mt-3">
                            <input type = "checkbox" name = "wd-online-entry-options" id = "wd-student-annotation" className="form-check-input"
                            checked={assignment.onlineEntry?.includes("Student Annotation")}
                            onChange={(e) => {updateOnlineEntry(e, "Student Annotation")}}/>
                            <label htmlFor = "wd-student-annotation" className="form-check-label">Student Annotation</label>
                        </div>
                        <div className="form-check mt-3">
                            <input type = "checkbox" name = "wd-online-entry-options" id = "wd-file-upload" className="form-check-input"
                            checked={assignment.onlineEntry?.includes("File Upload")}
                            onChange={(e) => {updateOnlineEntry(e, "File Upload")}}/>
                            <label htmlFor = "wd-file-upload" className="form-check-label">File Upload</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 me-5 row-col-2">
                    <label htmlFor = "wd-assign-to" className="col text-end">Assign</label>
                    <div className="col border rounded-2 p-3">
                        <label htmlFor = "wd-assign-to" className="form-label">Assign to</label>
                        <select id = "wd-assign-to" className="form-select" value={assignment.assignTo}
                            onChange={(e) => setAssignment({...assignment, assignTo: e.target.value }) }>
                            <option>Everyone</option></select>
                        <label htmlFor = "wd-due-date" className="form-label mt-3">Due</label>
                        <input type = "datetime-local" value = {formatDate(assignment.due)} id = "wd-due-date" className="form-control" 
                            onChange={(e) => setAssignment({...assignment, due: e.target.value }) }/>
                        <div className="row row-col-2 mt-3">
                            <div className="col" style={{maxWidth: "50%"}}>
                                <label htmlFor = "wd-available-from" className="form-label">Available from</label>
                                <input type = "datetime-local" value = {formatDate(assignment.availableFrom)} id = "wd-available-from" className="form-control" 
                                    onChange={(e) => setAssignment({...assignment, availableFrom: e.target.value }) }/>
                            </div>
                            <div className="col" style={{maxWidth: "50%"}}>
                                <label htmlFor = "wd-available-until" className="form-label">Until</label>
                                <input type = "datetime-local" value={formatDate(assignment.availableUntil)} id = "wd-available-until" className="form-control"
                                    onChange={(e) => setAssignment({...assignment, availableUntil: e.target.value }) }/>`
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <Link to={`../../../Kanbas/Courses/${cid}/Assignments`}>
                <button className="btn btn-primary btn-danger me-5 float-end"
                    onClick={(e) => {
                        if (!isNewAssignment) {
                            saveAssignment(assignment);
                        } else {
                            createAssignment(assignment);
                        }
                    }}>
                Save</button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                <button className="btn btn-secondary me-2 float-end">Cancel</button>
            </Link>
        </div>
    );
}