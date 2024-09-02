import React, { useEffect, useState } from 'react'
import { Client, CLIENT_TYPES, Currency } from '@/types/wallet';
import crypto from "crypto";
import { storageHook } from '@/components/hooks/Storage';
import Dropdown from '@/components/shared/select';
import Input from '@/components/shared/input';
import Button from '@/components/shared/button';

export const BLANK_CURRENCY: Currency = {
    id: "",
    name: "",
    value: 0,
    value_from: "u$s",
    lastUpdate: new Date(),
};
const ENTITY_NAME = 'currencies';

export default function NewCurrency() {
    const [currency, setCurrency] = useState(BLANK_CURRENCY);
    const [currencies, setCurrencies] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
    }, []);

    const onChange = (field: string, value: string | number) => {
        setCurrency({...currency, [field]: value});
        setMessage('');
    };

    const validations = () => {
        if(currency.id === "") return false;
        if(currency.name === "") return false;
        return true;
    }

    const saveMove = () => {
        // create unique id hash
        if(!validations()) {
            setMessage('There are errors in the form');
            return;
        }        
        try{
            storageHook(ENTITY_NAME).create({...currency});        
            setMessage('The Move was saved successfully');
            setCurrency(BLANK_CURRENCY);
        }catch(error){
            if(error instanceof Error) {
                setMessage(error.message);
            }
        }
    }
    
    return (
        <div className='text-white flex flex-col justify-start'>
            {Object.keys(BLANK_CURRENCY).map((field) => {
                switch (field) {
                    case 'lastUpdate':
                        return <Input type={'date'} field={field} value={currency[field] as unknown as string} onChange={onChange} />;
                    case 'value':
                        return <Input field={field} value={currency[field] as unknown as string} onChange={onChange} type={'number'}/>;
                    case 'value_from':
                        return <Dropdown field='value_from' value={currency.value_from} onChange={onChange} options={currencies} optionLabel={(currencyItem)=>currencyItem.id} />;
                    default:
                        return <Input field={field} value={currency[field as keyof Currency] as unknown as string} onChange={onChange} />;
                }
            })}
            <Button onClick={()=>saveMove()}>Save</Button>
            {message && <div>{message}</div>}
        </div>
    )
}
