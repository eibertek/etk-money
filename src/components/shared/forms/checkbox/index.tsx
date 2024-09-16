import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Checkbox } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, MAX_LENGTH } from '@/components/shared/constants';
import { Context, useContext } from "react";
import { FormPropsContext } from "../form";

interface InputProps {
    field: string;
    error?: any;
    values?: any;
    validationRules?: {
        [ALLOW_EMPTY]: boolean,
        [MAX_LENGTH]: number
    };  
};

export const Component = ({ field }:InputProps) => {
    const {error, values}:any = useContext(FormPropsContext as Context<unknown>);
    const validation = (value:string) => {};
    
    return (
        <Field name={field} validate={validation}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                <FormLabel style={{ textTransform: "capitalize"}}>{field}</FormLabel>
                <Checkbox {...fieldProps} />
                {error && error[field] && <Box color="tomato" >{error[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;

