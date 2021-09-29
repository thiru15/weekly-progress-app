import React, { useState } from 'react'
import * as uuid from 'uuid';
import { Question } from './questions';

function InternalProject() {
    const uniqueId = uuid.v4();
    const initialState: Array<Question> = [
        {
            id: uuid.v4(),
            question: "Are you working on an internal project?",
            options: ["yes", "no"],
            containOthers: false,
            showOthers: false,
        },

    ]
    const [questions, setQuestions] = useState(initialState);

    const [showMore, setShowMore] = useState(false)

    const selectOnlyOne = (event: any, index: number, optionIndex: number) => {
        event.preventDefault()
        optionIndex == 0 ? setShowMore(true) : setShowMore(false);
        document.querySelectorAll(`.question-${uniqueId}-${index}`).forEach((checkbox: any, index) => {

            // console.log("pressed others", questions[index], questions[0], index - 1, optionIndex);

            if (optionIndex !== index) {

                checkbox.checked = false;
                checkbox.parentElement.classList.remove('selected');
            }
            else {
                checkbox.checked = true;
                checkbox.parentElement.classList.add('selected');
            }
        }
        )
    }

    return (
        <div className="quesiton_container">
            <h1 className="question_header">Internal Project</h1>
            <hr className="solid" />
            {
                questions.map((question, questionIndex) => {
                    return <div className="internal">
                        <div>
                            <h4 className="question">{question.question}</h4>
                            <div className="question_options">
                                {question.options.map((option, optionIndex: number) => {
                                    return <div onClick={(event) => selectOnlyOne(event, questionIndex, optionIndex)} className="question_option">
                                        <input type="checkbox" name={option} id={option} className={`question-${uniqueId}-${questionIndex} question_checkbox`} />
                                        <label htmlFor={option} className="question_label">{option}</label>
                                    </div>
                                })
                                }
                            </div>
                        </div>
                        {showMore && <div>
                            <h4 className="question">What internal projects are you currently working on?</h4>
                            <input type="text" className="internal_input" />
                        </div>}
                    </div>
                })
            }
            <div>

            </div>
        </div>
    )
}

export default InternalProject
