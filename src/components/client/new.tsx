import React, { useState } from 'react'
import { Client, CLIENT_TYPES } from '@/types/wallet';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import crypto from "crypto";
import { storageHook } from '@/components/hooks/Storage';

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Select,
} from '@chakra-ui/react'

const blankClient = {
    id: '',
    name: '',
    lastName: '',
    address: '',
    type: "" as Client["type"],
};

export default function NewClient({ setModalOpen = () => { } }) {

    const [message, setMessage] = useState('');

    const saveClient = (values: Client) => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256', `${values.name}_${values.lastName}`);
        try {
            storageHook('client').create({ ...values, id: hmacId.digest('hex') });
            setMessage('The client was saved successfully');
            setModalOpen();
        } catch (e) {
            if (e instanceof Error) {
                setMessage(e.message);
            }
        }
    }

    const itemsOptions = CLIENT_TYPES.map((itemValue: any, index: number) => <option key={`key_dropdown_${index}_${itemValue}`} value={itemValue}>{itemValue}</option>);
    const validate = (value: string) => { 
        if(value === "") return "The Field can't be Empty";
    };

    const longFormV2 = () => {
        return (
            <Formik initialValues={blankClient}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        saveClient(values);
                        actions.setSubmitting(false)
                    }, 1000);
                }}>
                {(props) => (
                    <Form>
                        <Field name="type" validate={validate}>
                            {({ field }: FieldProps) => (
                                <FormControl>
                                    <FormLabel>Account Type</FormLabel>
                                    <Select {...field}>
                                        <option value={""}>--select a value --</option>
                                        {itemsOptions}
                                    </Select>
                                    <ErrorMessage {...field} render={(msg)=><div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='name' validate={validate}>
                            {({ field }: FieldProps) => (
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} type='text' />
                                    <FormHelperText>Name of Account</FormHelperText>
                                    <ErrorMessage {...field} render={(msg)=><div className='text-red-500'>{msg}</div>} />
                                </FormControl>
                            )}
                        </Field>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input type='text' name='address' />
                        </FormControl>
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
        {longFormV2()}
        {message && <div>{message}</div>}
    </>)
}
