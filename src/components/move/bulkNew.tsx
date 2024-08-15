import { useEffect, useState } from "react";
import { storageHook } from '@/components/hooks/Storage';
import { Client, Currency, Move } from "@/types/wallet";
import crypto from "crypto";

interface IBulkNewProps { }
interface IGridData {
    [row:number]: {
        [name:string]:any,
    }
}
const ENTITY_NAME = 'move';

const BulkNew = (bulkNewProps: IBulkNewProps) => {
    const [rowNum, setRowNum] = useState(1);
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [gridData, setGridData] = useState({} as IGridData);
    const [message, setMessage] = useState([]);
    
    const getRowData = (row:number, name:string) => {
        if(!gridData[row]) return "";
        return gridData[row][name] || "";
    };

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

    const clientSelect = (row:number=-1) => <select name={`client`} className="w-full" value={getRowData(row, "client")} onChange={({ target} )=>setField(row, target.name, target.value)} >
        <option key={`option_row_${row}_default`} value={""}> -- select a value -- </option>
        {clients.map((client:Client, i:number)=> <option key={`option_row_${row}_${i}`} value={client.id}>{client.companyName}</option>)}
    </select>;

    const currencySelect = (row:number=-1) => <select name={`currency`} className="w-full" value={getRowData(row, "currency")} onChange={({ target} )=>setField(row, target.name, target.value)} >
        <option key={`option_row_${row}_default`} value={""}> -- select a value -- </option>
        {currencies.map((currency:Currency, i:number)=> <option key={`option_row_${row}_${i}`} value={currency.id}>{currency.id}</option>)}
    </select>;

    const validations = (move:Move) => {
        if(move.client === "") return false;
        if(move.currency === "") return false;
        if(move.income === 0 &&  move.outcome === 0) return false;
        if(move.income && move.income > 0 && move.outcome &&  move.outcome > 0) return false;
        return true;
    }

    const saveMove = (move:Move) => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256',`${move.client}_${move.currency}_${move.date}_${move.income}_${move.outcome}`);
        if(!validations(move)) {
            return 'There are errors in the form';
        }        
        try{
            storageHook(ENTITY_NAME).create({...move, id: hmacId.digest('hex')});        
        }catch(error){
            if(error instanceof Error) {
                return error.message;
            }
        }
        return `The Move was saved successfully`;
    }

    const save = () => {
        const { client: defaultClient, currency: defaultCurrency } = gridData[-1] || {client:"", currency:""};
        const resultMessages = [];
        for(let c=0; c<rowNum; c++){
            if(!gridData[c]) return;
            const client = defaultClient ? defaultClient : gridData[c]['client'];
            const currency = defaultCurrency ? defaultCurrency : gridData[c]['currency'];
            const date = gridData[c]['date'];
            const income = gridData[c]['income'];
            const outcome = gridData[c]['outcome'];
            const move = {
                client, currency, date, income, outcome
            } as Move;
            resultMessages.push(saveMove(move));
        } 

        setMessage(resultMessages.map((message, index) => <div key={`i_message_${index}`}>Registry {index}: {message}</div>));
    };

    return (<div>
        <div className="flex flex-row text-black">
            <div className="text-white px-4">Select number fo rows</div>
            <select name="row_num" value={rowNum} onChange={({ target }) => setRowNum(parseInt(target.value))}>{Array(12).fill(1).map((v, i) => <option key={`row_${i + 1}`} value={i + 1}>{i + 1}</option>)}</select>
            <div  className="text-white px-4">same client</div>
            <div>{clientSelect()}</div>
            <div className="text-white px-4">same currency</div>
            <div>{currencySelect()}</div>
        </div>
        <div className="grid grid-cols-5">
            <div>Date</div>
            {!getRowData(-1,"client")  && <div>Client</div>}
            {!getRowData(-1,"currency") && <div>Currency</div>}
            <div>Income</div>
            <div>Outcome</div>
        </div>
        <div>
            {Array(rowNum).fill(1).map((a, i) => {
                return (
                    <div key={`key_row_${i}`} className="grid grid-cols-5 text-black w-full">
                        <div className="border border-gray-400"><input type="date" className="w-full" name="date" value={getRowData(i, "date")} onChange={({ target} )=>setField(i, target.name, target.value)} /></div>
                        {!getRowData(-1,"client") && <div className="border border-gray-400">{clientSelect(i)}</div>}
                        {!getRowData(-1,"currency") && <div className="border border-gray-400">{currencySelect(i)}</div>}
                        <div className="border border-gray-400"><input  type="number" name="income" value={getRowData(i, "income")} onChange={({ target} )=>setField(i, target.name, target.value)} /></div>
                        <div className="border border-gray-400"><input  type="number" name="outcome" value={getRowData(i, "outcome")} onChange={({ target} )=>setField(i, target.name, target.value)} /></div>
                    </div>
                );
            })}
        </div>
        <div><button onClick={save}>Save</button></div>
        <div>{message}</div>
    </div>);
}

export default BulkNew;