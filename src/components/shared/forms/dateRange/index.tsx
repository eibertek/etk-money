import { Field, FieldProps } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ALLOW_EMPTY, FIELD_EMPTY } from '@/components/shared/constants';
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { Context, useContext, useState } from "react";
import { FormPropsContext } from "../form";

interface IDateRangeProps {
    field: string;
    type?: string;
    error?: any;
    values?: any;
    validationRules?: {
        [ALLOW_EMPTY]: boolean,
    };
};

export const Component = ({ field }: IDateRangeProps) => {
    const {error, values}:any = useContext(FormPropsContext as Context<unknown>);
    const fieldFrom = `${field}_from`;
    const fieldTo = `${field}_to`;
    const valueFrom = values && values[fieldFrom] || new Date();
    const valueTo = values && values[fieldTo] || new Date();
    const [selectedDates, setSelectedDates] = useState<Date[]>([valueFrom, valueTo]);

    const validation = () => {};

    return (
        <Field name={field} validate={validation}>
            {({ field: fieldProps }: FieldProps) => (
                <FormControl>
                    <FormLabel style={{ textTransform: "capitalize" }}>{field}</FormLabel>
                    <RangeDatepicker
                        closeOnSelect={true}
                        selectedDates={selectedDates}
                        onDateChange={async (dates)=>{
                            setSelectedDates(dates);
                            fieldProps.onChange({target:{ type:'button', name:fieldFrom, value: dates[0]}});
                            fieldProps.onChange({target:{ type:'button', name:fieldTo, value: dates[1]}});
                        }}
                    />
                    {error && error[field] && <Box color="tomato" >{error[field]}</Box>}
                </FormControl>
            )}
        </Field>
    );
};


export default Component;

