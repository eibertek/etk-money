import React, { useEffect, useState } from 'react'
import { Client, CLIENT_TYPES, Move } from '@/types/wallet';
import { storageHook } from '../hooks/Storage';

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

export default function ManageClient() {
    const [moves, setMoves] = useState([]);
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
        setMoves(storageHook('move').getAll());
    }, []);

    const [message, setMessage] = useState('');

    const removeMove = (move: Move) => {
        const dialogBox = confirm("You are deleting the move, is Ok?");
        if(dialogBox){
            storageHook('move').remove(move);
            setMoves(storageHook('move').getAll());
        }
    };

    return (
        <div className='text-white flex flex-col text-left w-full'>
            <div className='grid grid-cols-1 w-full'>
                <div className='grid grid-cols-6 mb-4 font-bold'>
                    <div className='w-[10rem]'>Client</div>
                    <div>Currency</div>
                    <div>Income</div>
                    <div>Outcome</div>
                    <div>Description</div>
                </div>
                {moves.map((move: Move) => {
                    const client: Client = clients.find((client: Client)=> client.id === move.client as unknown as string) as unknown as Client;
                    const clientName = client.companyName || client.name + ' ' + client.lastName;
                    return (
                        <div key={`key_move_${move.id}`} className='grid grid-cols-6'>
                            <div className='w-[15rem]'>{clientName}</div>
                            <div className='w-[10rem]'>{move.currency as unknown as string}</div>
                            <div>{move.income}</div>
                            <div>{move.outcome}</div>
                            <div>{move.description}</div>
                            <div>
                                <button className={btnClassName} onClick={()=>removeMove(move)}>Remove</button>
                            </div>                            
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
