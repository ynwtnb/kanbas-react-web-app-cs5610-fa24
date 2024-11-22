import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const enrollCourse = async (courseId: string) => {
	const response = await axiosWithCredentials.post(
		`${ENROLLMENTS_API}/current/courses/${courseId}`
	);
	return response.data;
};

export const unenrollCourse = async (courseId: string) => {
	const response = await axiosWithCredentials.delete(
		`${ENROLLMENTS_API}/current/courses/${courseId}`
	);
	return response.data;
};