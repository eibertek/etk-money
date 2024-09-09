import React, { useEffect, useState } from 'react'
import { Client, CLIENT_TYPES, Currency, Move } from '@/types/wallet';
import crypto from "crypto";
import { storageHook } from '@/components/hooks/Storage';
import Dropdown from '@/components/shared/select';

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Select,
} from '@chakra-ui/react'
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';

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
    income: 0,
    outcome: 0,
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
        if (values.income === 0 && values.outcome === 0) return false;
        if (values.income && values.income > 0 && values.outcome && values.outcome > 0) return false;
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

    const clientOptions = clients.map((itemValue: Client, index: number) => <option key={`key_dropdown_${index}_${itemValue.id}`} value={itemValue.id}>{itemValue.name}</option>);
    const currenciesOptions = currencies.map((itemValue: Client, index: number) => <option key={`key_dropdown_${index}_${itemValue.id}`} value={itemValue.id}>{itemValue.id}</option>);

    const validate = (value: string) => {
        if (value === "") return "The Field can't be Empty";
    };

    const NewMoveForm = () => {
        return (
            <Formik initialValues={BLANK_MOVE}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        saveMove(values as Move);
                        console.log(values);
                        actions.setSubmitting(false)
                    }, 1000);
                }}>
                {(props) => (
                    <Form>
                        <Field name="client" validate={validate}>
                            {({ field }: FieldProps) => (
                                <FormControl>
                                    <FormLabel>Client</FormLabel>
                                    <Select {...field} required>
                                        <option value={""}>--select a value --</option>
                                        {clientOptions}
                                    </Select>
                                    <ErrorMessage {...field} render={(msg) => <div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="currency" validate={validate}>
                            {({ field }: FieldProps) => (
                                <FormControl>
                                    <FormLabel>Currency</FormLabel>
                                    <Select {...field} required>
                                        <option value={""}>--select a value --</option>
                                        {currenciesOptions}
                                    </Select>
                                    <ErrorMessage {...field} render={(msg) => <div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='date' validate={validate}>
                            {({ field }: FieldProps) => (
                                <FormControl >
                                    <FormLabel>Date</FormLabel>
                                    <Input {...field} required type='date' />
                                    <FormHelperText>{"Move's Date"}</FormHelperText>
                                    <ErrorMessage {...field} render={(msg) => <div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='description'>
                            {({ field }: FieldProps) => (
                                <FormControl >
                                    <FormLabel>Description</FormLabel>
                                    <Input {...field} type='text' />
                                    <FormHelperText>Description</FormHelperText>
                                    <ErrorMessage {...field} render={(msg) => <div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='income'>
                            {({ field }: FieldProps) => (
                                <FormControl >
                                    <FormLabel>Income</FormLabel>
                                    <Input {...field} type='text' />
                                    <ErrorMessage {...field} render={(msg) => <div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='outcome'>
                            {({ field }: FieldProps) => (
                                <FormControl >
                                    <FormLabel>Outcome</FormLabel>
                                    <Input {...field} type='text' />
                                    <ErrorMessage {...field} render={(msg) => <div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    };


    return (<>
        {NewMoveForm()}
        {message && <div>{message}</div>}
    </>)
}
