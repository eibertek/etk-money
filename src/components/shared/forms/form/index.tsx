import { Children, cloneElement, ReactNode } from "react";
import { Form, Formik } from 'formik';
import { Box, Button } from "@chakra-ui/react";



interface IFormProps {
    children: string | JSX.Element | JSX.Element[];
    initialValues: any;
    onSubmit: (values: any) => void;
}

const FormComponent = ({ initialValues, children, onSubmit, ...props }: IFormProps) => {
    return (
        <Box p={4}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {(props: { errors: any; values: any }) => {
                    console.log(props);
                    return (
                        <Form>
                            {Children.map(children, (child: ReactNode) => child && cloneElement(child, {
                                injectedProp: {
                                    error: props.errors,
                                    values: props.values,
                                }
                            })
                            )}
                            <Button type="submit" mt={4}>Submit</Button>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    );
};

export default FormComponent;