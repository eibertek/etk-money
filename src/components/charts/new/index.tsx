import React, { useContext, useEffect, useState } from 'react'
import { Client, Move } from '@/types/wallet';
import { storageHook } from '@/components/hooks/Storage';
import { Button, Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ModalContext } from '@/components/shared/dialog/modalContext';
import { isWithinInterval, format } from "date-fns";

type IFilters = {
    chart?: string;
};
interface IChartProps {
    setModalOpen?: (value: boolean) => void;
    filters?: IFilters;
};

const isInsideRange = (value: number, from: number = 0, to: number = 999999999) => {
    const matchFrom = from ? value >= from : true;
    const matchTo = to ? value <= to : true;
    return matchFrom && matchTo;
};

const isInsideRangeDate = (value: Date, from: Date = new Date("01/01/1001"), to: Date = new Date("01/01/2999")) => {
    return isWithinInterval(value, { start: from, end: to });
};

const filterMoves = (moves: Move[], filters: { [name: string]: any }) => {
    return moves.filter((item: Move) => {
        if (!!filters) {
            const matchCurrency = filters.currency ? item.currency === filters.currency : true;
            const matchClient = filters.client ? item.client === filters.client : true;
            const matchType = filters.type ? item.type === filters.type : true;
            const matchAmount = item.amount && isInsideRange(item.amount, parseFloat(filters.amount_from), parseFloat(filters.amount_to));
            const matchDate = item.date && isInsideRangeDate(item.date, filters.date_from, filters.date_to);
            return (matchCurrency && matchClient && matchType && matchAmount && matchDate);
        }
        return true;
    });
}

const chartData = (chartType: string, data: Move[]) => {

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        data: [],
        fill: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
    };

};

export default function Chart({ setModalOpen = (value: boolean) => { }, filters = {} }: IChartProps) {
    const [moves, setMoves] = useState([]);
    const filteredMoves = filterMoves(moves, filters);
    const modal = useContext(ModalContext);

    useEffect(() => {
        setMoves(storageHook('move').getAll());
    }, [modal]);

    const ChartSelected = (props:any) => {
        switch (filters.chart) {
            case 'Line':
                return <Line {...props} />;
            case 'Bar':
                return <Bar {...props} />;
            case 'Radar':
                return <Radar {...props} />;
            case 'Doughnut':
                return <Doughnut {...props} />;
            default:
                return <Line {...props} />;
        }
    };

    return (
        <div className='text-white flex flex-col text-left w-full'>
            <Stack spacing='4'>
                <Card key={'card'} size={'md'}>
                    <CardHeader>
                        <Heading size='md'> Chart</Heading>
                    </CardHeader>
                    <CardBody>
                        <Button type="button" width="100px" my={4} onClick={() => setModalOpen(true)}>New Chart</Button>
                        <ChartSelected data={chartData(filters.chart || 'Line', filteredMoves)} />
                    </CardBody>
                </Card>
            </Stack>
        </div >
    )
}
