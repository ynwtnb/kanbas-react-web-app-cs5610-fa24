import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0 fs-6">
      {links.map((link) =>
        <Link to={`/Kanbas/Account/${link}`} key={link} className={`list-group-item border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}> {link} </Link>
      )}
    </div>
);}