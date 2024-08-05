import { useState } from "react";
import { Client, Currency, Move as MoveType } from "../../types/wallet";

const defaultClient: Client = {
    id: '',
    companyName: '',
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
            client,
            date: new Date(),
            description: '',
            currency: defaultCurrency,
            income: value,
        };

        incomes.push(move);
        return move;
    };

    const outcome = (value: number) => {
        const move: MoveType = {
            id: moveProps.id,
            client,
            date: new Date(),
            description: '',
            currency: defaultCurrency,
            outcome: value,
        };

        outcomes.push(move);
        return move;
    };

    function reducer(values: MoveType[], propName: 'income' | 'outcome'): number {
        const valuesMap = values.map(
            (move: MoveType) => {
                return move[propName] ?? 0;
            })
        const returns = valuesMap.reduce((acc, value) => {
            return acc += value;
        }, 0);

        return returns;
    }


    const getBalance = () => {
        const incomesTotal: number = reducer(incomes, 'income');
        const outcomesTotal: number = reducer(outcomes, 'outcome');
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