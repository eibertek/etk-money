import { Button, Flex } from "@chakra-ui/react";
import { storageHook } from "../hooks/Storage";
import crypto from "crypto";
import FilterComponent, { IFilterProps } from "./filters";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import Chart from "@/components/charts/chart";

const ChartsComponent = () => {
    const moves = storageHook('move').getAll();
    const charts = storageHook('chart').getAll() || [];
    const { isOpen, onOpen, onClose } = useDisclosure();

    const saveChart = (values: { [name: string]: any; }) => {
        const hmacId = crypto.createHmac('sha256', `${values.chart}_${values.title}`);
        storageHook('chart').create({ ...values, id: hmacId.digest('hex') });
        onClose();
    };

    return (
        <>
            <Button type="button" width="100px" my={4} onClick={() => onOpen()}>New Chart</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Chart</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FilterComponent setModalOpen={onClose} onSubmit={saveChart} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Flex direction={"row"} margin={4} gap={5} justifyContent={"center"}>
                {charts && charts.map((item: IFilterProps, index: number) => (
                    <Chart key={`key_chart_${item.title}`} moves={moves} filters={item} />
                ))}
            </Flex>
        </>
    );
};
export default ChartsComponent;