"use client";
import Demo from "@/components/demo";
import Chart from "@/components/charts";
import Link from 'next/link'
import { storageHook } from "@/components/hooks/Storage";
import storageFixtures from "@/components/demo/fixtures";
import { useEffect, useState } from "react";

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";
const btnRed = "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

export default function MoneyPage(props: any) {
    const isSavings: boolean = process.env.FEATURE_SAVINGS === 'true' || false;
    const isDemo: boolean = process.env.DEMO === 'true' || false;
    const [currencies, setCurrencies ] = useState([]);
    
    useEffect(()=>{
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
    }, []);

    const buildCurrencies = () => {
        storageHook('currencies').clearAll();
        storageFixtures.currencies?.map(entity => {
            storageHook('currencies').create(entity);    
        });
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
    };

    return (
        <main className="flex min-h-screen flex-col p-24">
            {!currencies.length && <div className="bg-red-400 border w-[50%] self-center border-red-900 text-black px-4">No Currencies defined Please <button className={btnRed} onClick={()=>buildCurrencies()}>Rebuild currencies</button></div>}
            <section className="w-full text-center">
                <h2 className="text-5xl py-5 text-center">Control Panel</h2>
                <div className="flex flex-row justify-around">
                    <div className="flex-col flex border p-5 border-spacing-4 border-blue-300">
                        <h3 className="text-4xl pb-4">Client</h3>
                        <div><Link className={btnClassName} href={"/money/client"}>New</Link></div>
                        <div><Link className={btnClassName} href={"/money/client"}>Manage</Link></div>
                    </div>
                    {isSavings && <div className="flex-col flex p-5 border border-spacing-4 border-blue-300">
                        <h3 className="text-4xl pb-4">Savings</h3>
                        <div><button className={btnClassName}>New</button></div>
                        <div><button className={btnClassName}>Manage</button></div>
                    </div>}
                    <div className="flex-col flex p-5 border border-spacing-4 border-blue-300">
                        <h3 className="text-4xl pb-4">Money</h3>
                        <div><Link className={btnClassName} href={"/money/moves"}>New</Link></div>
                        <div><Link className={btnClassName} href={"/money/moves"}>Manage</Link></div>
                    </div>
                </div>
            </section>
            <section className="w-full text-center">
                {<Chart />}
            </section>
            <section className="w-full text-center">
                {isDemo && <Demo />}
            </section>
        </main>
    );
}

