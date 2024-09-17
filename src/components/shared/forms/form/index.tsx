import { Form, Formik } from 'formik';
import { Box, Button } from "@chakra-ui/react";
import { createContext } from "react";



interface IFormProps {
    children: string | JSX.Element | JSX.Element[];
    initialValues: any;
    onSubmit?: (values: any, actions: any) => void;
}

export const FormPropsContext = createContext({ errors: {}, values: {} });

const FormComponent = ({ initialValues, children, onSubmit }: IFormProps) => {
    return (
        <Box p={4}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit || ((values) => {console.log("ASAAA", values)})}
            >
            {({ errors, values }: { errors: any; values: any }) => (
                <FormPropsContext.Provider value={{ errors, values }}>
                    <Form>
                        {children}
                        {onSubmit && <Button type="submit" mt={4}>Submit</Button>}
                    </Form>
                </FormPropsContext.Provider>
            )}
        </Formik>
        </Box >
    );
};

export default FormComponent;