import { useEffect, useState } from "react";
import { storageHook } from '@/components/hooks/Storage';
import { Client, Currency } from "@/types/wallet";


interface IBulkNewProps { }


const BulkNew = (bulkNewProps: IBulkNewProps) => {
    const [rowNum, setRowNum] = useState(1);
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [gridData, setGridData] = useState({});

    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, []);

    const setField = (row: number, name: string, value:any) => {
        setGridData({...gridData, [row]:{
            ...gridData[row],
            [name]:value,
        }});
    };

    const clientSelect = (row:number) => <select name={`row_client_${row}`} className="w-full" onChange={({ target} )=>setField(row, target.name, target.value)} >
        {clients.map((client:Client, i:number)=> <option key={`option_row_${row}_${i}`} value={client.id}>{client.companyName}</option>)}
    </select>;

    const currencySelect = (row:number) => <select name={`row_currency_${row}`} className="w-full" onChange={({ target} )=>setField(row, target.name, target.value)} >
        {currencies.map((currency:Currency, i:number)=> <option key={`option_row_${row}_${i}`} value={currency.id}>{currency.name}</option>)}
    </select>;

    return (<div>
        <div className="flex flex-row">
            <div className="px-4">Select number fo rows</div>
            <select name="row_num" className="text-black" value={rowNum} onChange={({ target }) => setRowNum(parseInt(target.value))}>{Array(12).fill(1).map((v, i) => <option key={`row_${i + 1}`} value={i + 1}>{i + 1}</option>)}</select>
        </div>
        <div className="grid grid-cols-5">
            <div>Date</div>
            <div>Client</div>
            <div>Currency</div>
            <div>Income</div>
            <div>Outcome</div>
        </div>
        <div>
            {Array(rowNum).fill(1).map((a, i) => {
                return (
                    <div key={`key_row_${i}`} className="grid grid-cols-5 text-black w-full">
                        <div className="border border-gray-400"><input type="date" className="w-full" /></div>
                        <div className="border border-gray-400">{clientSelect(i)}</div>
                        <div className="border border-gray-400">{currencySelect(i)}<input /></div>
                        <div className="border border-gray-400"><input /></div>
                        <div className="border border-gray-400"><input /></div>
                    </div>
                );
            })}
        </div>
    </div>);
}

export default BulkNew;