import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";

export default function ProtectedCourse({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const isEnrolled = enrollments.find((enrollment: any) => (
        enrollment.user === currentUser._id &&
        enrollment.course === cid
    ))
    if (isEnrolled) {
        return children;
    } else {
        return <Navigate to="/Kanbas/Dashboard" />;
}}