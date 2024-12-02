import { useDispatch } from "react-redux";
import * as coursesClient from "../client";
import { setAssignments } from "./reducer";
import { Dispatch } from "redux";
import React from "react";

export const fetchAssignments = async (cid: any, dispatch: Dispatch) => {
	const assignments = await coursesClient.findAssignmentsForCourse(
		cid as string
	);
	dispatch(setAssignments(assignments));
	return assignments;
};

export const formatDate = (date: any) => {
	if (!date) return "";
	const localDate = new Date(date);
	const year = localDate.getFullYear();
	const month = String(localDate.getMonth() + 1).padStart(2, "0");
	const day = String(localDate.getDate()).padStart(2, "0");
	const hours = String(localDate.getHours()).padStart(2, "0");
	const minutes = String(localDate.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const checkAvailability = (now: Date, availableFrom: any) => {
	const localAvailableFrom = new Date(availableFrom);
	return localAvailableFrom < now;
};
export const checkClosed = (now: Date, availableUntil: any) => {
	const localAvailableUntil = new Date(availableUntil);
	return localAvailableUntil < now;
};
export const returnAvailability = (now: Date, availableFrom: any, availableUntil: any) => {
	if (!checkAvailability(now, availableFrom)) {
		return (
			<span>
				<b> Not Available Until</b> {formatDate(availableFrom)}
			</span>
		);
	} else if (checkClosed(now, availableUntil)) {
		return (
			<span>
				<b className="text-danger"> Closed</b>
			</span>
		);
	} else {
		return (
			<span>
				<b> Available Until</b> {formatDate(availableUntil)}
			</span>
		);
	}
};
