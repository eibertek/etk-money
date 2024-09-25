'use client';
import { useState } from "react";
import { storageHook } from "../hooks/Storage";
import storageFixtures from "./fixtures";

const btnClassName="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";

export const Demo = () => {
    const [message, setMessage] = useState('');
    const buildCurrencies = () => {
        storageHook('currencies').clearAll();
        storageFixtures.currencies?.map(entity => {
            storageHook('currencies').create(entity);    
        })
        setMessage('All currencies Generated');
    };

    const buildClients = () => {
        storageHook('client').clearAll();
        storageFixtures.clients?.map(entity => {
            storageHook('client').create(entity);    
        })
        setMessage('All Clients Generated');
    };

    const buildMoves = () => {
        storageHook('move').clearAll();
        storageFixtures.moves?.map(entity => {
            storageHook('move').create(entity);    
        })
        setMessage('All Moves Generated');
    };

    return (
        <div className="text-center flex-1 flex flex-col items-center m-6 md:m-12">
            <div>This is the Demo button, you can create the needful data to start seeing charts and use have a quick pick of all the app</div>
            <div>
                <div><button className={btnClassName} onClick={()=>buildCurrencies()}>Create Currencies</button></div>
                <div><button className={btnClassName} onClick={()=>buildClients()}>Create Clients</button></div>
                <div><button className={btnClassName} onClick={()=>buildMoves()}>Create Moves</button></div>
            </div>
            <div>{message}</div>
        </div>
    );
}

export default Demo;