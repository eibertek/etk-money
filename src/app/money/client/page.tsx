"use client";

import { useState } from "react";
import NewClient from "@/components/client/new";
import ManageClient from "@/components/client/manage";
import Link from "next/link";

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";

export default function ClientPage(props: any) {
    const [isOpen, setOpen] = useState({ new: false, manage: false });

    return (
        <main className="flex min-h-screen flex-col items-center px-24">
            <section className="w-full text-center">
                <div><Link href={"/money/"}>{`<-`} Back to Dashboard</Link></div>
                <h2 className="text-5xl py-5 text-center">Control Panel</h2>
                <div className="flex flex-row">
                    <div className="flex-col flex border p-5 border-spacing-4 border-blue-300">
                        <h3 className="text-4xl pb-4">Client</h3>
                        <div><button className={btnClassName} onClick={() => setOpen({ manage: false, new: !isOpen.new })}>New</button></div>
                        <div><button className={btnClassName} onClick={() => setOpen({ manage: !isOpen.manage, new: false })}>Manage</button></div>
                    </div>
                    <div className="mx-4">
                        {isOpen.new && <NewClient />}
                        {isOpen.manage && <ManageClient />}
                    </div>
                </div>
            </section>
        </main>
    );
}

