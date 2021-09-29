import React, { useEffect, useState } from 'react'
import * as uuid from 'uuid';
import { Question } from './questions';


function WeeklyProgress() {
    const initialState: Array<Question> = [
        {
            id: uuid.v4(),
            question: "How has you week been going at Presidio?",
            options: ["great", "well", "okay", "not well", "terrible"],
            containOthers: false,
            showOthers: false,
        },
        {
            id: uuid.v4(),

            question: "Are you currently booked at a billable client engagement?",
            options: ["yes", "no", "other"],
            containOthers: true,
            showOthers: false,
        }
    ]
    const [questions, setQuestions] = useState(initialState);
    const [showMore, setShowMore] = useState(false)

    const selectOnlyOne = (event: any, index: number, optionIndex: number) => {
        // event.preventDefault();
        (index >= 0 && questions[index]?.options[optionIndex] === "other") ? setShowMore(true) : setShowMore(false)
        // }
        // else if (questions[index]?.containOthers) {
        //     const newState = questions;
        //     newState[index].showOthers = false;
        //     setQuestions(newState)
        //     console.log("🚀 ~ file: weeklyProgress.tsx ~ line 38 ~ selectOnlyOne ~ newState", newState[1])
        // }


        document.querySelectorAll(`.question-${index}`).forEach((checkbox: any, index) => {
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
            <h1 className="question_header">weekly progerss at presidio</h1>
            <hr className="solid" />
            {
                questions.map((question, questionIndex) => {
                    return <div>
                        <h4 className="question">{question.question}</h4>
                        <div className="question_options">
                            {question.options.map((option, optionIndex: number) => {
                                return <div onClick={(event) => selectOnlyOne(event, questionIndex, optionIndex)} className="question_option">
                                    <input type="checkbox" name={option} id={option} className={`question-${questionIndex} question_checkbox`} />
                                    <label htmlFor={option} className="question_label">{option}</label>
                                </div>
                            })
                            }
                            {

                                showMore && questionIndex == 1 && <div className="other">
                                    <h1 className="question other_title">others:</h1>
                                    <input type="text" className="other_input" />
                                </div>


                            }
                        </div>
                        <br />

                    </div>
                })
            }
            <div>

            </div>
        </div>
    )
}

export default WeeklyProgress
