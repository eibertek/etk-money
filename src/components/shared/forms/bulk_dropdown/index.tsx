import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons';

import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY, MAX_LENGTH } from '@/components/shared/constants';
import { Context, useContext, useEffect } from "react";
import { FormPropsContext } from "../form";

interface InputProps {
    field: string;
    options: {id:string, label?:string}[];
    noLabel?: boolean;
    destiny?: string;
    rowNum?: number;
    validationRules?: {
        [ALLOW_EMPTY]?: boolean,
        [MAX_LENGTH]?: number
    };  
};

export const Component = ({ field, options, noLabel=false, validationRules = { [ALLOW_EMPTY]:true}, destiny, rowNum=0 }:InputProps) => {
    const {errors, values, setValues}:any = useContext(FormPropsContext as Context<unknown>);
   
    const validation = (value:string) => {
        if(!validationRules[ALLOW_EMPTY] && (!value || value === "")) {
            return FIELD_EMPTY;
        };
    };
    const items = options.map(({ id, label}, index) => <option key={`${field}_option_${id}_${index}`} value={id}>{label}</option>)
    const handleOnChange = (opts: any, onChangeFn: any) => {
        const newFieldsValues = {...values};
        for (let c = 0; c < rowNum; c++) {
            newFieldsValues[`${c}_${destiny}`]= opts?.target.value;
        }
        setValues(newFieldsValues);
        onChangeFn(opts);
    };

    return (
        <Field name={field} validate={validation}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                {!noLabel && <FormLabel style={{ textTransform: "capitalize"}}>{field.replace("_", " ")}</FormLabel>}
                <Select name={field} icon={<ArrowDownIcon />} placeholder="Select from the list" value={values && values[field]} onChange={(opts)=>handleOnChange(opts, fieldProps.onChange)}>{items}</Select>
                {errors && errors[field] && <Box color="tomato" >{errors[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;
