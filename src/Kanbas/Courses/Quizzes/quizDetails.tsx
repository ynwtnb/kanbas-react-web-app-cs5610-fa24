import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import { useState, useEffect } from "react";
import React from "react";
import ProtectedContent from "../../ProtectedContent";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>({});
    let newQuiz = false;
    const dispatch = useDispatch();
    const getQuiz = () => {
        const editedQuiz = quizzes.filter((q: any) => (q._id == qid))
        if (editedQuiz.length > 0) {
            editedQuiz.map((q: any) => setQuiz(q));
        }
        else {
            setQuiz({ _id: qid, course: cid });
            newQuiz = true;
        }
    }
    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <div>
            <ProtectedContent role='STUDENT'>
                <div id="wd-quizzes-details" className="m-5">
                    hello
                </div>
            </ProtectedContent>
            <ProtectedContent role='FACULTY'>
                <div id = "wd-quizzes-editor" className="m-5">
                    <div>
                        <label htmlFor = "wd-name" className="form-label">Quiz Name</label>
                        <input id = "wd-name" className="form-control" value = {quiz.title} 
                            onChange={(e) => setQuiz({...quiz, title: e.target.value }) }/><br /><br />
                        <textarea id = "wd-description" value={quiz.description} className="form-control" cols = {50} rows = {8}
                            onChange={(e) => setQuiz({...quiz, description: e.target.value }) }/>
                        <div className="row mt-5 me-5 row-col-2">
                            <label htmlFor = "wd-type" className="col form-label text-end mt-2">Quiz Type</label>
                            <select id = "wd-type" className="col form-select" value={quiz.type ? quiz.type : "Graded Quiz"}
                                onChange={(e) => setQuiz({...quiz, type: e.target.value }) }>
                                <option value = "Graded Quiz">Graded Quiz</option>
                                <option value = "Practice Quiz">Practice Quiz</option>
                                <option value = "Graded Survey">Graded Survey</option>
                                <option value = "Ungraded Survey">Ungraded Survey</option>
                            </select>
                        </div>
                        <div className="row mt-4 me-5 row-col-2">
                            <label htmlFor = "wd-points" className="col form-label text-end mt-2">Points</label>
                            <input id = "wd-points" className="col form-control" value = {quiz.points} 
                                onChange={(e) => setQuiz({...quiz, points: e.target.value }) }/>
                        </div>
                        <div className="row mt-4 me-5 row-col-2">
                            <label htmlFor = "wd-group" className="col form-label text-end mt-2">Assignment Group</label>
                            <select id = "wd-group" className="col form-select" value={quiz.assignmentGroup ? quiz.assignmentGroup : "QUIZZES"}
                                onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value }) }>
                                <option value = "ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value = "QUIZZES">QUIZZES</option>
                                <option value = "EXAMS">EXAMS</option>
                                <option value = "PROJECTS">PROJECTS</option>
                            </select>
                        </div>
                        <div className="row mt-4 me-5 row-col-2">
                            <div className="col"></div>
                            <div className="col">
                                <b>Options</b>
                                <div className="form-check mt-3">
                                    <label htmlFor='wd-shuffle-answers' className="form-label">Shuffle Answers</label>
                                    <input type="checkbox" id='wd-shuffle-answers' className="form-check-input" 
                                    value={quiz.shuffleQuestions !== null ? quiz.shuffleQuestions : true}
                                    onChange={(e) => setQuiz({...quiz, shuffleAnswers: e.target.value })}/>
                                </div>
                                <div className="d-block">
                                    <div className="form-check mt-3 float-start">
                                        <label htmlFor='wd-time-limit' className="form-check-label">Time Limit</label>
                                        <input type="checkbox" id='wd-time-limit' className="form-check-input" 
                                            value={quiz.timeLimitEnabled !== null ? quiz.timeLimitEnabled : true}
                                        onChange={(e) => setQuiz({...quiz, timeLimitEnabled: e.target.value })}/>
                                    </div>
                                    <div className="mt-2 float-end">
                                        <input type='number' id='wd-time-limit' className="form-control float-start" 
                                            value={quiz.timeLimit ? quiz.timeLimit : 20} 
                                            onChange={(e) => setQuiz({...quiz, timeLimit: e.target.value }) }
                                            style={{width: "50%"}} />
                                        <label htmlFor="wd-time-limit" className="form-check-label float-start mt-2 ms-2">Minutes</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 me-5 row-col-2">
                            <div className="col"></div>
                            <div className="col form-check border rounded-2 p-2">
                                <div className="form-check">
                                    <label htmlFor="wd-multiple-attempts" className="form-check-label">Allow Multiple Attempts</label>
                                    <input type="checkbox" id="wd-multiple-attempts" className="form-check-input" 
                                        value={quiz.multipleAttempts !== null ? quiz.multipleAttempts : false}
                                        onChange={(e) => setQuiz({ ...quiz, multipleAttemps: e.target.value })} />
                                </div>
                                <div className="form-check mt-3">
                                    <label htmlFor="wd-correct-answers" className="form-check-label">Show Correct Answers</label>
                                    <input type="checkbox" id="wd-correct-answers" className="form-check-input" 
                                        value={quiz.showCorrectAnswers !== null ? quiz.showCorrectAnswers : false}
                                        onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })} />
                                </div>
                                <div className="form-check mt-3">
                                    <label htmlFor="wd-one-question" className="form-check-label">One Question at a Time</label>
                                    <input type="checkbox" id="wd-one-question" className="form-check-input" 
                                        value={quiz.oneQuestionAtATime !== null ? quiz.oneQuestionAtATime : true}
                                        onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.value })} />
                                </div>
                                <div className="form-check mt-3">
                                    <label htmlFor="wd-webcam" className="form-check-label">Webcam Required</label>
                                    <input type="checkbox" id="wd-webcam" className="form-check-input" 
                                        value={quiz.webcamRequired !== null ? quiz.webcamRequired : false}
                                        onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.value })} />
                                </div>
                                <div className="form-check mt-3">
                                    <label htmlFor="wd-lock-questions" className="form-check-label">Lock Questions After Answering</label>
                                    <input type="checkbox" id="wd-lock-questions" className="form-check-input" 
                                        value={quiz.lockQuestionsAfter !== null ? quiz.lockQuestionsAfter : false}
                                        onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfter: e.target.value })} />
                                </div>
                                <div className="border-0 mt-3">
                                    <label htmlFor="wd-access-code" className="form-label">Access Code</label>
                                    <input type='text' id="wd-access-code" className="form-control" value={quiz.accessCode}
                                        onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 me-5 row-col-2">
                            <label htmlFor = "wd-assign-to" className="col text-end">Assign</label>
                            <div className="col border rounded-2 p-3">
                                <label htmlFor = "wd-assign-to" className="form-label">Assign to</label>
                                <select id = "wd-assign-to" className="form-select" value={quiz.assignTo}
                                    onChange={(e) => setQuiz({...quiz, assignTo: e.target.value }) }>
                                    <option>Everyone</option></select>
                                <label htmlFor = "wd-due-date" className="form-label mt-3">Due</label>
                                <input type = "datetime-local" value = {quiz.due} id = "wd-due-date" className="form-control" 
                                    onChange={(e) => setQuiz({...quiz, due: e.target.value }) }/>
                                <div className="row row-col-2 mt-3">
                                    <div className="col" style={{maxWidth: "50%"}}>
                                        <label htmlFor = "wd-available-from" className="form-label">Available from</label>
                                        <input type = "datetime-local" value = {quiz.availableFrom} id = "wd-available-from" className="form-control" 
                                            onChange={(e) => setQuiz({...quiz, availableFrom: e.target.value }) }/>
                                    </div>
                                    <div className="col" style={{maxWidth: "50%"}}>
                                        <label htmlFor = "wd-available-until" className="form-label">Until</label>
                                        <input type = "datetime-local" value={quiz.availableUntil} id = "wd-available-until" className="form-control"
                                            onChange={(e) => setQuiz({...quiz, availableUntil: e.target.value }) }/>`
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Link to={`../../../Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-primary btn-danger me-5 float-end"
                            onClick={(e) => {
                                if (!newQuiz) {
                                    dispatch(updateQuiz(quiz));
                                }
                                dispatch(addQuiz(quiz));
                            }}>
                        Save</button>
                    </Link>
                    <Link to={`../../../Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-secondary me-2 float-end">Cancel</button>
                    </Link>
                </div>
            </ProtectedContent>
        </div>
    );
}