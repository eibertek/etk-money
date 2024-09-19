"use client";
import NewClient from "@/components/client/new";
import ManageClient from "@/components/client/manage";
import Link from "next/link";
import { useContext, useEffect, useMemo } from "react";
import TitleContext from "@/components/hooks/nameContext";
import { Box, Button } from "@chakra-ui/react";

const btnClassName = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15rem]";
interface IClientPageProps {
    params: { slug: string[] | string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function ClientPage(props: IClientPageProps) {
    const slug = useMemo(()=>props.params?.slug || [], [props]);
    const isOpen = { new: slug.includes('new') || false, manage: slug.includes('manage') || false };
    const { setTitle } = useContext(TitleContext);

    useEffect(() => {
        setTitle(`${slug} Account`);
    }, [setTitle, slug]);
    return (
        <section className="w-full text-center pt-8">
            <Button colorScheme="blue"><Link href={"/money/"}>{`<-`} Back to Dashboard</Link></Button>
            <div className="flex flex-row">
                <div className="mx-4">
                    {isOpen.new && <NewClient />}
                    {isOpen.manage && <ManageClient />}
                </div>
            </div>
        </section>
    );
}

