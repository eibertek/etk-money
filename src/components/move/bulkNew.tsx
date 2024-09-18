import { useContext, useEffect, useState } from "react";
import { storageHook } from '@/components/hooks/Storage';
import { Client, Currency, Move } from "@/types/wallet";
import crypto from "crypto";
import { Grid } from "../shared/grid";
import Input from '@/components/shared/forms/input';
import Dropdown from '@/components/shared/forms/dropdown';
import DateComponent from '@/components/shared/forms/date';
import FormComponent from '@/components/shared/forms/form';
import { ModalContext } from "../shared/dialog/modalContext";
import ButtonLink from "../shared/button/LinkButton";
import { useFormikContext } from "formik";
import { Button } from "@chakra-ui/react";
import { ALLOW_EMPTY } from "../shared/constants";

interface IBulkNewProps {
    setModalOpen?: any;
}
interface IGridData {
    [row: number]: {
        [name: string]: any,
    }
}
const ENTITY_NAME = 'move';

const BulkNew = ({ setModalOpen = () => { } }: IBulkNewProps) => {
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

    const clientOptions = clients.map(({ id, name }) => ({ id, label: name }));
    const currencyOptions = currencies.map(({ id }) => ({ id, label: id }));

    const bulkClientSelect = () => <select name={`client`} value={bulk.client} onChange={({ target }) => setAllFields(target.name, target.value)} >
        <option key={`option_bcl_row_default`} value={""}> -- select a value -- </option>
        {clients.map((client: Client, i: number) => <option key={`option_client_row_${i}`} value={client.id}>{client.name}</option>)}
    </select>;

    const bulkCurrencySelect = () => <select name={`currency`} value={bulk.currency} onChange={({ target }) => setAllFields(target.name, target.value)} >
        <option key={`option_bcu_row_default`} value={""}> -- select a value -- </option>
        {currencies.map((currency: Currency, i: number) => <option key={`option_currency_row_${i}`} value={currency.id}>{currency.id}</option>)}
    </select>;

    const validations = (move: Move) => {
        if (move.client === "") return false;
        if (move.currency === "") return false;
        if (move.amount === 0) return false;
        return true;
    }

    const saveMove = (move: Move) => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256', `${move.client}_${move.currency}_${move.date}_${move.amount}_${move.type}`);
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

    const save = (values: any) => {
        const { client: defaultClient, currency: defaultCurrency } = gridData[-1] || { client: "", currency: "" };
        const resultMessages = [];
        for (let c = 0; c < rowNum; c++) {
            const client = defaultClient ? defaultClient : values[`${c}_client`];
            const currency = defaultCurrency ? defaultCurrency : values[`${c}_currency`];
            const date = values[`${c}_date`];
            const amount = values[`${c}_amount`];
            const type = values[`${c}_type`];
            const move = {
                client, currency, date, amount, type
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
                <FormComponent
                    initialValues={{}}
                    onSubmit={(values)=>{
                        save(values);
                    }}
                >
                    <Grid cols={['Date', 'Account', 'Currency', 'Income', 'Type']}>
                        {Array(rowNum).fill(1).map((_a, i) => {
                            return [
                                <DateComponent key={`field_${i}_date`} noLabel field={`${i}_date`} />,
                                <Dropdown noLabel key={`field_${i}_client`} options={clientOptions} field={`${i}_client`} />,
                                <Dropdown noLabel key={`field_${i}_currency`} options={currencyOptions} field={`${i}_currency`} />,
                                <Input noLabel key={`field_${i}_amount`} type="number" field={`${i}_amount`} />,
                                <Dropdown noLabel field={`${i}_type`} key={`field_${i}_type`}  options={[{ id: 'I', label: 'Income' }, { id: 'O', label: 'Outcome' }]} validationRules={{[ALLOW_EMPTY]: false}} />,
                            ];
                        }).flat()}
                    </Grid>
                </FormComponent>
                <div>{message}</div>
            </div>
            <div className="flex flex-col text-black p-5 w-[200px]">
                <div className="w-full py-5 grid justify-center">
                    <ButtonLink type="green" width="40px" onClick={() => setModalOpen(true)}>New Account</ButtonLink></div>
                <div className="text-black">Same client</div>
                <div>{bulkClientSelect()}</div>
                <div className="text-black">Same currency</div>
                <div>{bulkCurrencySelect()}</div>
            </div>
        </div>
    );
}

export default BulkNew;


