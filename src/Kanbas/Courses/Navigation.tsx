import { Link, useParams, useLocation } from "react-router-dom";
import React from "react";

export default function CoursesNavigation() {
  const {cid} = useParams();
  const {pathname} = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-6 rounded-0">
      {links.map((link) => (
        <Link key = {link} id={`wd-course-${link.toLowerCase()}-link`} to={`/Kanbas/Courses/${cid}/${link}`} 
          className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
          {link}</Link>)
      )}
    </div>
);}

