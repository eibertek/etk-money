import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons';

import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, MAX_LENGTH } from '@/components/shared/constants';
import { Context, useContext } from "react";
import { FormPropsContext } from "../form";

interface InputProps {
    field: string;
    options: {id:string, label?:string}[];
    error?: any;
    values?: any;
    validationRules?: {
        [ALLOW_EMPTY]: boolean,
        [MAX_LENGTH]: number
    };  
};

export const Component = ({ field,  options }:InputProps) => {
    const {error, values}:any = useContext(FormPropsContext as Context<unknown>);
    const validation = (value:string) => {};
    const items = options.map(({ id, label}, index) => <option key={`${field}_option_${id}_${index}`} value={id}>{label}</option>)
    return (
        <Field name={field} validate={validation}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                <FormLabel style={{ textTransform: "capitalize"}}>{field}</FormLabel>
                <Select name={field} icon={<ArrowDownIcon />} placeholder="Select from the list" value={values && values[field]} onChange={fieldProps.onChange}>{items}</Select>
                {error && error[field] && <Box color="tomato" >{error[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;

