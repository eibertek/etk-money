import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY } from '@/components/shared/constants';
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";

interface InputProps {
    field: string;
    type?: string;
    error?: any;
    values?: any;
    validationRules?: {
        [ALLOW_EMPTY]: boolean,
    };
};

export const Component = ({ field, type = 'Date', error, validationRules = { [ALLOW_EMPTY]: true }, values }: InputProps) => {
    const fieldFrom = `${field}_from`;
    const fieldTo = `${field}_to`;
    const valueFrom = values[fieldFrom] || new Date();
    const valueTo = values[fieldFrom] || new Date();
    const [selectedDates, setSelectedDates] = useState<Date[]>([valueFrom, valueTo]);

    const validation = (value: string) => {};
    

    return (
        <Field name={field} validate={validation}>
            {({ field: fieldProps }: FieldProps) => (
                <FormControl>
                    <FormLabel style={{ textTransform: "capitalize" }}>{field}</FormLabel>
                    <RangeDatepicker
                        closeOnSelect={true}
                        selectedDates={selectedDates}
                        onDateChange={([dateFrom, dateTo])=>{
                            setSelectedDates([dateFrom, dateTo]);
                            fieldProps.onChange({target:{ type:'button', name:fieldFrom, value: dateFrom}});
                            fieldProps.onChange({target:{ type:'button', name:fieldTo, value: dateTo}});
                        }}
                    />
                    {error && error[field] && <Box color="tomato" >{error[field]}</Box>}
                </FormControl>
            )}
        </Field>
    );
};


export default Component;

