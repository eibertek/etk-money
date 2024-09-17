import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY, FIELD_MAX_LENGTH, MAX_LENGTH, MIN_LENGTH } from '@/components/shared/constants';
import { Context, useContext } from "react";
import { FormPropsContext } from "../form";

interface InputProps {
    field: string;
    type?: string;
    noLabel: boolean;
    validationRules?: {
        [ALLOW_EMPTY]?: boolean,
        [MAX_LENGTH]?: number,
    };  
};

export const Component = ({ field, type='text', noLabel=false, validationRules = { [ALLOW_EMPTY]:true, [MAX_LENGTH]:2000 } }:InputProps) => {
    const {errors, values}:any = useContext(FormPropsContext as Context<unknown>);
    console.log(errors, values);

    const validation = (value:string) => {
        if(!validationRules[ALLOW_EMPTY] && (!value || value === "")) {
            return FIELD_EMPTY;
        };
        if(validationRules[MAX_LENGTH] && value && value.length > validationRules[MAX_LENGTH]) {
            return FIELD_MAX_LENGTH;
        }
    };
    
    return (
        <Field name={field} validate={validation}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                {!noLabel && <FormLabel style={{ textTransform: "capitalize"}}>{field}</FormLabel>}
                <Input {...fieldProps} type={type} value={values[field]} />
                {errors && errors[field] && <Box color="tomato" >{errors[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;

