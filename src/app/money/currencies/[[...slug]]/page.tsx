"use client";
import NewMove from "@/components/currencies/new";
import ManageMove from "@/components/currencies/manage";
import Link from "next/link";

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";
interface IMovePageProps {
    params: { slug: string[] | string };
    searchParams: { [key: string]: string | string[] | undefined }
};

export default function MoneyPage(props: IMovePageProps) {
    const slug = props.params?.slug || []; 
    const isOpen = { new: slug.includes('new') || false, manage: slug.includes('manage') || false, bulk: slug.includes('bulk') || false };

    return (
        <main className="flex min-h-screen flex-col items-center px-24">
            <section className="w-full text-center">
                <div><Link href={"/money/"}>{`<-`} Back to Dashboard</Link></div>
                <h2 className="text-5xl py-5 text-center">Currencies</h2>
                <div className="flex flex-row">
                    <div className="mx-4">
                        {isOpen.new && <NewMove />}
                        {isOpen.manage && <ManageMove />}
                    </div>
                </div>
            </section>
        </main>
    );
}

