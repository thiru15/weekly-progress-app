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
            questionTag: "weekStatus"
        },
        {
            id: uuid.v4(),

            question: "Are you currently booked at a billable client engagement?",
            options: ["yes", "no", "other"],
            containOthers: true,
            showOthers: false,
            questionTag: "billableWork"
        }
    ]
    const [questions, setQuestions] = useState(initialState);
    const [showMore, setShowMore] = useState(false)

    const selectOnlyOne = (event: any, index: number, optionIndex: number) => {
        (document.querySelector(`.input-${questions[index].id}`) as HTMLInputElement).value = questions[index].options[optionIndex];
        (index >= 0 && questions[index]?.options[optionIndex] === "other") ? setShowMore(true) : setShowMore(false)
        document.querySelectorAll(`.question-weekly-${index}`).forEach((checkbox: any, index) => {
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
                        <input type="text" required className={`input-${question.id} hidden questionKey`} name={`${question.questionTag}`} />
                        <h4 className="question">{question.question}</h4>
                        <br />
                        <div className="question_options">
                            {question.options.map((option, optionIndex: number) => {
                                return <div onClick={(event) => selectOnlyOne(event, questionIndex, optionIndex)} className="question_option">
                                    <input type="checkbox" className={`question-weekly-${questionIndex} question_checkbox `} id={option + question.id} />
                                    <label htmlFor={option + question.id} className="question_label">{option}</label>
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
