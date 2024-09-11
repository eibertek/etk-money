import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY } from '@/components/shared/constants';
import { SingleDatepicker } from "chakra-dayzed-datepicker";

interface InputProps {
    field: string;
    type?: string;
    error?: any;
    values?: any;
    validationRules?: {
        [ALLOW_EMPTY]: boolean,
    };
};

export const Component = ({ field, type = 'Date', error, validationRules = { [ALLOW_EMPTY]: true } }: InputProps) => {

    const validation = (value: string) => {
        if (!validationRules[ALLOW_EMPTY] && (!value || value === "")) {
            return FIELD_EMPTY;
        };
    };

    return (
        <Field name={field} validate={validation}>
            {({ field: fieldProps }: FieldProps) => (
                <FormControl>
                    <FormLabel style={{ textTransform: "capitalize" }}>{field}</FormLabel>
                    <SingleDatepicker
                        name={field}
                        date={fieldProps.value}
                        onDateChange={(value)=>{
                            fieldProps.onChange({target:{ type:'button', name:field, value}});
                        }}
                    />
                    {error && error[field] && <Box color="tomato" >{error[field]}</Box>}
                </FormControl>
            )}
        </Field>
    );
};


export default Component;

