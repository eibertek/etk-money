import { Context, useContext, useEffect, useState } from "react";
import { storageHook } from '@/components/hooks/Storage';
import { Client, Currency, Move } from "@/types/wallet";
import crypto from "crypto";
import { Grid } from "../shared/grid";
import Input from '@/components/shared/forms/input';
import Dropdown from '@/components/shared/forms/dropdown';
import BulkDropdown from '@/components/shared/forms/bulk_dropdown';
import DateComponent from '@/components/shared/forms/date';
import FormComponent from '@/components/shared/forms/form';
import { ModalContext } from "../shared/dialog/modalContext";
import ButtonLink from "../shared/button/LinkButton";
import { ALLOW_EMPTY } from "../shared/constants";
import { Flex } from "@chakra-ui/react";

interface IBulkNewProps {
    setModalOpen?: any;
}

const ENTITY_NAME = 'move';

const BulkNew = ({ setModalOpen = () => { } }: IBulkNewProps) => {
    const [rowNum, setRowNum] = useState(1);
    const [clients, setClients] = useState([] as Client[]);
    const [currencies, setCurrencies] = useState([] as Currency[]);
    const [message, setMessage] = useState([]);
    const modal = useContext(ModalContext);

    useEffect(() => {
        const clients: Client[] = storageHook('client').getAll();
        const currencies: Currency[] = storageHook('currencies').getAll();
        setCurrencies(currencies);
        setClients(clients);
    }, [modal]);

    const clientOptions = clients.map(({ id, name }) => ({ id, label: name }));
    const currencyOptions = currencies.map(({ id }) => ({ id, label: id }));
    const typeOptions = [{ id: 'I', label: 'Income' }, { id: 'O', label: 'Outcome' }];
    const saveMove = (move: Move) => {
        // create unique id hash
        const hmacId = crypto.createHmac('sha256', `${move.client}_${move.currency}_${move.date}_${move.amount}_${move.type}`);
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
        const resultMessages = [];
        for (let c = 0; c < rowNum; c++) {
            const client = values[`${c}_client`];
            const currency = values[`${c}_currency`];
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
                    onSubmit={(values) => {
                        save(values);
                    }}
                >
                    <>
                        <Flex direction={"row"} gap={2} mb={4}>
                            <BulkDropdown key={`bulk_client`} options={clientOptions} field={`bulk_client`} destiny="client" rowNum={rowNum} />
                            <BulkDropdown key={`bulk_currency`} options={currencyOptions} field={`bulk_currency`} destiny="currency" rowNum={rowNum} />
                            <BulkDropdown key={`bulk_type`} options={typeOptions} field={`bulk_type`} destiny="type" rowNum={rowNum} />
                        </Flex>
                        <Grid cols={['Date', 'Account', 'Currency', 'Income', 'Type']}>
                            {Array(rowNum).fill(1).map((_a, i) => {
                                return [
                                    <DateComponent key={`field_${i}_date`} noLabel field={`${i}_date`} />,
                                    <Dropdown noLabel key={`field_${i}_client`} options={clientOptions} field={`${i}_client`} />,
                                    <Dropdown noLabel key={`field_${i}_currency`} options={currencyOptions} field={`${i}_currency`} />,
                                    <Input noLabel key={`field_${i}_amount`} type="number" field={`${i}_amount`} />,
                                    <Dropdown noLabel field={`${i}_type`} key={`field_${i}_type`} options={typeOptions} validationRules={{ [ALLOW_EMPTY]: false }} />,
                                ];
                            }).flat()}
                        </Grid>
                    </>
                </FormComponent>
                <div>{message}</div>
            </div>
            <div className="flex flex-col text-black p-5 w-[200px]">
                <div className="w-full py-5 grid justify-center">
                    <ButtonLink type="green" width="40px" onClick={() => setModalOpen(true)}>New Account</ButtonLink></div>
            </div>
        </div>
    );
}

export default BulkNew;


