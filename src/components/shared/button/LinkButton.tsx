import classNames from "classnames";
import Link from "next/link";
import React from "react";


interface ButtonProps {
    onClick?: ()=>void;
    href?: string;
    type?: 'status' | 'error' | 'green';
    classes?: string;
    children?: JSX.Element[] | string;
    width?: string;
};
export const statusClassName = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
export const greenClassName = "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
export const errorClassName = "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

export const ButtonLink = ({ onClick, classes, width="15rem", type="status", href, children}:ButtonProps) => {
    const linkClassNames = classNames(
    `flex justify-center focus:ring-4 px-5 py-2.5 me-2 mb-2 flex font-medium rounded-lg text-sm focus:outline-none w-[${width}]`,
    {
        [statusClassName]: type === "status",
        [errorClassName]: type === "error",
        [greenClassName]: type === "green"
    }, classes);
    return (
        <div className='w-full mb-6 md:mb-0'>
            {href ? <Link className={`${linkClassNames}`} href={href || ""} onClick={onClick}>{children}</Link> : <button className={`${linkClassNames}`} onClick={onClick}>{children}</button>}
        </div>   
    );
};


export default ButtonLink;

