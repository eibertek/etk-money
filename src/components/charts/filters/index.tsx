import { createContext, useEffect, useState } from "react";
import Range from '@/components/shared/forms/range';
import Input from '@/components/shared/forms/input';
import Dropdown from '@/components/shared/forms/dropdown';
import MultiSelect from '@/components/shared/forms/multiselect';
import DateRange from '@/components/shared/forms/dateRange';
import FormComponent from '@/components/shared/forms/form';
import { storageHook } from "@/components/hooks/Storage";
import { Client, Currency } from "@/types/wallet";
import { ALLOW_EMPTY } from "@/components/shared/constants";

interface IFormProps {
    initialValues?: any;
    setModalOpen: any;
    onSubmit?: (values: any, actions: any) => void;
}

export interface IFilterProps {
    title?: string;
    chart?: string;
    date_from?: Date;
    date_to?:Date;
    client?: string[];
    currency?: string[];
    amount_from?: string;
    amount_to?: string;
    type?: string; 
};


const FilterComponent = ({ initialValues = {}, onSubmit }: IFormProps) => {
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
    const chartOptions = [
        { id: 'Line', label: 'Line' },
        { id: 'Bar', label: 'Bar' },
        { id: 'Radar', label: 'Radar' },
        { id: 'Doughnut', label: 'Doughnout' }
    ];

    return (
        <FormComponent
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Input field="title" placeholder="Add title to chart" validationRules={{[ALLOW_EMPTY]: false}} />
            <Dropdown key={`field_filter_chart`} options={chartOptions} field={`chart`} validationRules={{[ALLOW_EMPTY]: false}} />
            <DateRange key={`field_filter_date`} field={`date`} />
            <MultiSelect key={`field_filter_client`} options={clientOptions} field={`client`} />
            <MultiSelect key={`field_filter_currency`} options={currencyOptions} field={`currency`} />
            <Range key={`field_filter_amount`} field={`amount`} />
            <Dropdown field={`type`} key={`field_filter_type`} options={typeOptions} />
        </FormComponent>
    );
};

export default FilterComponent;