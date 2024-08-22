import { useContext, useEffect, useState } from "react";
import { storageHook } from '@/components/hooks/Storage';
import { Client, Currency, Move } from "@/types/wallet";
import crypto from "crypto";
import { Grid } from "../shared/grid";
import ButtonLink from "../shared/button/LinkButton";
import { ModalContext } from "../shared/dialog/modalContext";

interface IBulkNewProps { 
    setModalOpen?: any;
 }
interface IGridData {
    [row: number]: {
        [name: string]: any,
    }
}
const ENTITY_NAME = 'move';

const BulkNew = ({setModalOpen}: IBulkNewProps) => {
    const [rowNum, setRowNum] = useState(1);
    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [gridData, setGridData] = useState({} as IGridData);
    const [message, setMessage] = useState([]);
    const [bulk, setBulk] = useState({ client: "", currency: "" });
    const modal = useContext(ModalContext);

    const getRowData = (row: number, name: string) => {
        if (!gridData[row]) return "";
        return gridData[row][name] || "";
    };

    useEffect(() => {
        const clients = storageHook('client').getAll();
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, [modal]);

    const setField = (row: number, name: string, value: any) => {
        setGridData({
            ...gridData, [row]: {
                ...gridData[row],
                [name]: value,
            }
        });
    };

    const setAllFields = (name: string, value: any) => {
        setBulk({ ...bulk, [name]: value });
        Array(rowNum).fill(1).forEach((_a, i) => {
            if (gridData[i]) {
                gridData[i][name] = value;
            } else {
                gridData[i] = { [name]: value };
            }
        });
        setGridData(gridData);
    };

    const clientSelect = (row: number = -1) => <select name={`client`} className="bg-transparent" value={getRowData(row, "client")} onChange={({ target }) => setField(row, target.name, target.value)} >
        <option key={`option_client_row_${row}_default`} value={""}> -- select a value -- </option>
        {clients.map((client: Client, i: number) => <option key={`option_client_row_${row}_${i}`} value={client.id}>{client.companyName}</option>)}
    </select>;

    const currencySelect = (row: number = -1) => <select name={`currency`} className="bg-transparent" value={getRowData(row, "currency")} onChange={({ target }) => setField(row, target.name, target.value)} >
        <option key={`option_currency_row_${row}_default`} value={""}> -- select a value -- </option>
        {currencies.map((currency: Currency, i: number) => <option key={`option_currency_row_${row}_${i}`} value={currency.id}>{currency.id}</option>)}
    </select>;

    const bulkClientSelect = () => <select name={`client`} value={bulk.client} onChange={({ target }) => setAllFields(target.name, target.value)} >
        <option key={`option_bcl_row_default`} value={""}> -- select a value -- </option>
        {clients.map((client: Client, i: number) => <option key={`option_client_row_${i}`} value={client.id}>{client.companyName}</option>)}
    </select>;

    const bulkCurrencySelect = () => <select name={`currency`} value={bulk.currency} onChange={({ target }) => setAllFields(target.name, target.value)} >
        <option key={`option_bcu_row_default`} value={""}> -- select a value -- </option>
        {currencies.map((currency: Currency, i: number) => <option key={`option_currency_row_${i}`} value={currency.id}>{currency.id}</option>)}
    </select>;

    const validations = (move: Move) => {
        if (move.client === "") return false;
        if (move.currency === "") return false;
        if (move.income === 0 && move.outcome === 0) return false;
        if (move.income && move.income > 0 && move.outcome && move.outcome > 0) return false;
        return true;
    }

    const saveMove = (move: Move) => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256', `${move.client}_${move.currency}_${move.date}_${move.income}_${move.outcome}`);
        if (!validations(move)) {
            return 'There are errors in the form';
        }
        try {
            storageHook(ENTITY_NAME).create({ ...move, id: hmacId.digest('hex') });
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
        }
        return `The Move was saved successfully`;
    }

    const save = () => {
        const { client: defaultClient, currency: defaultCurrency } = gridData[-1] || { client: "", currency: "" };
        const resultMessages = [];
        for (let c = 0; c < rowNum; c++) {
            if (!gridData[c]) return;
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

        //@ts-ignore
        setMessage(resultMessages.map((message, index) => <div key={`i_message_${index}`}>Registry {index}: {message}</div>));
    };

    return (
        <div className="flex">
            <div>
                <div className="flex flex-row py-5">
                    <div className="text-black">Select number for rows</div>
                    <select name="row_num" className="text-black self-center mx-5" value={rowNum} onChange={({ target }) => setRowNum(parseInt(target.value))}>{Array(12).fill(1).map((v, i) => <option key={`row_${i + 1}`} value={i + 1}>{i + 1}</option>)}</select>
                </div>
                <Grid cols={['Date', 'Account', 'Currency', 'Income', 'Outcome']}>
                    {Array(rowNum).fill(1).map((_a, i) => {
                        return [
                            <input key={`input_${i}_date`} type="date" className="bg-transparent" name="date" value={getRowData(i, "date")} onChange={({ target }) => setField(i, target.name, target.value)} />,
                            clientSelect(i),
                            currencySelect(i),
                            <input key={`input_${i}_income`} type="number" className="bg-transparent" name="income" value={getRowData(i, "income")} onChange={({ target }) => setField(i, target.name, target.value)} />,
                            <input key={`input_${i}_outcome`} type="number" className="bg-transparent" name="outcome" value={getRowData(i, "outcome")} onChange={({ target }) => setField(i, target.name, target.value)} />,
                        ];
                    }).flat()}
                </Grid>
                <div>{message}</div>
            </div>
            <div className="flex flex-col text-black p-5 w-[200px]">
                <div className="w-full py-5 grid justify-center">
                    <ButtonLink type="green" width="40px" onClick={() => setModalOpen(true)}>New Account</ButtonLink></div>
                <div className="text-black">Same client</div>
                <div>{bulkClientSelect()}</div>
                <div className="text-black">Same currency</div>
                <div>{bulkCurrencySelect()}</div>
                <div className="w-full py-5 grid justify-center"><ButtonLink type="green" width="40px" onClick={save}>Save</ButtonLink></div>
            </div>
        </div>
    );
}

export default BulkNew;


