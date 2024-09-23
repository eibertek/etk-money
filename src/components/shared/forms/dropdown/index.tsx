import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons';

import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY, MAX_LENGTH } from '@/components/shared/constants';
import { Context, useContext, useEffect } from "react";
import { FormPropsContext } from "../form";

interface InputProps {
    field: string;
    key?: string;
    options: {id:string, label?:string}[];
    noLabel?: boolean;
    validationRules?: {
        [ALLOW_EMPTY]?: boolean,
        [MAX_LENGTH]?: number
    };  
};

export const Component = ({ field, options, noLabel=false, validationRules = { [ALLOW_EMPTY]:true} }:InputProps) => {
    const {errors, values}:any = useContext(FormPropsContext as Context<unknown>);
   
    const validation = (value:string) => {
        if(!validationRules[ALLOW_EMPTY] && (!value || value === "")) {
            return FIELD_EMPTY;
        };
    };
    const items = options.map(({ id, label}, index) => <option key={`${field}_option_${id}_${index}`} value={id}>{label}</option>)
    return (
        <Field name={field} validate={validation}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                {!noLabel && <FormLabel style={{ textTransform: "capitalize"}}>{field}</FormLabel>}
                <Select name={field} icon={<ArrowDownIcon />} placeholder="Select from the list" value={values && values[field]} onChange={fieldProps.onChange}>{items}</Select>
                {errors && errors[field] && <Box color="tomato" >{errors[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;

