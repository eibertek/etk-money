import React from "react";


interface ButtonProps {
    onClick: ()=>void;
    children?: JSX.Element[] | string;
};
const btnClassName = "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-full px-8 py-5 me-2 my-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 shadow-lg";

export const Component = ({ onClick, children}:ButtonProps) => {
    return (
        <div className='w-full mb-6 md:mb-0'>
            <button className={`${btnClassName} flex justify-between my-5 w-full`} onClick={onClick}>{children}</button>
        </div>   
    );
};


export default Component;

