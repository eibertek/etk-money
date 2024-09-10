import Input from '@/components/shared/forms/input';
import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import {
  ChakraProvider,
  Button,
  Box,
} from '@chakra-ui/react'

const StoryComponent = (storyProps: any) => {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={() => { }}
        >
          {(props: { errors: any; }) => {
            return (
              <Form>
                <Input error={props.errors} {...storyProps} />
                <Button type="submit" mt={4}>Submit</Button>
              </Form>
            )
          }}
        </Formik>
      </Box>
    </ChakraProvider>
  );
}

const meta = {
  title: 'Components/Filters/Input',
  component: StoryComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {
  args: {
    field: 'name',
    type: 'text',
    validation: (value: string) => {
      return value === "" && "El mensaje esta mal";
    },
  }
};
