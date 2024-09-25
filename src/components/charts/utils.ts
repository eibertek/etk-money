import { Move } from "@/types/wallet";
import { IFilterProps } from "./filters";
import { format, isWithinInterval } from "date-fns";

const DATE_FORMAT = "dd/MM/yyyy";

export const ChartUtils = (moves:Move[]=[], filters:IFilterProps = {}) => {
    const chartType = filters.chart;

    const isInsideRange = (value:number, from: number=0, to: number=999999999) => {
        const matchFrom = from ? value >= from : true;
        const matchTo = to ? value <= to : true;
        return matchFrom && matchTo;
    };

    const isInsideRangeDate = (value:Date, from: Date = new Date("01/01/1001"), to: Date = new Date("01/01/2999")) => {
        return isWithinInterval(value, {start: from, end: to});
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    const groupByMonth = (filteredMoves:Move[]) => {
        const movesByMonth = {};
        filteredMoves && filteredMoves.length && filteredMoves.forEach((element: Move) => {
          const month: number = element?.date && new Date(element?.date).getUTCMonth() || 0;
          if (month) {
            if ((movesByMonth as any)[month] && (movesByMonth as any)[month].length) {
              (movesByMonth as any)[month].push(element);
            } else {
              (movesByMonth as any)[month] = [element];
            }
          }
        });        
        return movesByMonth;
    };

    const filterMoves = () => {
        return moves.filter((item: Move)=>{
            if(!!filters){
                const matchCurrency = filters.currency ? filters.currency?.includes(item.currency) : true; 
                const matchClient = filters.client ? filters.client?.includes(item.client) : true;
                const matchType = filters.type ? item.type === filters.type : true;
                const matchAmount = item.amount && isInsideRange(item.amount, parseFloat(filters.amount_from || ""), parseFloat(filters.amount_to || ""));
                const matchDate = item.date && isInsideRangeDate(item.date, filters.date_from, filters.date_to);
                return (matchCurrency && matchClient && matchType && matchAmount && matchDate);     
            } 
            return true;
        });
    }
    const constructData = () => {
        const filteredMoves = filterMoves();
        
        return {
            labels:filteredMoves.map(it=>it?.date && format(it?.date,"dd/MM/yyyy")),
            datasets:[{
                label: filters.title,
                data: filteredMoves.map(it=>it.amount),
                fill:  `#${getRandomColor()}`,
                tension: 0.1,
            }],
        };
    }
    
    return {
        constructData
    };
};