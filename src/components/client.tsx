import React, { FC, useEffect, useState } from 'react'
import * as uuid from 'uuid';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import QuestionsWithInfo from './questionsWithInfo';
import { Question } from './questions';

interface clients {
    addClients: any;
    removeClients: any;
    index: number;
}
function ClientProject(props: clients) {
    const { addClients, index, removeClients } = props;
    const options = [
        'one', 'two', 'three'
    ];
    useEffect(() => {
        console.log(index);
    }, [props.index])
    const uniqueId = uuid.v4();
    console.log(index)
    const initialState: Array<Question> = [
        {
            id: uuid.v4(),
            question: "What issue(s) are you experiencing on your current project or client engagement?",
            options: ["None", "I have too much work and my deliverables at risk.", "I do not have enough information to do my job.", "I do not have the rright skills for my current engagement.", "I don not have enough experiance for muy current engagement."],
            containOthers: false,
            showOthers: false,
        }
    ]
    const secondSetofQuestion: Array<Question> = [
        {
            id: uuid.v4(),

            question: "Have you reported an opportunity or issue that you still did not get assistance on?",
            options: ["yes", "no"],
            containOthers: false,
            showOthers: false,
        },
        {
            id: uuid.v4(),

            question: "Are you working at more than one billable client engagement?",
            options: ["yes", "no"],
            containOthers: false,
            showOthers: false,
        },
    ]
    const optionalQuestions: Array<Question> = [
        {
            id: uuid.v4(),

            question: "Explain in more detail about the issues you are experiencing at your client engagement.",
            options: [],
            containOthers: false,
            showOthers: false,
        },
        {
            id: uuid.v4(),
            question: "Can you identify any new opportunities at your current client engagement?",
            options: [],
            containOthers: false,
            showOthers: false,
        },
    ]



    const [questions, setQuestions] = useState(initialState);

    const selectOnlyOne = (event: any, questionIndex: number, optionIndex: number) => {
        event.preventDefault();
        if (questionIndex == 1 && optionIndex == 0) {
            addClients(index)
        }
        if (questionIndex == 1 && optionIndex == 1) {
            removeClients(index)
        }
        document.querySelectorAll(`.question-client-${questionIndex}-${uniqueId}`).forEach((checkbox: any, index) => {
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
            <h1 className="question_header">client engagement {index != 0 && index + 1}</h1>
            <hr className="solid" />

            <h3 className="question_subtitle">This feedback in this section will be shared with your Personnel Manager and Project Manager and may also be shared with the Cloud Adoption Manager and Account Manager.</h3>
            <br />

            {
                questions.map((question, questionIndex) => {
                    return <div>
                        <div>
                            <h1 className="question">
                                Client Project
                            </h1>
                            <div>
                                <Dropdown options={options} value={options[0]} placeholder="Select your project" className="myClassName" />
                            </div>
                        </div>
                        <h4 className="question">{question.question}</h4>
                        <div className="question_grid_options">
                            {question.options.map((option) => {
                                return <div className="question_grid_option">
                                    <input type="checkbox" name={option} id={option + uniqueId} className={`question-${questionIndex}-${uniqueId}`} />
                                    <label htmlFor={option + uniqueId} className="question_grid_label">{option}</label>
                                </div>
                            })
                            }
                        </div>
                    </div>
                })
            }
            <br />
            {
                Array.from(Array(2).keys()).map((num: any, index) => {
                    return <div>
                        <div className="optional_question">
                            <div className="optional_flex">
                                <h1 className="optional_header">Optional:</h1>
                                <h1 className="optional_question">{optionalQuestions[index].question}</h1>
                            </div>
                            <input type="text" className="optional_input" />
                        </div>
                        <br />

                        <QuestionsWithInfo question={secondSetofQuestion[0]} index={index} />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                })
            }

            <br />
            <div>
                <h4 className="question">{secondSetofQuestion[1].question}</h4>
                <div className="question_options">
                    {secondSetofQuestion[1].options.map((option, optionIndex: number) => {
                        return <div onClick={(event) => selectOnlyOne(event, 1, optionIndex)} className="question_rounded_option">
                            <input type="checkbox" name={option} id={option} className={`question-client-${1}-${uniqueId} question_checkbox`} />
                            <label htmlFor={option + uniqueId} className="question_rounded_label">{option}</label>
                        </div>
                    })
                    }
                </div>
            </div>
            {/* {
                optionalQuestions.map(question => {
                    return <div className="optional_question">
                        <div className="optional_flex">
                            <h1 className="optional_header">Optional:</h1>
                            <h1 className="optional_question">{question.question}</h1>
                        </div>
                        <input type="text" className="optional_input" />
                    </div>
                })
            }
            {
                secondSetofQuestion.map((question, questionIndex) => {
                    return <div>
                        <h4 className="question">{question.question}</h4>
                        <div className="question_options">
                            {question.options.map((option, optionIndex: number) => {
                                return <div onClick={(event) => selectOnlyOne(event, questionIndex, optionIndex)} className="question_rounded_option">
                                    <input type="checkbox" name={option} id={option} className={`question-client-${questionIndex}-${uniqueId} question_checkbox`} />
                                    <label htmlFor={option + uniqueId} className="question_rounded_label">{option}</label>
                                </div>
                            })
                            }
                        </div>
                    </div>
                })
            } */}

        </div>
    )
}

export default ClientProject