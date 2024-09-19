"use client";
import NewMove from "@/components/move/new";
import ManageMove from "@/components/move/manage";
import BulkNew from "@/components/move/bulkNew";
import Link from "next/link";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from "react";
import TitleContext from "@/components/hooks/nameContext";
import FilterComponent from "@/components/shared/filters";

interface IMovePageProps {
    params: { slug: string[] | string };
    searchParams: { [key: string]: string | string[] | undefined }
};

export default function MoneyPage(props: IMovePageProps) {
    const slug = useMemo(()=>props.params?.slug || [], [props]);
    const isOptionOpen = { new: slug.includes('new') || false, manage: slug.includes('manage') || false, bulk: slug.includes('bulk') || false };
    const { setTitle } = useContext(TitleContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ filters, setFilters ] = useState({});
    useEffect(() => {
        setTitle(`${slug} Moves`);
    }, [setTitle, slug]);

    const onFilterSubmit = (values: any) => {
        setFilters(values)
        onClose();
    };
    return (
        <section className="w-full text-center pt-8">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Client</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FilterComponent setModalOpen={onClose} onSubmit={onFilterSubmit} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button colorScheme="blue"><Link href={"/money/"}>{`<-`} Back to Dashboard</Link></Button>
            <div className="flex flex-row">
                <div className="mx-4">
                    {isOptionOpen.new && <NewMove />}
                    {isOptionOpen.manage && <ManageMove setModalOpen={onOpen} filters={filters} />}
                    {isOptionOpen.bulk && <BulkNew />}
                </div>
            </div>
        </section>
    );
}

