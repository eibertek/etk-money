import { ErrorMessage, Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

interface InputProps {
    field: string;
    value: string;
    type?: string;
    error?: any;
    validation?: ()=>{};
};

export const Component = ({ field, type='text', validation, error, ...props}:InputProps) => {
    return (
        <Field name={field} validate={validation}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                <FormLabel>{field}</FormLabel>
                <Input {...fieldProps} type={type} />
                {error && error[field] && <Box color="tomato" >{error[field]}</Box> }
            </FormControl>
        )}
    </Field>
    );
};


export default Component;

