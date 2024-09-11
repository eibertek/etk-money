import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY, FIELD_MAX_LENGTH, MAX_LENGTH } from '@/components/shared/constants';

interface InputProps {
    field: string;
    type?: string;
    error?: any;
    values?: any;
    validationRules?: {
        [ALLOW_EMPTY]: boolean,
        [MAX_LENGTH]: number
    };  
};

export const Component = ({ field, type='text', error, validationRules = { [ALLOW_EMPTY]:true, [MAX_LENGTH]:2000 } }:InputProps) => {
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
                <FormLabel style={{ textTransform: "capitalize"}}>{field}</FormLabel>
                <Input {...fieldProps} type={type} />
                {error && error[field] && <Box color="tomato" >{error[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;
