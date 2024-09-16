import React, { useEffect, useState } from 'react'
import { Client, Currency, Move } from '@/types/wallet';
import crypto from "crypto";
import { storageHook } from '@/components/hooks/Storage';

import Input from '@/components/shared/forms/input';
import DateComponent from '@/components/shared/forms/date';
import Dropdown from '@/components/shared/forms/dropdown';
import FormComponent from '@/components/shared/forms/form';

type MoveSimplified = Omit<Move, 'date' | 'client' | 'currency'>;

interface MoveProps extends MoveSimplified {
    client: Client['id'];
    currency: Currency['id'];
    date: Move['date'];
}

export const BLANK_MOVE: MoveProps = {
    id: "",
    client: '' as unknown as Client['id'],
    currency: '' as unknown as Currency['id'],
    date: new Date(),
    description: '',
    amount: 0,
    type: 'I',
};
const ENTITY_NAME = 'move';

export default function NewMove() {
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, []);

    const [message, setMessage] = useState('');

    const validations = (values:Move) => {
        if (values.client === "") return false;
        if (values.currency === "") return false;
        if (values.amount && values.amount === 0) return false;
        return true;
    }

    const saveMove = (values: Move) => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256', `${values.client}_${values.currency}_${values.date}_${values.income}_${values.outcome}`);
        if (!validations(values)) {
            setMessage('There are errors in the form');
            return;
        }
        try {
            storageHook(ENTITY_NAME).create({ ...values, id: hmacId.digest('hex') });
            setMessage('The Move was saved successfully');
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            }
        }
    }

    const clientOptions = clients.map((itemValue: Client, index: number) => ({ id: itemValue.id, label: itemValue.name }));
    const currenciesOptions = currencies.map((itemValue: Currency, index: number) => ({ id: itemValue.id, label: itemValue.id }));

    const validate = (value: string) => {
        if (value === "") return "The Field can't be Empty";
    };

    const NewMoveForm = () => {
        return (
            <FormComponent 
            initialValues={BLANK_MOVE}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        saveMove(values as Move);
                        console.log(values);
                        actions.setSubmitting(false)
                    }, 1000);
                }}
          >
                <DateComponent  field='date' />
                <Dropdown field='type' options={[{id:'I', label:'Income'}, {id:'O', label:'Outcome'}]} />
                <Dropdown field='client' options={clientOptions} />
                <Dropdown field='currency' options={currenciesOptions} />
                <Input  field='description' />
                <Input  field='amount' />
            </FormComponent>
        );
    };


    return (<>
        {NewMoveForm()}
        {message && <div>{message}</div>}
    </>)
}
