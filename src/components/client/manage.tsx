import React, { useEffect, useState } from 'react'
import { Client } from '@/types/wallet';
import { storageHook } from '../hooks/Storage';

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

export default function ManageClient() {
    const [clients, setClients] = useState([]);

    useEffect(()=>{
        setClients(storageHook('client').getAll());
    }, []);

    return (
        <div className='text-white flex flex-col text-left w-full'>
            <div className='grid grid-cols-1 w-full'>
                <div className='grid grid-cols-3'>
                    <div className='w-[10rem]'>Company</div>
                    <div>Name</div>
                    <div>Actions</div>
                </div>
                {clients.map((client: Client) => {
                    return (
                        <div key="" className='grid grid-cols-3'>
                            <div className='w-[22rem]'>{client.name} {client.lastName}</div>
                            <div className='flex'>
                                <button className={btnClassName}>Modify</button>
                                <button className={btnClassName}>Remove</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
