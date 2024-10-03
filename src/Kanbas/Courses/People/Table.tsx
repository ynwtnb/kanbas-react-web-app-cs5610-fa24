import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
    return (
        <div id="wd-people-table">
        <table className="table table-striped">
            <thead>
            <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
            </thead>
            <tbody>
            <tr><td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Tony</span>{" "}
                <span className="wd-last-name">Stark</span></td>
                <td className="wd-login-id">001234561S</td>
                <td className="wd-section">S101</td>
                <td className="wd-role">STUDENT</td>
                <td className="wd-last-activity">2024-10-01</td>
                <td className="wd-total-activity">09:13:45</td> </tr>
            <tr><td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Hannah</span>{" "}
                <span className="wd-last-name">McLaren</span></td>
                <td className="wd-login-id">001234561S</td>
                <td className="wd-section">S101</td>
                <td className="wd-role">STUDENT</td>
                <td className="wd-last-activity">2024-09-29</td>
                <td className="wd-total-activity">18:45:23</td> </tr>
            <tr><td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Mark</span>{" "}
                <span className="wd-last-name">Smith</span></td>
                <td className="wd-login-id">001234561S</td>
                <td className="wd-section">S101</td>
                <td className="wd-role">TA</td>
                <td className="wd-last-activity">2024-10-02</td>
                <td className="wd-total-activity">23:15:40</td> </tr>
            <tr><td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Laura</span>{" "}
                <span className="wd-last-name">Williams</span></td>
                <td className="wd-login-id">001234561S</td>
                <td className="wd-section">S101</td>
                <td className="wd-role">STUDENT</td>
                <td className="wd-last-activity">2024-09-30</td>
                <td className="wd-total-activity">05:20:32</td> </tr>
            </tbody>
        </table>
    </div> );}

