import React, { FC, useEffect, useState } from 'react'
import * as uuid from 'uuid';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

import QuestionsWithInfo from './questionsWithInfo';
import { Question } from './questions';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
// Make a request for a user with a given ID

interface clients {
    addClients: any;
    removeClients: any;
    index: number;
}
function ClientProject(props: clients) {
    const { addClients, index, removeClients } = props;
    const options :any = [];
    useEffect(() => {
        console.log(index);
        console.log("Inside UseEffect");
        const projectAPI = async () =>{
        await axios.get('https://sls-eus-dev-weekly-progress-api.azurewebsites.net/api/getProjects?code=bu/jqW4Q7ap2upXGVunAZjmp5XDyMFavxMOtWFnqia3a7IjX/emVZw==')
        .then(function (response) {
            const projects = response.data;
            for(let project of projects){
                options.push(project.Project)
            }
        })
        .catch(function (error) {
           
            console.log("Failed ",error);
        })}
      projectAPI();  

         
    }, [props.index])
    const uniqueId = uuid.v4();
    const initialState: Array<Question> = [
        {
            id: uuid.v4(),
            question: "What issue(s) are you experiencing on your current project or client engagement?",
            options: ["None", "I have too much work and my deliverables at risk.", "I do not have enough information to do my job.", "I do not have the rright skills for my current engagement.", "I don not have enough experiance for muy current engagement."],
            containOthers: false,
            showOthers: false,
            questionTag: "anyIssues"
        }
    ]
    const secondSetofQuestion: Array<Question> = [
        {
            id: uuid.v4(),
            question: "Have you reported an opportunity or issue that you still did not get assistance on?",
            options: ["yes", "no"],
            containOthers: false,
            showOthers: false,
            questionTag: "followUp"
        },
        {
            id: uuid.v4(),
            question: "Are you working at more than one billable client engagement?",
            options: ["yes", "no"],
            containOthers: false,
            showOthers: false,
            questionTag: "moreBillbleProject"

        },
    ]
    const optionalQuestions: Array<Question> = [
        {
            id: uuid.v4(),

            question: "Explain in more detail about the issues you are experiencing at your client engagement.",
            options: [],
            containOthers: false,
            showOthers: false,
            questionTag: "issueDetail"
        },
        {
            id: uuid.v4(),
            question: "Can you identify any new opportunities at your current client engagement?",
            options: [],
            containOthers: false,
            showOthers: false,
            questionTag: "opportunities"
        },
    ]



    const [questions, setQuestions] = useState(initialState);
    const [selected, setSelected] = useState([]);

    const selectOnlyOne = (event: any, questionIndex: number, optionIndex: number, className: string, data: Question[]) => {
        event.preventDefault();
        // (document.querySelector('.' + className) as HTMLInputElement).value = data[index].options[optionIndex];
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
            <link rel="stylesheet" href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css"/>


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
                            <Typeahead
                            id="basic-example"
                            onChange={setSelected}
                            options={options}
                            placeholder="Choose a state..."
                            selected={selected}
                            size='large'
                            />  
                            <br/>
                            </div>
                        </div>
                        <br /> 
                        <h4 className="question">{question.question}</h4>
                        <div className="question_grid_options">

                            {question.options.map((option) => {
                                return <div className="question_grid_option">
                                    <input type="checkbox" name={option} id={option + uniqueId} className={`question-${questionIndex}-${uniqueId} `} />

                                    <label htmlFor={option + uniqueId} className="question_grid_label">{option}</label>
                                </div>
                            })
                            }
                        </div>
                        <br />
                    </div>
                })
            }
            <br />
            {
                Array.from(Array(2).keys()).map((num: any, questionIndex) => {
                    return <div>

                        <div className="optional_question">
                            <div className="optional_flex">
                                <h1 className="optional_header">Optional:</h1>
                                <h1 className="optional_question">{optionalQuestions[questionIndex].question}</h1>
                            </div>
                            <textarea  className="optional_input" name={optionalQuestions[questionIndex].questionTag + "-" + index} />
                        </div>
                        <br />

                        <QuestionsWithInfo question={secondSetofQuestion[0]} index={questionIndex} clientIndex={index} />
                        <br />
                        <br />

                    </div>
                })
            }

            <br />
            <div>
                <h4 className="question">{secondSetofQuestion[1].question}</h4>
                <br />
                <div className="question_options">
                    {secondSetofQuestion[1].options.map((option, optionIndex: number) => {
                        return <div onClick={(event) => selectOnlyOne(event, 1, optionIndex, `question-client-${1}-${uniqueId}`, secondSetofQuestion)} className="question_rounded_option">
                            <input type="checkbox" name={option} id={option} className={`question-client-${1}-${uniqueId} question_checkbox checkbox__input`} />
                            <span className="checkbox__inner"></span>
                            <label htmlFor={option + uniqueId} className="question_rounded_label">{option}</label>
                        </div>
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default ClientProject
