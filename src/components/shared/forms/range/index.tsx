import { ErrorMessage, Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface InputProps {
    field: string;
    value: string;
    type?: string;
    onChange: (name: string, value: string)=>void;
};

export const Component = ({ field, type='text', value, onChange}:InputProps) => {
    return (
        <Field name="client" validate={()=>{}}>
        {({ field: fieldProps }: FieldProps) => (
            <FormControl>
                <FormLabel>{field}</FormLabel>
                <Input {...fieldProps} type={type} />
                <ErrorMessage {...fieldProps} render={(msg) => <div className='text-red-500'>{msg}</div>} />
            </FormControl>
        )}
    </Field>
    );
};


export default Component;

