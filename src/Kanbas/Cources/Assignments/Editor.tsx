export default function AssignmentEditor() {
    return (
        <div id = "wd-assignments-editor">
            <label htmlFor = "wd-name"><h3>Assignment Name</h3></label>
            <input id = "wd-name" value = "A1 - ENV + HTML" /><br /><br />
            <textarea id = "wd-description" cols = {50} rows = {8}>
                The assignment is avaialble online. Submit a link to the landing page of
                your Web application running on Netlify. The landing page should
                include the following: Your full name and section Links to each of the lab
                assignments Link to the Kanbas application Links to all relevant source 
                code repositories. The Kanbas application should include a link to navigate 
                back to the landing page.
            </textarea>
            <br />
            <br />
            <table>
                <tr>
                    <td align = "right" valign = "top">
                        <label htmlFor = "wd-points">Points</label>
                    </td>
                    <td>
                        <input id = "wd-points" value = {100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align = "right" valign = "top">
                        <label htmlFor = "wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id = "wd-group">
                            <option value = "ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value = "QUIZZES">QUIZZES</option>
                            <option value = "EXAMS">EXAMS</option>
                            <option value = "PROJECTS">PROJECTS</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align = "right" valign = "top">
                        <label htmlFor="wd-display-grade-as">
                            Display Grade as
                        </label>
                    </td>
                    <td>
                        <select id = "wd-display-grade-as">
                            <option value = "Percentage">Percentage</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align = "right" valign = "top">
                        <label htmlFor = "wd-submission-type">Subnmission Type</label>
                    </td>
                    <td>
                        <select id = "wd-submission-type">
                            <option value="Online">Online</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td align = "left" valign = "top">
                        <label>Online Entry Options</label>
                        <br />
                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-text-entry" />
                        <label htmlFor = "wd-text-entry">Text Entry</label>
                        <br />
                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-website-url" />
                        <label htmlFor = "wd-website-url">Website URL</label>
                        <br />
                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-media-recordings" />
                        <label htmlFor = "wd-media-recordings">Media Recordings</label>
                        <br />
                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-student-annotation" />
                        <label htmlFor = "wd-student-annotation">Student Annotation</label>
                        <br />
                        <input type = "checkbox" name = "wd-online-entry-options" id = "wd-file-upload" />
                        <label htmlFor = "wd-file-upload">File Upload</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align = "right" valign = "top">
                        <label htmlFor = "wd-assign-to">Assign</label>
                    </td>
                    <td>
                        <label htmlFor = "wd-assign-to">Assign to</label>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type = "text" id = "wd-assign-to" value = "Everyone" />
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td>
                        <label htmlFor = "wd-due-date">Due</label>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type = "date" value = "2024-05-13" id = "wd-due-date" />
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td>
                        <label htmlFor = "wd-available-from">Available from</label>
                    </td>
                    <td>
                        <label htmlFor = "wd-available-until">Until</label>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type = "date" value = "2024-05-06" id = "wd-available-from" />
                    </td>
                    <td>
                        <input type = "date" value = "2024-05-20" id = "wd-available-until" />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} align = "right">
                        <button>Cancel</button> <button>Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}