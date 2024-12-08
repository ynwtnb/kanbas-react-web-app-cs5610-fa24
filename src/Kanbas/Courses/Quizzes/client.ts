import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const getQuizResponse = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
    return data;
};

export const addQuizResponse = async (quizId: String, submissionDate: any, quizResponse: any, totalPoints: Number) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
    if (data) {
        const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/attempts`, { submissionDate: submissionDate, quizResponse: quizResponse, totalPoints: totalPoints});
        return data;
    } else {
        const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, { submissionDate: submissionDate, quizResponse: quizResponse, totalPoints: totalPoints});
        return data;
    }
};