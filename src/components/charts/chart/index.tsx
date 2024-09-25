import React, { useContext, useEffect, useState } from 'react'
import { Move } from '@/types/wallet';
import { Button, Card, CardBody, CardHeader, Heading, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { IFilterProps } from '../filters';
import { ChartUtils } from '../utils';

interface IChartProps {
    filters?: IFilterProps;
    moves?: Move[];
    isSkeleton?: boolean;
};

export default function Chart(props: IChartProps) {
    const { filters, moves, isSkeleton } = props;
    const chartUtils = ChartUtils(moves, filters);
    const data = chartUtils.constructData();
    const ChartSelected = (props: any) => {
        if (!filters) return;
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
                        <Heading size='md'>{filters?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        {isSkeleton && <>
                            <SkeletonCircle margin={2}></SkeletonCircle>
                            <SkeletonText noOfLines={6}></SkeletonText>
                        </>}
                        {!isSkeleton && <ChartSelected data={data} />}
                    </CardBody>
                </Card>
            </Stack>
        </div >
    )
}
