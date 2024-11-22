import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
	const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
	return response.data;
};
export const updateAssignment = async (assignmentId: string, assignment: any) => {
    const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
    return response.data;
};