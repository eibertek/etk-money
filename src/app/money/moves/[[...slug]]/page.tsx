"use client";
import NewMove from "@/components/move/new";
import ManageMove from "@/components/move/manage";
import BulkNew from "@/components/move/bulkNew";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import TitleContext from "@/components/hooks/nameContext";

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";
interface IMovePageProps {
    params: { slug: string[] | string };
    searchParams: { [key: string]: string | string[] | undefined }
};

export default function MoneyPage(props: IMovePageProps) {
    const slug = props.params?.slug || [];
    const isOpen = { new: slug.includes('new') || false, manage: slug.includes('manage') || false, bulk: slug.includes('bulk') || false };
    const { setTitle } = useContext(TitleContext);

    useEffect(() => {
        setTitle(`${slug} Moves`);
    }, []);

    return (
        <section className="w-full text-center pt-8">
            <Button colorScheme="blue"><Link href={"/money/"}>{`<-`} Back to Dashboard</Link></Button>
            <div className="flex flex-row">
                <div className="mx-4">
                    {isOpen.new && <NewMove />}
                    {isOpen.manage && <ManageMove />}
                    {isOpen.bulk && <BulkNew />}
                </div>
            </div>
        </section>
    );
}

