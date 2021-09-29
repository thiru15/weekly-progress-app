import React, { useEffect, useState } from 'react'
import ClientProject from './client';
import WeeklyProgress from './weeklyProgress';
import * as uuid from 'uuid';
import InternalProject from './internalProject';

function Form() {
    const [clients, setClients] = useState<Array<String>>([uuid.v4()])
    const addClients = async (index: number) => {
        const newClient = [...clients, uuid.v4()];
        setClients(newClient)

        // console.log(clients)
    }
    const removeClients = (index: number) => {
        if (index + 1 < clients.length) {
            const newClient = clients.slice(0, index + 1);
            setClients(newClient)

        }
    }
    // useEffect(() => {

    // }, [clients])
    return (
        <div className="conatiner">
            <WeeklyProgress />
            <br />

            {
                clients.map((num: any, index: any) => {
                    return <ClientProject addClients={addClients} index={index} removeClients={removeClients} />
                })
            }
            <br />

            <InternalProject />
            <br />
            <button className="submit_button">submit</button>
        </div>
    )
}

export default Form;
