import { Field, FieldProps } from "formik";
import { Checkbox, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY, MAX_LENGTH } from '@/components/shared/constants';
import { Context, useContext, useEffect, useState } from "react";
import { FormPropsContext } from "../form";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface InputProps {
    field: string;
    options: { id: string, label?: string }[];
    noLabel?: boolean;
    validationRules?: {
        [ALLOW_EMPTY]?: boolean,
        [MAX_LENGTH]?: number
    };
};

type TargetProps = {
    target: {
        name: string;
        checked: boolean;    
    }
};

export const MultselectComponent = ({ options, save}: {options:any[], save: (values:string[])=>void}) => {
    const optionsObject = options.reduce((acc, item) => {
        acc[item.id]=false; 
        return acc;
    }, {});
    const [values, setValues] = useState(optionsObject);    
    const valuesOn = Object.entries(values).filter(it => it[1]);
    const buttonText = valuesOn.length > 0 ? valuesOn.map(it=>{
        return options.filter(it2=>it[0]===it2.id)[0].label;
    }).join(",") : "Select options"; 
    const onChange = ({ target: {name, checked}}:TargetProps) => {        
        const newValues = {...values, [name]: checked};
        setValues(newValues);
    };

    const saveToParent = () => {
        save(Object.entries(values).filter(it => it[1]).map(it=>it[0]));
    };

    return (
        <Menu closeOnSelect={false}  onClose={saveToParent}>
            {({ isOpen }) => (
                <>
                    <MenuButton>
                        <Flex><Box width={"300px"} textAlign={"justify"}>{isOpen ? "Select Items" : `${buttonText}`}</Box> {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Flex>
                    </MenuButton>
                    <MenuList maxHeight="15rem" overflowY="scroll">
                        {options.map((item, index) => (
                            <MenuItem key={`item_${item}_${index}`}><Checkbox name={item.id} checked={values[item.id]} onChange={onChange} >{item.label}</Checkbox></MenuItem>
                        ))}
                    </MenuList>
                </>
            )}
        </Menu>
    );
}
export const Component = ({ field, options, noLabel = false }: InputProps) => {
    const { errors, values }: any = useContext(FormPropsContext as Context<unknown>);
    
    return (
        <Field name={field}>
            {({ form }: FieldProps) => (
                <FormControl>
                    {!noLabel && <FormLabel style={{ textTransform: "capitalize" }}>{field}</FormLabel>}
                    <MultselectComponent options={options} save={(values)=>{form.setFieldValue(field, values)}} />
                    {errors && errors[field] && <Box color="tomato" >{errors[field]}</Box>}
                </FormControl>
            )}
        </Field>
    );
};


export default Component;

