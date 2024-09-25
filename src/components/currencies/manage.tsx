import React, { useEffect, useState } from 'react'
import { Client, Currency, Move } from '@/types/wallet';
import { storageHook } from '../hooks/Storage';

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
const ENTITY_NAME = 'currencies';

export default function ManageCurrencies() {
    const [currencies, setCurrencies] = useState([]);
    const [ newValues, setNewValues] = useState<{[index:number]: number}>({});
    useEffect(() => {
        setCurrencies(storageHook(ENTITY_NAME).getAll());
    }, []);

    const [message, setMessage] = useState('');

    const removeCurrency = (currency: Currency) => {
        const dialogBox = confirm("You are deleting the move, is Ok?");
        if(dialogBox){
            storageHook(ENTITY_NAME).remove(currency);
            setCurrencies(storageHook('currency').getAll());
            setMessage('Currency removed');
        }
    };

    const updateCurrency = (currency: Currency, newValue: number) => {
            currency.value = newValue;
            currency.lastUpdate = new Date();
            storageHook(ENTITY_NAME).update(currency);
            setCurrencies(storageHook('currency').getAll());
            setMessage('Currency updated');
    };

    return (
        <div className='text-white flex flex-col text-left w-full'>
            <div className='grid grid-cols-1 w-full'>
                <div>{message}</div>
                <div className='grid grid-cols-6 mb-4 font-bold'>
                    <div className='w-[10rem]'>Name</div>
                    <div>Code</div>
                    <div>value</div>
                    <div>from</div>
                    <div>last Updated</div>
                </div>
                {currencies.map((currency: Currency, index: number) => {
                    return (
                        <div key={`key_move_${currency.id}`} className='grid grid-cols-7'>
                            <div className='w-[15rem]'>{currency.name}</div>
                            <div>{currency.id}</div>
                            <div>{currency.value}</div>
                            <div>{currency.value_from}</div>
                            <div>{new Date(currency.lastUpdate).toDateString()}</div>
                            <div>
                                <input className="text-black" value={newValues[index]} onChange={(evt) => setNewValues({...newValues, [index]:parseInt(evt.target.value || "0")})}/>
                                <button className={btnClassName} onClick={()=>updateCurrency(currency, newValues[index])}>Update</button>
                                <button className={btnClassName} onClick={()=>removeCurrency(currency)}>Remove</button>
                            </div>                            
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
