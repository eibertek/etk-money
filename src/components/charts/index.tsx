// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import { Line, Bar} from 'react-chartjs-2';
import { storageHook } from "../hooks/Storage";
import 'chart.js/auto';
import { Move } from '@/types/wallet';

const constructData = (moves) => {
    const movesByMonth = {};
    moves.forEach((element:Move) => {
        const month: number = element?.date && new Date(element?.date).getUTCMonth() || 0;
        if(month){
            if(movesByMonth[month] && movesByMonth[month].length) {
                movesByMonth[month].push(element);
            }else{
                movesByMonth[month] = [element];
            }
        }
    });
    const getIncomesFromMonth = (monthNumber) => {
        if(!movesByMonth[monthNumber]) return 0;
        return movesByMonth[monthNumber].reduce((prev, el)=> prev+=parseFloat(el.income || "0"),0);
    };
    console.log(movesByMonth, getIncomesFromMonth(7));
    return {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'GeeksforGeeks Line Chart',
            data: [getIncomesFromMonth(4), getIncomesFromMonth(5), getIncomesFromMonth(6), getIncomesFromMonth(7)],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],      
    };
};


const LineChart = () => {
  const moves = storageHook('move').getAll();
  const data = constructData(moves);
  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Example 1: Outcomes</h1>
      <Line data={data}  />
      <h1>Example 1: Incomes</h1>
      <Bar data={data}  />
    </div>
  );
};
export default LineChart;