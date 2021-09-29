import React, { useState } from 'react'
import * as uuid from 'uuid';
import { Question } from './questions';

interface prop {
    question: Question,
    index: number
}
function QuestionsWithInfo(props: prop) {
    const { question, index } = props;
    const uniqueId = uuid.v4();


    const [showMore, setShowMore] = useState(false)

    const selectOnlyOne = (event: any, index: number, optionIndex: number) => {
        event.preventDefault()
        optionIndex == 0 ? setShowMore(true) : setShowMore(false);
        document.querySelectorAll(`.question-client-${index}-${uniqueId}`).forEach((checkbox: any, index) => {

            console.log("pressed others", checkbox);

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
        <div >
            <h4 className="question">{question.question}</h4>
            <div className="question_options">
                {question.options.map((option, optionIndex: number) => {
                    return <div onClick={(event) => selectOnlyOne(event, index + 2, optionIndex)} className="question_rounded_option ">
                        <input type="checkbox" name={option} id={option} className={`question-client-${index + 2}-${uniqueId} question_checkbox`} />
                        <label htmlFor={option + uniqueId} className="question_rounded_label">{option}</label>
                    </div>
                })
                }
                {showMore && <div className="info">
                    <h1 className="question">Please provide more information: </h1>
                    <input type="text" className="optional_input" />
                </div>}
            </div>
        </div>
    )
}

export default QuestionsWithInfo
