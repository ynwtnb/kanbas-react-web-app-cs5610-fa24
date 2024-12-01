import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useEffect } from "react";
import React from "react";
import * as assignmentsClient from "./client";

export default function DeleteDialog( { assignment } : { assignment: any } ) {
    const dispatch = useDispatch();
    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };
    return (
            <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Delete Assignment: {assignment.title} </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this assignment?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Cancel </button>
                        <button onClick={() => removeAssignment(assignment._id)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                        Yes </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }