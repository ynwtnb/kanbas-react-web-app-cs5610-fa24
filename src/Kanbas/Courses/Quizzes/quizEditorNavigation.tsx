import { Link, useParams, useLocation } from "react-router-dom";
import React from "react";

export default function QuizEditorNavigation() {
    const { cid, qid } = useParams();
    const { pathname } = useLocation();
    return(
        <div>
            <ul className="nav nav-pills">
                <li className="nav-link">
                    <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit/details`}
                        className={`nav-link ${pathname.includes("details") ? "active" : "text-danger"}`}
                    >Details</Link>
                </li>
                <li className="nav-link">
                    <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit/questions`}
                        className={`nav-link ${pathname.includes("questions") ? "active" : "text-danger"}`}
                    >Questions</Link>
                </li>
            </ul>
        </div>
    );
}