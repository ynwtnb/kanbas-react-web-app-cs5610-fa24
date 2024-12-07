import React from "react";
import Editor from 'react-simple-wysiwyg';
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

export default function TrueFalseEditor({ question, updateQuestion } : {
    question: any,
    updateQuestion: (question: any) => void
}) {
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [options, setOptions] = useState(question.options ? question.options : [
        {
            _id: uuidv4(),
            answer: "True",
            correct: false,
        },
        {
            _id: uuidv4(),
            answer: "False",
            correct: false,
        }
    ]);
    const updateOption = (option: any) => {
        const updatedOptions = options.map((o: any) => o._id === option._id ? option : o);
        if (option.correct) {
            updatedOptions.map((o: any) => {
                if (o._id !== option._id) {
                    o.correct = false;
                }
            });
        }
        setOptions(updatedOptions);
        setEditedQuestion({ ...editedQuestion, options: updatedOptions });
    }
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
            {options.map((option: any) => {
                return (
                    <div key={option._id}>
                        <div className="form-check mt-2">
                            {option.correct ?
                                <FaArrowAltCircleRight className="text-success fs-5 me-2" /> : null}
                            <input type="radio" id={`${option._id}-radio`} name="correct-radio" 
                                className="form-check-input"
                                checked={option.correct}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        updateOption({ ...option, correct: true });
                                    } else {
                                        updateOption({ ...option, correct: false });
                                    }
                                }}/>
                            { option.correct ? 
                                <label className="form-check-label text-success" htmlFor={`${option._id}-radio`}>{option.answer}</label> : 
                                <label className="form-check-label" htmlFor={`${option._id}-radio`}>{option.answer}</label>}
                        </div>
                    </div>
                );
            })}
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