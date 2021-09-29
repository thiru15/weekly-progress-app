import React, { FormEvent, useState } from 'react'
import * as uuid from 'uuid';
import { Question } from './questions';

interface prop {
    question: Question,
    index: number
    clientIndex: number
}
function QuestionsWithInfo(props: prop) {

    const questionKey = ["followUpIssues", "followUpOpportunities"]
    const { question, index, clientIndex } = props;
    const uniqueId = uuid.v4();


    const [showMore, setShowMore] = useState(false)

    const selectOnlyOne = (event: any, index: number, optionIndex: number) => {
        // event.preventDefault()
        (document.querySelector(`.input-${uniqueId}`) as HTMLInputElement).value = question.options[optionIndex];
        optionIndex == 0 ? setShowMore(true) : setShowMore(false);
        document.querySelectorAll(`.question-info-${index}-${uniqueId}`).forEach((checkbox: any, index) => {

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

    const addValue = (event: FormEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        (document.querySelector(`.input-${uniqueId}`) as HTMLInputElement).value = (event.target as any).value;
    }

    return (
        <div >
            <h4 className="question">{question.question}</h4>
            <div className="question_options">
                <input type="text" required className={`input-${uniqueId} hidden questionKey`} name={`${questionKey[index]}-${clientIndex}`} />
                {question.options.map((option, optionIndex: number) => {
                    return <div onClick={(event) => selectOnlyOne(event, index + 2, optionIndex)} className="question_rounded_option ">
                        <input type="checkbox" name={option} id={option} className={`question-info-${index + 2}-${uniqueId} question_checkbox`} />
                        <label htmlFor={option + uniqueId} className="question_rounded_label">{option}</label>
                    </div>
                })
                }
                {showMore && <div className="info">
                    <h1 className="question">Please provide more information: </h1>
                    <textarea className="optional_input" onInput={(event) => addValue(event)} />
                </div>}
            </div>
        </div>
    )
}

export default QuestionsWithInfo
