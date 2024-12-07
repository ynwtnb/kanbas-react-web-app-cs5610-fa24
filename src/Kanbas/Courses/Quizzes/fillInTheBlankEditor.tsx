import React from "react";
import Editor from 'react-simple-wysiwyg';
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from "react-icons/fa";

export default function FillInTheBlankEditor({ question, updateQuestion } : {
    question: any,
    updateQuestion: (question: any) => void
}) {
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [options, setOptions] = useState(question.options ? question.options : [
        {
            _id: uuidv4(),
            answer: "",
            correct: true,
            caseSensitive: false,
        }
    ]);
    const updateOption = (option: any) => {
        const updatedOptions = options.map((o: any) => o._id === option._id ? option : o);
        setOptions(updatedOptions);
        setEditedQuestion({ ...editedQuestion, options: updatedOptions });
    };
    const deleteOption = (optionId: string) => {
        const updatedOptions = options.filter((o: any) => o._id !== optionId);
        setOptions(updatedOptions);
        setEditedQuestion({ ...editedQuestion, options: updatedOptions });
    };
    return (
        <div>
            <div className="d-flex flex-row justify-content-between mb-4">
                <input type='text' className="form-control w-50" value={editedQuestion.title} 
                    onChange={(e) => { setEditedQuestion({ ...editedQuestion, title: e.target.value }) }} />
                <div>
                    <label htmlFor="pt-input" className="form-label float-end mt-1 ms-2">pts</label>
                    <input type='number' className="form-control w-25 float-end" id="pt-input" value={editedQuestion.points}
                        onChange={(e) => { setEditedQuestion({ ...editedQuestion, points: e.target.value }) }}/> 
                </div>
            </div>
            <h6><b>Question:</b></h6>
            <Editor value={editedQuestion.question} onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })} />
            <h6 className="mt-2"><b>Answers:</b></h6>
            <div className="row-col-3">
                {options.map((option: any) => {
                    return (
                        <div>
                        <div key={option._id} className="mt-2 row">
                            <label className="form-label float-start col-4 mt-1" htmlFor={`possible-answer-${option._id}`}>Possible Answer:</label>
                            <input type='text' className="form-control col" id={`possible-answer-${option._id}`} value={option.answer} 
                                onChange={(e) => {updateOption({ ...option, answer: e.target.value })}} />
                            <FaTrash className="col-1 mt-2"
                                onClick={() => {deleteOption(option._id)}}/>
                        </div>
                        <div className="row mt-1">
                            <div className="col-4"></div>
                            <div className="col form-check">
                                <input type='checkbox' className="form-check-input float-start" id={`case-${option._id}`} checked={option.caseSensitive}
                                    onChange={(e) => {updateOption({ ...option, caseSensitive: e.target.checked })}} />
                                <label className="form-check-label float-start" htmlFor={`case-${option._id}`}>Case Sensitive</label>
                            </div>
                        </div>
                        </div>
                    );
                })}
            </div>
            <a className="text-danger float-end mt-2" onClick={() => {
                const newOption = {
                    _id: uuidv4(),
                    answer: "",
                    correct: true,
                    caseSensitive: false,
                };
                setOptions([...options, newOption]);
            }}>+ Add Another Answer</a><br />
            <button className="btn btn-secondary float-start mt-2 me-2"
                onClick={() => {
                    const updatedQuestion = { ...question, editing: false };
                    updateQuestion(updatedQuestion);
                }}>Cancel</button>
            <button className="btn btn-danger float-start mt-2"
                onClick={() => {
                    const updatedQuestion = { ...editedQuestion, editing: false };
                    updateQuestion(updatedQuestion);
                }}>Update Question</button>
        </div>
    );
}