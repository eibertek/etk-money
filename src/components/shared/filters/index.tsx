import { createContext, useEffect, useState } from "react";
import Range from '@/components/shared/forms/range';
import Dropdown from '@/components/shared/forms/dropdown';
import DateRange from '@/components/shared/forms/dateRange';
import FormComponent from '@/components/shared/forms/form';
import { storageHook } from "@/components/hooks/Storage";
import { Client, Currency } from "@/types/wallet";



interface IFormProps {
    initialValues?: any;
    setModalOpen: any;
    onSubmit?: (values: any, actions: any) => void;
}

export const FormPropsContext = createContext({ errors: {}, values: {}, setValues: (values: any) => { console.log(values) } });

export const FilterPropsContext = createContext({});

const FilterComponent = ({ initialValues={}, onSubmit }: IFormProps) => {
    const [clients, setClients] = useState([] as Client[]);
    const [currencies, setCurrencies] = useState([] as Currency[]);

    useEffect(() => {
        const clients: Client[] = storageHook('client').getAll();
        const currencies: Currency[] = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, []);

    const clientOptions = clients.map(({ id, name }) => ({ id, label: name }));
    const currencyOptions = currencies.map(({ id }) => ({ id, label: id }));
    const typeOptions = [{ id: 'I', label: 'Income' }, { id: 'O', label: 'Outcome' }];

    return (
        <FormComponent
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <DateRange key={`field_filter_date`} field={`date`} />
            <Dropdown key={`field_filter_client`} options={clientOptions} field={`client`} />
            <Dropdown key={`field_filter_currency`} options={currencyOptions} field={`currency`} />
            <Range key={`field_filter_amount`} field={`amount`} />
            <Dropdown field={`type`} key={`field_filter_type`} options={typeOptions} />
        </FormComponent>
    );
};

export default FilterComponent;