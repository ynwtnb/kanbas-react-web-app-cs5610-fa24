import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";
import * as userClient from "./Account/client";

export default function ProtectedCourse({ courses, enrolling, children }: { courses: any, enrolling: boolean, children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    if (!currentUser) {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }
    const course = courses.find((c: any) => {
        if (c) return c._id === cid
        else return false
    });
    if (!course || enrolling) {
        return <Navigate to="/Kanbas/Dashboard" />;
    } else {
        return children;
    }
};