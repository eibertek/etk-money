import React, { useContext, useEffect, useState } from 'react'
import { Client, Move } from '@/types/wallet';
import { storageHook } from '../hooks/Storage';
import { Button } from '@chakra-ui/react';
import { ModalContext } from '../shared/dialog/modalContext';
import { isWithinInterval, format } from "date-fns";

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

const isInsideRange = (value:number, from: number=0, to: number=999999999) => {
    const matchFrom = from ? value >= from : true;
    const matchTo = to ? value <= to : true;
    return matchFrom && matchTo;
};

const isInsideRangeDate = (value:Date, from: Date = new Date("01/01/1001"), to: Date = new Date("01/01/2999")) => {
    return isWithinInterval(value, {start: from, end: to});
};

const filterMoves = (moves: Move[], filters:{[name:string]:any}) => {
    return moves.filter((item: Move)=>{
        if(!!filters){
            const matchCurrency = filters.currency ? item.currency === filters.currency : true; 
            const matchClient = filters.client ? item.client === filters.client : true;
            const matchType = filters.type ? item.type === filters.type : true;
            const matchAmount = item.amount && isInsideRange(item.amount, parseFloat(filters.amount_from), parseFloat(filters.amount_to));
            const matchDate = item.date && isInsideRangeDate(item.date, filters.date_from, filters.date_to);
            return (matchCurrency && matchClient && matchType && matchAmount && matchDate);     
        } 
        return true;
    });
}

export default function ManageMoves({ setModalOpen = (value:boolean) => {}, filters={}}) {
    const [moves, setMoves] = useState([]);
    const [clients, setClients] = useState([]);
    const filteredMoves = filterMoves(moves, filters);
    const modal = useContext(ModalContext);
    const colorLine: {[name:string]: string } = {
        'O': 'bg-red-400',
        'I': 'bg-green-400'
    }
    useEffect(() => {
        const clients = storageHook('client').getAll();
        setClients(clients);
        setMoves(storageHook('move').getAll());
    }, [modal]);

    const [message, setMessage] = useState('');

    const removeMove = (move: Move) => {
        const dialogBox = confirm("You are deleting the move, is Ok?");
        if(dialogBox){
            storageHook('move').remove(move);
            setMoves(storageHook('move').getAll());
            setMessage('Move removed');
        }
    };

    return (
        <div className='text-white flex flex-col text-left w-full'>
            <div className='grid grid-cols-1 w-full'>
                <div>{message}</div>
                <Button type="button" width="100px" my={4} onClick={() => setModalOpen(true)}>Filters</Button>
                <div className='grid grid-cols-7 mb-4 font-bold'>
                    <div>Date</div>
                    <div className='w-[10rem]'>Client</div>
                    <div>Currency</div>
                    <div>type</div>
                    <div>amount</div>
                    <div>Description</div>
                </div>
                {filteredMoves.map((move: Move) => {
                    const client: Client = clients.find((client: Client)=> client.id === move.client as unknown as string) as unknown as Client;
                    if(!client) return;
                    const clientName = client.name + ' ' + client.lastName;
                    return (
                        <div key={`key_move_${move.id}`} className={`grid grid-cols-7 py-2 ${move.type && colorLine[move.type]}`}>
                            <div>{format(move.date, "dd/MM/yyyy")}</div>
                            <div className='w-[15rem]'>{clientName}</div>
                            <div className='w-[10rem]'>{move.currency as unknown as string}</div>
                            <div>{move.type === 'I' ? 'Income' : 'Outcome'}</div>
                            <div>{move.amount}</div>
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
