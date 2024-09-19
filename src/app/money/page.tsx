"use client";
import { useContext, useEffect, useState } from "react";
import Demo from "@/components/demo";
import Chart from "@/components/charts";
import { storageHook } from "@/components/hooks/Storage";
import storageFixtures from "@/components/demo/fixtures";
import BulkNew from "@/components/move/bulkNew";
import ButtonLink from "@/components/shared/button/LinkButton";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import NewClient from "@/components/client/new";
import TitleContext from "@/components/hooks/nameContext";

export default function MoneyPage(props: any) {
    const isSavings: boolean = process.env.FEATURE_SAVINGS === 'true' || false;
    const isDemo: boolean = process.env.DEMO === 'true' || false;
    const [currencies, setCurrencies] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setTitle } = useContext(TitleContext);

    useEffect(() => {
        setTitle("Dashboard");
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
    }, [setTitle]);

    const buildCurrencies = () => {
        storageHook('currencies').clearAll();
        storageFixtures.currencies?.map(entity => {
            storageHook('currencies').create(entity);
        });
        const currencies = storageHook('currencies').getAll();
        setCurrencies(currencies);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Client</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NewClient setModalOpen={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <section className="w-full text-center pt-8">
                <section className="w-full text-center">
                    {<Chart />}
                </section>
                <div className="flex flex-row justify-start">
                    <div className="flex-col flex p-5">
                        <div><ButtonLink type="green" href={"/money/client/new"}>New Account</ButtonLink></div>
                        <div><ButtonLink type="green" href={"/money/client/manage"}>Manage Accounts</ButtonLink></div>
                        {isSavings && <div className="flex-col flex p-5 border border-spacing-4 border-blue-300">
                            <div><ButtonLink type="green">New</ButtonLink></div>
                            <div><ButtonLink type="green">Manage</ButtonLink></div>
                        </div>}
                        <div><ButtonLink type="green" href={"/money/moves/new"}>New Move</ButtonLink></div>
                        <div><ButtonLink type="green" href={"/money/moves/manage"}>Manage Moves</ButtonLink></div>
                    </div>
                    <div className="flex-col flex pt-5"><BulkNew setModalOpen={onOpen} /></div>
                </div>
            </section>
            <section className="w-full text-center">
                {isDemo && <Demo />}
                <div>
                    {!currencies.length && <div
                        className="bg-red-400 border w-full self-center border-red-900 text-black px-4">
                        No Currencies defined Please <ButtonLink type="error" onClick={() => buildCurrencies()} width="full">Rebuild currencies</ButtonLink>
                    </div>}
                </div>
            </section>
        </>
    );
}

