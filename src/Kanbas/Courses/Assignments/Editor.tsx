export default function AssignmentEditor() {
    return (
        <div id = "wd-assignments-editor" className="m-5">
            <label htmlFor = "wd-name" className="form-label">Assignment Name</label>
            <input id = "wd-name" className="form-control" value = "A1 - ENV + HTML" /><br /><br />
            <textarea id = "wd-description" className="form-control" cols = {50} rows = {8}>
                The assignment is avaialble online.
                Submit a link to the landing page of
                your Web application running on Netlify. The landing page should
                include the following: Your full name and section Links to each of the lab
                assignments Link to the Kanbas application Links to all relevant source 
                code repositories. The Kanbas application should include a link to navigate 
                back to the landing page.
            </textarea>
            <div className="row mt-5 me-5 row-col-2">
                <label htmlFor = "wd-points" className="col form-label text-end mt-2">Points</label>
                <input id = "wd-points" className="col form-control" value = {100} />
            </div>
            <div className="row mt-4 me-5 row-col-2">
                <label htmlFor = "wd-group" className="col form-label text-end mt-2">Assignment Group</label>
                <select id = "wd-group" className="col form-select">
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
                <select id = "wd-display-grade-as" className="col form-select">
                    <option value = "Percentage">Percentage</option>
                </select>
            </div>
            <div className="row mt-4 me-5 row-col-2">
                <label htmlFor = "wd-submission-type" className="col text-end form-label">Subnmission Type</label>
                <div className="col border rounded-2 p-3">
                    <select id = "wd-submission-type" className="form-select">
                        <option value="Online">Online</option>
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
                    <select id = "wd-assign-to" className="form-select"><option>Everyone</option></select>
                    <label htmlFor = "wd-due-date" className="form-label mt-3">Due</label>
                    <input type = "date" value = "2024-05-13" id = "wd-due-date" className="form-control" />
                    <div className="row row-col-2 mt-3">
                        <div className="col">
                            <label htmlFor = "wd-available-from" className="form-label">Available from</label>
                            <input type = "date" value = "2024-05-06" id = "wd-available-from" className="form-control" />
                        </div>
                        <div className="col">
                            <label htmlFor = "wd-available-until" className="form-label">Until</label>
                            <input type = "date" value = "2024-05-20" id = "wd-available-until" className="form-control"/>`
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <button className="btn btn-primary btn-danger me-5 float-end">Save</button>
            <button className="btn btn-secondary me-2 float-end">Cancel</button>
        </div>
    );
}