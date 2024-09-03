import Dropdown from '@/components/shared/filters/dropdown';
import Range from '@/components/shared/filters/range';
import { useEffect, useState } from 'react';
import { storageHook } from '@/components/hooks/Storage';
import { Client } from '@/types/wallet';
import { btnClassName } from '../button';

interface IFilters {
    date_range?: { from: number, to: number };
    income_range?: { from: number, to: number };
    outcome_range?: { from: number, to: number };
    showOnly?: 'incomes' | 'outcomes';
    client?: string;
    currency?: string;
    client_type?: string;
};

interface IFiltersProps {
    client?: boolean;
    date_range?: boolean;
    income_range?: boolean;
    outcome_range?: boolean;
    showOnly?: boolean;
    currency?: boolean;
    onChange: (name:string, value:any) => void;
    filters: {[name: string]: any}
};

export const Filters = (props: IFiltersProps) => {
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    const {
        client,
        date_range,
        income_range,
        outcome_range,
        showOnly,
        onChange,
        filters,
    } = props;

    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, []);
    
    return (
        <div className='w-full flex flex-row'>
            {client && <div className='mx-4'>
                <Dropdown
                    field='client'
                    value={filters.client}
                    onChange={onChange}
                    options={clients}
                    allowEmpty
                    optionLabel={(client: Client) => client.name ? client.name : `${client.name} ${client.lastName}`} />
            </div>}
            {date_range && <div className='mx-4'><Range field="date" onChange={onChange} type='date'  /></div>}
            {income_range && <div className='mx-4'><Range field="income" onChange={onChange} type='number' /></div>}
            {outcome_range && <div className='mx-4'><Range field="outcome" onChange={onChange} type='number' /></div>}
            {showOnly && <div className='mx-4'>
                <Dropdown
                    field='showOnly'
                    value={filters.showOnly}
                    onChange={onChange}
                    options={['incomes', 'outcomes']}
                    allowEmpty
                    optionLabel={(name:string) => name} />                
                </div>}
            <button className={`${btnClassName} mx-4 flex self-center`}>Clear all</button>
        </div>
    );
}