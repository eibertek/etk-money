import React, { useState } from 'react'
import { Client, CLIENT_TYPES } from '@/types/wallet';
import crypto from "crypto";
import { storageHook } from '@/components/hooks/Storage';
import Dropdown from '@/components/shared/select';
import Input from '@/components/shared/input';
import Button from '@/components/shared/button';

const blankClient = {
    id: '',
    companyName: '',
    name: '',
    lastName: '',
    address: '',
    type: "" as Client["type"],
};
export default function NewClient({ isShortForm=false, setModalOpen }) {
    const [client, setClient] = useState(blankClient);

    const [message, setMessage] = useState('');

    const  onChange = (field: string, value: string) => {
        setClient({...client, [field]: value});
        setMessage('');
    };

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
            setModalOpen(false);
        }catch(e){
            if(e instanceof Error) {
                setMessage(e.message);
            }
        }
    }

    const longForm = () => (
        <div className='text-white flex flex-col justify-start'>
            <Input field={'companyName'} value={client.companyName as unknown as string} onChange={onChange} />
            <Input field={'name'} value={client.name as unknown as string} onChange={onChange} />
            <Input field={'lastName'} value={client.lastName as unknown as string} onChange={onChange} />
            <Input field={'address'} value={client.address as unknown as string} onChange={onChange} />
            <Dropdown field='type' value={client.type} onChange={onChange} options={CLIENT_TYPES.map((value)=>value) as unknown as any} optionLabel={(item)=>item}/>            

            <Button onClick={()=>saveClient()}>Save</Button>
        </div>        
    );

    const shortForm = () => (
        <div className='text-white flex flex-col justify-start'>
            <Input field={'companyName'} value={client.companyName as unknown as string} onChange={onChange} />
            <Dropdown field='type' value={client.type} onChange={onChange} options={CLIENT_TYPES.map((value)=>value) as unknown as any} optionLabel={(item)=>item} />            
            <Button onClick={()=>saveClient()}>Save</Button>
        </div>    
    );

    return (<>
    {isShortForm ? shortForm() : longForm()}
    {message && <div>{message}</div>}
    </>)
}
