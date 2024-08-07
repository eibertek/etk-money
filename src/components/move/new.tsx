import React, { useEffect, useState } from 'react'
import { Client, CLIENT_TYPES, Currency, Move } from '@/types/wallet';
import crypto from "crypto";
import { storageHook } from '@/components/hooks/Storage';
import Dropdown from '@/components/shared/select';
import Input from '@/components/shared/input';
import Button from '@/components/shared/button';
import NewClient from '../client/new';

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

export default function NewMove() {
    const [move, setMove] = useState(BLANK_MOVE);
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [isClientOpen, setClientOpen] = useState(false);
    const [client, setClient] = useState({
        companyName: '',
        type: '',
    });

    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, []);
    const [message, setMessage] = useState('');

    const onChangeClient = (field: string, value: string | number) => {
        setClient({...client, [field]: value});
        setMessage('');
    };

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

    const saveClient = () => {
        const hmacId = crypto.createHmac('sha256',`${client.companyName}`);
        storageHook('client').create({...client, id: hmacId.digest('hex')});        
        setMessage('The client was saved successfully');
        const clients = storageHook('client').getAll();
        setClients(clients);
    }

    const shortForm = () => (
        <div className='text-white absolute right-[10%] top-[20%] justify-start w-[400px]'>
            <Input field={'companyName'} value={client.companyName as unknown as string} onChange={onChangeClient} />
            <Dropdown field='type' value={client.type} onChange={onChangeClient} options={CLIENT_TYPES.map((value)=>value) as unknown as any} optionLabel={(item)=>item} />            
            <Button onClick={()=>saveClient()}>Save</Button>
        </div>    
    );
    
    return (
        <div className='text-white flex flex-col justify-start'>
            {Object.keys(BLANK_MOVE).map((field) => {
                switch (field) {
                    case 'id':
                        return;
                    case 'client':
                        return (<div className='flex flex-row'>
                        <Dropdown 
                            field='client'
                            value={move.client} 
                            onChange={onChange} 
                            options={clients} 
                            optionLabel={(client: Client)=> client.companyName ? client.companyName : `${client.name} ${client.lastName}` } />
                        <Button onClick={()=>setClientOpen(!isClientOpen)}>{'New Client'}</Button>                        
                        </div>);
                    case 'currency':
                        return <Dropdown field='currency' value={move.currency} onChange={onChange} options={currencies} optionLabel={(moveItem)=>moveItem.id} />;
                    case 'date':
                        return <Input type={'date'} field={field} value={move[field] as unknown as string} onChange={onChange} />;
                    case 'description':
                        return <Input field={field} value={move[field] as unknown as string} onChange={onChange} />;                        
                    case 'income':
                    case 'outcome':
                        return <Input field={field} value={move[field] as unknown as string} onChange={onChange} type={'number'}/>;                        
                    default:
                        return <Input field={field} value={move[field as keyof MoveSimplified] as unknown as string} onChange={onChange} />;
                }
            })}
            <Button onClick={()=>saveMove()}>Save</Button>
            {message && <div>{message}</div>}
            <div>{isClientOpen && shortForm()}</div>
        </div>
    )
}
