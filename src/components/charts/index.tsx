// page.js this is the entry point of application

"use client";
import { Line, Bar} from 'react-chartjs-2';
import { storageHook } from "../hooks/Storage";
import 'chart.js/auto';
import { Move } from '@/types/wallet';

const constructData = (moves: Move[]) => {
    const movesByMonth = {};
    moves.forEach((element:Move) => {
        const month: number = element?.date && new Date(element?.date).getUTCMonth() || 0;
        if(month){
            if((movesByMonth as any)[month] && (movesByMonth as any)[month].length) {
                (movesByMonth as any)[month].push(element);
            }else{
                (movesByMonth as any)[month] = [element];
            }
        }
    });

    const getIncomesFromMonth = (monthNumber:number) => {
        if(!(movesByMonth as any)[monthNumber]) return 0;
        return (movesByMonth as any)[monthNumber].reduce((prev: number, el: { income: any; })=> prev+=parseFloat(el.income || "0"),0);
    };
    
    console.log(movesByMonth, getIncomesFromMonth(7));
    return {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'GeeksforGeeks Line Chart',
            data: [getIncomesFromMonth(1), getIncomesFromMonth(2), getIncomesFromMonth(3), getIncomesFromMonth(4)],
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