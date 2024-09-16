import { useState } from "react";
import { Client, Currency, Move, Move as MoveType } from "../../types/wallet";

const defaultClient: Client = {
    id: '',
    name: '',
    lastName: '',
    address: '',
    type: "Client" as Client["type"],
};

const defaultCurrency: Currency = {
    id: 'u$s',
    lastUpdate: new Date(),
    name: 'American Dollar',
    value: 1,
}

export interface moveProps extends MoveType { };

export const useMove = (moveProps: moveProps) => {

    const [client, setClient] = useState(defaultClient);
    const incomes: MoveType[] = [];
    const outcomes: MoveType[] = [];

    const income = (value: number) => {
        const move: MoveType = {
            id: moveProps.id,
            client: client.id,
            date: new Date(),
            description: '',
            currency: defaultCurrency.id,
            amount: value,
            type:'I',
        };

        incomes.push(move);
        return move;
    };

    const outcome = (value: number) => {
        const move: MoveType = {
            id: moveProps.id,
            client: client.id,
            date: new Date(),
            description: '',
            currency: defaultCurrency.id,
            amount: value,
            type:'O',
        };

        outcomes.push(move);
        return move;
    };

    function reducer(values: MoveType[]): number {
        const valuesMap = values.map(
            (move: MoveType) => {
                return move.amount ?? 0;
            })
        const returns = valuesMap.reduce((acc, value) => {
            return acc += value;
        }, 0);

        return returns;
    }


    const getBalance = () => {
        const incomesTotal: number = reducer(incomes);
        const outcomesTotal: number = reducer(outcomes);
        const total = incomesTotal - outcomesTotal;
        return {
            total,
            incomes: incomesTotal,
            outcomes: outcomesTotal,
        }
    }

    return {
        setClient,
        income,
        outcome,
        getBalance,
    }
}