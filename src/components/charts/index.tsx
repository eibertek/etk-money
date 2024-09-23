// page.js this is the entry point of application

"use client";
import { storageHook } from "../hooks/Storage";
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Currency, Move, MOVE_TYPES } from '@/types/wallet';

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

  const getFromMonth = (monthNumber: number, field: 'I' | 'O') => {
    if (!(movesByMonth as any)[monthNumber-1]) return 0;
    let moves = (movesByMonth as any)[monthNumber-1];
    const currencies = storageHook('currencies').getAll();
    moves = moves.filter((mv:Move) => mv.type === field).map((move: Move)=>{      
      if(move.currency !== "u$s") {
        const exchange = currencies.find((currency: Currency)=>move.currency === currency.id);
        const amount = parseFloat(((move?.amount || 0) / exchange.value).toString());
        const type = move?.type;        
        move = {...move, amount, type};
      };
      return move;
    });
    return moves.reduce((prev: number, el: { amount: any; type: any }) => prev += parseFloat(el.amount || "0"), 0);
  };

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Income per month u$s',
        data: [
          getFromMonth(1, 'I'),
          getFromMonth(2, 'I'),
          getFromMonth(3, 'I'),
          getFromMonth(4, 'I'),
          getFromMonth(5, 'I'),
          getFromMonth(6, 'I'),
          getFromMonth(7, 'I'),
          getFromMonth(8, 'I'),
          getFromMonth(9, 'I'),
          getFromMonth(10, 'I'),
          getFromMonth(11, 'I'),
          getFromMonth(12, 'I'),
        ],
        fill:  'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',        
        tension: 0.1,
      },
      {
        label: 'Outcome per month u$s',
        data: [
          getFromMonth(1, 'O'),
          getFromMonth(2, 'O'),
          getFromMonth(3, 'O'),
          getFromMonth(4, 'O'),
          getFromMonth(5, 'O'),
          getFromMonth(6, 'O'),
          getFromMonth(7, 'O'),
          getFromMonth(8, 'O'),
          getFromMonth(9, 'O'),
          getFromMonth(10, 'O'),
          getFromMonth(11, 'O'),
          getFromMonth(12, 'O'),
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

  const getFromMonth = (monthNumber: number, field: 'I' | 'O') => {
    if (!(movesByMonth as any)[monthNumber-1]) return 0;
    let moves = (movesByMonth as any)[monthNumber-1];
    const currencies = storageHook('currencies').getAll();
    moves = moves.filter((mv:Move) => mv.type === field).map((move: Move)=>{      
      if(move.currency !== "u$s") {
        const exchange = currencies.find((currency: Currency)=>move.currency === currency.id);
        const amount = parseFloat(((move?.amount || 0) / exchange.value).toString());
        const type = move?.type;        
        move = {...move, amount, type};
      };
      return move;
    });
    return moves.reduce((prev: number, el: { amount: any; type: any }) => prev += parseFloat(el.amount || "0"), 0);
  };


  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    color: 'rgb(255,255,255)',
    datasets: [
      {
        label: 'Income per month u$s',
        data: [
          getFromMonth(1, 'I'),
          getFromMonth(2, 'I'),
          getFromMonth(3, 'I'),
          getFromMonth(4, 'I'),
          getFromMonth(5, 'I'),
          getFromMonth(6, 'I'),
          getFromMonth(7, 'I'),
          getFromMonth(8, 'I'),
          getFromMonth(9, 'I'),
          getFromMonth(10, 'I'),
          getFromMonth(11, 'I'),
          getFromMonth(12, 'I'),
        ],
        fill:  'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',        
        tension: 0.1,
      },
      {
        label: 'Outcome per month u$s',
        data: [
          getFromMonth(1, 'O'),
          getFromMonth(2, 'O'),
          getFromMonth(3, 'O'),
          getFromMonth(4, 'O'),
          getFromMonth(5, 'O'),
          getFromMonth(6, 'O'),
          getFromMonth(7, 'O'),
          getFromMonth(8, 'O'),
          getFromMonth(9, 'O'),
          getFromMonth(10, 'O'),
          getFromMonth(11, 'O'),
          getFromMonth(12, 'O'),
        ],
        fill: 'rgb(192, 100, 100)',
        backgroundColor: 'rgb(192, 100, 100)',
        borderColor: 'rgb(192, 100, 100)',
        tension: 0.1,
      },
      {
        label: 'Totals per month',
        data: [
          getFromMonth(1, 'I') - getFromMonth(1, 'O'),
          getFromMonth(2, 'I') - getFromMonth(2, 'O'),
          getFromMonth(3, 'I') - getFromMonth(3, 'O'),
          getFromMonth(4, 'I') - getFromMonth(4, 'O'),
          getFromMonth(5, 'I') - getFromMonth(5, 'O'),
          getFromMonth(6, 'I') - getFromMonth(6, 'O'),
          getFromMonth(7, 'I') - getFromMonth(7, 'O'),
          getFromMonth(8, 'I') - getFromMonth(8, 'O'),
          getFromMonth(9, 'I') - getFromMonth(9, 'O'),
          getFromMonth(10, 'I') - getFromMonth(10, 'O'),
          getFromMonth(11, 'I') - getFromMonth(11, 'O'),
          getFromMonth(12, 'I') - getFromMonth(12, 'O'),
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