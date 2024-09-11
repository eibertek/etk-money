import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { FIELD_MAX_LENGTH, FIELD_RANGE_ERROR, MAX_LENGTH, MIN_LENGTH, MIN_MAX } from '@/components/shared/constants';

interface InputProps {
    field: string;
    error?: any;
    values?: any;
    validationRules?: {
        [MIN_MAX]?: boolean,
        [MAX_LENGTH]?: number,
        [MIN_LENGTH]?: number
    };  
};

export const Component = ({ field, error, values, validationRules={[MIN_MAX]: true, [MAX_LENGTH]: 2000000} }: InputProps) => {
    const fieldFrom = `${field}_from`;
    const fieldTo = `${field}_to`;
    const validation = (value:number, f: string) => {
        if(validationRules[MIN_MAX]) {
           if(values[fieldFrom] && values[fieldTo] && values[fieldFrom]>values[fieldTo]) {
               return FIELD_RANGE_ERROR;
           }
        };
        if(validationRules[MAX_LENGTH] && f === fieldTo && value > validationRules[MAX_LENGTH]) {
            return FIELD_MAX_LENGTH;
        }
    };

    return (
        <Box>
            <Box fontWeight={'var(--chakra-fontWeights-medium)'} style={{ textTransform: "capitalize" }}>{field}</Box>
            <Box display={'flex'} gap={6} flexDirection={'row'}>
                <Field name={fieldFrom} validate={(value: number) => validation(value, fieldFrom)}>
                    {({ field: fieldProps }: FieldProps) => (
                        <FormControl>
                            <FormLabel style={{ textTransform: "capitalize" }}>from</FormLabel>
                            <Input {...fieldProps} type={'number'} />
                            {error && error[fieldFrom] && <Box color="tomato" >{error[fieldFrom]}</Box>}
                        </FormControl>
                    )}
                </Field>
                <Field name={fieldTo} validate={(value: number) => validation(value, fieldTo)}>
                    {({ field: fieldProps }: FieldProps) => (
                        <FormControl>
                            <FormLabel style={{ textTransform: "capitalize" }}>to</FormLabel>
                            <Input {...fieldProps} type={'number'} />
                            {error && error[fieldTo] && <Box color="tomato" >{error[fieldTo]}</Box>}
                        </FormControl>
                    )}
                </Field>
            </Box>
        </Box>
    );
};


export default Component;

