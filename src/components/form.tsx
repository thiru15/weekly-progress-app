import React, { useState } from 'react'
import ClientProject from './client';
import WeeklyProgress from './weeklyProgress';
import * as uuid from 'uuid';
import InternalProject from './internalProject';
import { Report } from '../types/report';

function Form() {
    const report: Array<Report> = [];

    const [clients, setClients] = useState<Array<String>>([uuid.v4()])
    const addClients = async (index: number) => {
        const newClient = [...clients, uuid.v4()];
        setClients(newClient)

    }
    const removeClients = (index: number) => {
        if (index + 1 < clients.length) {
            const newClient = clients.slice(0, index + 1);
            setClients(newClient)

        }
    }

    const containClient = (questionNum: number, option: number) => {
        (questionNum === 1) && (option == 0) ? setClients([uuid.v4()]) : setClients([])
    }

    const constantTags = ["weekStatus",
        "billableWork", "internalProject",]
    const dynamicTags = [
        "anyIssues",
        "followUpIssues",
        "followUpOpportunities",
        "issueDetail",
        "opportunities",
    ]
    let tags: Array<string> = []


    const generateTags = () => {
        tags = [...constantTags]
        clients.forEach((_, index) => {
            dynamicTags.forEach(tag => {

                tags.push(tag + "-" + index);
            });
        })
    }

    const formData: any = {};

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        generateTags();
        event.preventDefault();
        const target = (event.target as any).elements;

        const data = Object.keys((event.target as any).elements).forEach(function (index) {

            if (tags.includes(index)) {
                formData[index] = (event.target as any).elements[index].value
            }

        });

        // console.log("🚀 ~ file: form.tsx ~ line 48 ~ Form ~ formData", formData)

        clients.forEach((_, index) => {
            // console.log(formData["followUp-" + index], index, "followUp-" + index);

            const newReport = new Report();
            // (newReport as object)["weekStatus"]
            newReport.weekStatus = formData["weekStatus"];
            newReport.billableWork = formData["billableWork"];
            newReport.internalProject = formData["internalProject"];
            newReport.issueDetail = formData["issueDetail-" + index];
            newReport.anyIssues = formData["anyIssues-" + index];
            console.log(formData["anyIssues-" + index], index)
            newReport.followUp = formData["followUp-" + index];
            newReport.followUpIssues = formData["followUpIssues-" + index];
            newReport.followUpOpportunities = formData["followUpOpportunities-" + index];
            newReport.opportunities = formData["opportunities-" + index];
            // newReport.=formData[tag];
            // newReport.weekStatus=formData[tag];
            report.push(newReport)
        })
        console.log(report)

    }




    return (
        <form className="conatiner" id="reports" onSubmit={submitForm}>
            <WeeklyProgress containClient={containClient} />
            <br />

            {
                clients.map((num: any, index: any) => {
                    return <ClientProject addClients={addClients} index={index} removeClients={removeClients} />
                })
            }
            <br />
            <br />

            <InternalProject />
            <br />
            <br />
            <button className="submit_button">submit report</button>
        </form>
    )
}

export default Form;
