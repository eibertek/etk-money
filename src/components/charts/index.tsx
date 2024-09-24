import { Box, Button, Card, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { storageHook } from "../hooks/Storage";
import FilterComponent from "./filters";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

const ChartsComponent = () => {
    const moves = storageHook('move').getAll();
    const charts = storageHook('chart').getAll() || [];
    const { isOpen, onOpen, onClose } = useDisclosure();

    const saveChart = (values: { [name: string]: any; id: string; }) => {
        storageHook('chart').create(values);
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
            <Flex direction={"row"} margin={4} gap={4}>
                {charts.map((item:any, index:number) => (
                    <Card key={`key_chart_${index}`} padding={2}>
                        <SkeletonCircle margin={2}></SkeletonCircle>
                        <SkeletonText width={'200px'} noOfLines={4} spacing={4} skeletonHeight='2'></SkeletonText>
                    </Card>
                ))}
            </Flex>
        </>
    );
};
export default ChartsComponent;