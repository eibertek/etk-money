// page.js this is the entry point of application

"use client";
import { Line, Bar } from 'react-chartjs-2';
import { storageHook } from "../hooks/Storage";
import 'chart.js/auto';
import { Currency, Move } from '@/types/wallet';

const constructLineData = (moves: Move[]) => {
  const movesByMonth = {};
  moves && moves.length && moves.forEach((element: Move) => {
    const month: number = element?.date && new Date(element?.date).getUTCMonth() || 0;
    if (month) {
      if ((movesByMonth as any)[month] && (movesByMonth as any)[month].length) {
        (movesByMonth as any)[month].push(element);
      } else {
        (movesByMonth as any)[month] = [element];
      }
    }
  });

  const getFromMonth = (monthNumber: number, field: 'income' | 'outcome') => {
    if (!(movesByMonth as any)[monthNumber-1]) return 0;
    let moves = (movesByMonth as any)[monthNumber-1];
    const currencies = storageHook('currencies').getAll();
    moves = moves.map((move: Move)=>{
      if(move.currency !== "u$s") {
        const exchange = currencies.find((currency: Currency)=>move.currency === currency.id);
        const income = parseFloat(((move?.income || 0) / exchange.value).toString());
        const outcome = parseFloat(((move?.outcome || 0) / exchange.value).toString());        
        move = {...move, income, outcome};
      };
      return move;
    });
    return moves.reduce((prev: number, el: { income: any; outcome: any }) => prev += parseFloat(el[field] || "0"), 0);
  };

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Income per month u$s',
        data: [
          getFromMonth(1, 'income'),
          getFromMonth(2, 'income'),
          getFromMonth(3, 'income'),
          getFromMonth(4, 'income'),
          getFromMonth(5, 'income'),
          getFromMonth(6, 'income'),
          getFromMonth(7, 'income'),
          getFromMonth(8, 'income'),
          getFromMonth(9, 'income'),
          getFromMonth(10, 'income'),
          getFromMonth(11, 'income'),
          getFromMonth(12, 'income'),
        ],
        fill:  'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',        
        tension: 0.1,
      },
      {
        label: 'Outcome per month u$s',
        data: [
          getFromMonth(1, 'outcome'),
          getFromMonth(2, 'outcome'),
          getFromMonth(3, 'outcome'),
          getFromMonth(4, 'outcome'),
          getFromMonth(5, 'outcome'),
          getFromMonth(6, 'outcome'),
          getFromMonth(7, 'outcome'),
          getFromMonth(8, 'outcome'),
          getFromMonth(9, 'outcome'),
          getFromMonth(10, 'outcome'),
          getFromMonth(11, 'outcome'),
          getFromMonth(12, 'outcome'),
        ],
        fill: 'rgb(192, 100, 100)',
        backgroundColor: 'rgb(192, 100, 100)',
        borderColor: 'rgb(192, 100, 100)',
        tension: 0.1,
      },      
    ],
  };
};

const constructBarData = (moves: Move[]) => {
  const movesByMonth = {};
  moves && moves.length && moves.forEach((element: Move) => {
    const month: number = element?.date && new Date(element?.date).getUTCMonth() || 0;
    if (month) {
      if ((movesByMonth as any)[month] && (movesByMonth as any)[month].length) {
        (movesByMonth as any)[month].push(element);
      } else {
        (movesByMonth as any)[month] = [element];
      }
    }
  });

  const getFromMonth = (monthNumber: number, field: 'income' | 'outcome') => {
    if (!(movesByMonth as any)[monthNumber-1]) return 0;
    let moves = (movesByMonth as any)[monthNumber-1];
    const currencies = storageHook('currencies').getAll();
    moves = moves.map((move: Move)=>{
      if(move.currency !== "u$s") {
        const exchange = currencies.find((currency: Currency)=>move.currency === currency.id);
        const income = parseFloat(((move?.income || 0) / exchange.value).toString());
        const outcome = parseFloat(((move?.outcome || 0) / exchange.value).toString());        
        move = {...move, income, outcome};
      };
      return move;
    });
    return moves.reduce((prev: number, el: { income: any; outcome: any }) => prev += parseFloat(el[field] || "0"), 0);
  };

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    color: 'rgb(255,255,255)',
    datasets: [
      {
        label: 'Income per month u$s',
        data: [
          getFromMonth(1, 'income'),
          getFromMonth(2, 'income'),
          getFromMonth(3, 'income'),
          getFromMonth(4, 'income'),
          getFromMonth(5, 'income'),
          getFromMonth(6, 'income'),
          getFromMonth(7, 'income'),
          getFromMonth(8, 'income'),
          getFromMonth(9, 'income'),
          getFromMonth(10, 'income'),
          getFromMonth(11, 'income'),
          getFromMonth(12, 'income'),
        ],
        fill:  'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',        
        tension: 0.1,
      },
      {
        label: 'Outcome per month u$s',
        data: [
          getFromMonth(1, 'outcome'),
          getFromMonth(2, 'outcome'),
          getFromMonth(3, 'outcome'),
          getFromMonth(4, 'outcome'),
          getFromMonth(5, 'outcome'),
          getFromMonth(6, 'outcome'),
          getFromMonth(7, 'outcome'),
          getFromMonth(8, 'outcome'),
          getFromMonth(9, 'outcome'),
          getFromMonth(10, 'outcome'),
          getFromMonth(11, 'outcome'),
          getFromMonth(12, 'outcome'),
        ],
        fill: 'rgb(192, 100, 100)',
        backgroundColor: 'rgb(192, 100, 100)',
        borderColor: 'rgb(192, 100, 100)',
        tension: 0.1,
      },
      {
        label: 'Totals per month',
        data: [
          getFromMonth(1, 'income') - getFromMonth(1, 'outcome'),
          getFromMonth(2, 'income') - getFromMonth(2, 'outcome'),
          getFromMonth(3, 'income') - getFromMonth(3, 'outcome'),
          getFromMonth(4, 'income') - getFromMonth(4, 'outcome'),
          getFromMonth(5, 'income') - getFromMonth(5, 'outcome'),
          getFromMonth(6, 'income') - getFromMonth(6, 'outcome'),
          getFromMonth(7, 'income') - getFromMonth(7, 'outcome'),
          getFromMonth(8, 'income') - getFromMonth(8, 'outcome'),
          getFromMonth(9, 'income') - getFromMonth(9, 'outcome'),
          getFromMonth(10, 'income') - getFromMonth(10, 'outcome'),
          getFromMonth(11, 'income') - getFromMonth(11, 'outcome'),
          getFromMonth(12, 'income') - getFromMonth(12, 'outcome'),
        ],
        fill: 'rgb(192, 100, 100)',
        backgroundColor: 'rgb(100, 192, 100)',
        borderColor: 'rgb(192, 100, 100)',
        tension: 0.1,
      },      
    ],
  };
};


const LineChart = () => {
  const moves = storageHook('move').getAll();
  const lineData = constructLineData(moves);
  const barData = constructBarData(moves);

  return (
    <div className="flex flex-row self-center w-full" >
      <div>
        <h1>Incomes / Outcomes by Month u$s</h1>
        <Line data={lineData} style={{ width:700, height:700, backgroundColor:'transparent', color: '#666'}} />
      </div>

      <div>
        <h1>Incomes, Outcomes and Totals by Month u$s</h1>
        <Bar data={barData} style={{ width:700, height:700, backgroundColor:'transparent', color: '#666'}} />
      </div>
    </div>
  );
};
export default LineChart;