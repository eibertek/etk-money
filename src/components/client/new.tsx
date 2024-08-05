import React, { useState } from 'react'
import { Client, CLIENT_TYPES } from '@/types/wallet';
import { storageHook } from '../hooks/Storage';
import crypto from "crypto"
const blankClient = {
    id: '',
    companyName: '',
    name: '',
    lastName: '',
    address: '',
    type: "" as Client["type"],
};
export default function NewClient() {
    const [client, setClient] = useState(blankClient);

    const [message, setMessage] = useState('');

    const  onChange = (field: string, value: string) => {
        setClient({...client, [field]: value});
        setMessage('');
    };

    const ClientDropdown = () => {
        const clientOptions  = CLIENT_TYPES.map((value)=> <option key={`key_client_${value}`} value={value}>{value}</option>);        
        return <select name={'type'} className='text-black' value={client.type}  onChange={({target})=> onChange(target.name, target.value)}>
            <option value={""}>--select a value --</option>        
            {clientOptions}
        </select>;
    }

    const validations = () => {
        if(client.companyName === "" && (client.name + client.lastName) === "") return false;
        return true;
    }
    const saveClient = () => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256',`${client.name}_${client.lastName}_${client.companyName}`);
        if(!validations()) {
            setMessage('There are errors in the form');
            return;
        }        
        try{
            storageHook('client').create({...client, id: hmacId.digest('hex')});        
            setMessage('The client was saved successfully');
            setClient(blankClient);
        }catch(e){
            setMessage(e.message);
        }
    }

    return (
        <div  className='text-white flex flex-col text-left justify-start w-full max-w-lg'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label htmlFor='companyName'>Company:</label>
                <input className="text-black"  name={'companyName'} value={client.companyName} onChange={({target})=> onChange(target.name, target.value)} />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label htmlFor='name'>Name:</label>
                <input className="text-black" name={'name'} value={client.name} onChange={({target})=> onChange(target.name, target.value)} />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label htmlFor='lastName'>Last Name:</label>
                <input className="text-black" name={'lastName'} value={client.lastName} onChange={({target})=> onChange(target.name, target.value)} />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label htmlFor='address'>Address:</label>
                <input className="text-black" name={'address'} value={client.address}  onChange={({target})=> onChange(target.name, target.value)} />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label htmlFor='type'>Type:</label>
                <ClientDropdown />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <button onClick={()=>saveClient()}>Save</button>
            </div>
            {message && <div>{message}</div>}
        </div>
    )
}
