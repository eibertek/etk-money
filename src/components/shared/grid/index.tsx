import classNames from "classnames";
import styles from "./grid.module.scss";


type Row = {
    name: string,
    content: JSX.Element,    
};

interface IGridProps {
    children?: JSX.Element[];
    cols: string[];
    rows?: Row[];
};

export const Grid = ({
    children,
    cols,
    rows,
}:IGridProps) => {
    const gridClasses = classNames("grid");

    return (
        <section className={`w-full ${styles['grid']}  text-black`}>
        <div className={`${styles['grid__header--row']} grid-cols-${cols.length}`}>
           {cols.map((colName, i)=> <div key={`row_header_${colName}_${i}`}>{colName}</div>)}
        </div>
        <div className={`${styles['grid--row']}  grid-cols-${cols.length}`}>
            {children && children.map((row, i) => {
                    return <div key={`row_${i}`}>{row}</div>;
                })}
        </div>        
        </section>
    );
}