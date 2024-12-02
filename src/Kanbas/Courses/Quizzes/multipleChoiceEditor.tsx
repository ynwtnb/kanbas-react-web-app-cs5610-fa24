import React from "react";
import Editor from 'react-simple-wysiwyg';
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function MultipleChoiceEditor({ question, updateQuestion } : {
    question: any,
    updateQuestion: (question: any) => void
}) {
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [options, setOptions] = useState(question.options ? question.options : [
        {
            _id: new Date().getTime().toString(),
            answer: "",
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
            <h6><label htmlFor="multiple-choice-question" className="form-label"><b>Question:</b></label></h6>
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
                                <label className="form-check-label text-success" htmlFor={`${option._id}-radio`}>Correct Answer</label> : 
                                <label className="form-check-label" htmlFor={`${option._id}-radio`}>Possible Answer</label>}
                        </div>
                        <textarea className="form-control mt-2" value={option.answer} 
                            onChange={(e) => {updateOption({ ...option, answer: e.target.value })}} />
                    </div>
                );
            })}
            <a className="text-danger float-end" onClick={() => {
                const newOption = {
                    _id: new Date().getTime().toString(),
                    answer: "",
                    correct: false,
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