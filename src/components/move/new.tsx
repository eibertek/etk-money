import React, { useEffect, useState } from 'react'
import { Client, Currency, Move } from '@/types/wallet';
import { storageHook } from '../hooks/Storage';
import crypto from "crypto"

type MoveSimplified = Omit<Move, 'date' | 'client' | 'currency'>;

interface MoveProps extends MoveSimplified {
    client: Client['id'];
    currency: Currency['id'];
    date: Move['date'];
}

const BLANK_MOVE: MoveProps = {
    id: "",
    client: '' as unknown as Client['id'],
    currency: '' as unknown as Currency['id'],
    date: new Date(),
    description: '',
    income: 0,
    outcome: 0,
};
const ENTITY_NAME = 'move';

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";


export default function NewMove() {
    const [move, setMove] = useState(BLANK_MOVE);
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, []);
    const [message, setMessage] = useState('');

    const onChange = (field: string, value: string | number) => {
        setMove({...move, [field]: value});
        setMessage('');
    };

    const validations = () => {
        if(move.client === "") return false;
        if(move.currency === "") return false;
        if(move.income === 0 &&  move.outcome === 0) return false;
        if(move.income && move.income > 0 && move.outcome &&  move.outcome > 0) return false;
        return true;
    }

    const saveMove = () => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256',`${move.client}_${move.currency}_${move.date}_${move.income}_${move.outcome}`);
        if(!validations()) {
            setMessage('There are errors in the form');
            return;
        }        
        try{
            storageHook(ENTITY_NAME).create({...move, id: hmacId.digest('hex')});        
            setMessage('The Move was saved successfully');
            setMove(BLANK_MOVE);
        }catch(error){
            if(error instanceof Error) {
                setMessage(error.message);
            }
        }
    }

    const ClientsDropdown = () => {
        const clientOptions = clients.map((value: Client) => <option key={`key_client_${value.id}`} value={value.id}>{value.companyName || value.name}</option>);
        return <select name={'client'} className='text-black' value={move.client} onChange={({ target }) => onChange(target.name, target.value)}>
            <option value={""}>--select a value --</option>
            {clientOptions}
        </select>;
    }

    const CurrenciesDropdown = () => {
        const currenciesOptions = currencies.map((value: Currency) => <option key={`key_currency_${value.id}`} value={value.id}>{value.id}</option>);
        return <select name={'currency'} className='text-black' value={move.currency} onChange={({ target }) => onChange(target.name, target.value)}>
            <option value={""}>--select a value --</option>
            {currenciesOptions}
        </select>;
    }

    return (
        <div className='text-white flex flex-col text-left justify-start w-full max-w-lg'>
            {Object.keys(BLANK_MOVE).map((field) => {
                switch (field) {
                    case 'client':
                        return <div className='w-full flex justify-between px-3 mb-6'>
                            <label htmlFor='type'>{field}</label>
                            <ClientsDropdown />
                        </div>
                    case 'currency':
                        return <div className='w-full flex justify-between px-3 mb-6'>
                            <label className="mr-4" htmlFor='type'>{field}</label>
                            <CurrenciesDropdown />
                        </div>                        
                    case 'date':
                        return (<div className='w-full flex justify-between px-3 mb-6'>
                            <label className="mr-4" htmlFor={field}>{field}</label>
                            <input type='date' className="text-black px-3" name={field} value={move[field] as unknown as string} onChange={({ target }) => onChange(target.name, target.value)} />
                        </div>)
                    case 'description':
                        return (<div className='w-full flex justify-between px-3 mb-6'>
                            <label className="mr-4" htmlFor={field}>{field}</label>
                            <input className="text-black px-3" name={field} value={move[field] as unknown as string} onChange={({ target }) => onChange(target.name, target.value)} />
                        </div>)                        
                    case 'income':
                    case 'outcome':
                        return (<div className='w-full flex justify-between px-3 mb-6'>
                            <label className="mr-4" htmlFor={field}>{field}</label>
                            <input type="number" className="text-black px-3" name={field} value={move[field as keyof MoveSimplified]} onChange={({ target }) => onChange(target.name, Number.parseFloat(target.value))} />
                        </div>)
                    default:
                        return (<div className='w-full flex justify-between px-3 mb-6'>
                            <label className="mx-4" htmlFor={field}>{field}</label>
                            <input className="text-black px-3" name={field} value={move[field as keyof MoveSimplified]} onChange={({ target }) => onChange(target.name, target.value)} />
                        </div>)
                }
            })}

            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <button className={`${btnClassName} flex justify-between my-5`} onClick={()=>saveMove()}>Save</button>
            </div>
            {message && <div>{message}</div>}
        </div>
    )
}
