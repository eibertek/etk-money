import Input from '@/components/shared/forms/input';
import Range from '@/components/shared/forms/range';
import Checkbox from '@/components/shared/forms/checkbox';
import Dropdown from '@/components/shared/forms/dropdown';
import DateComponent from '@/components/shared/forms/date';
import DateRange from '@/components/shared/forms/dateRange';
import type { Meta, StoryObj } from '@storybook/react';

import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react'
import { ALLOW_EMPTY, MAX_LENGTH, MIN_LENGTH, MIN_MAX } from '@/components/shared/constants';
import FormComponent from '@/components/shared/forms/form';

const clientOptions = [
  { id: '1234-2323-2323', label: 'client 1' },
  { id: '1234-2323-2324', label: 'client 2' },
  { id: '1234-2323-2325', label: 'client 3' },
  { id: '1234-2323-2326', label: 'client 4' },
  { id: '1234-2323-2327', label: 'client 5' },
];
const StoryComponent = (storyProps: any) => {
  return (
    <ChakraProvider>
      <Box p={5} textAlign={'center'}>Form Story</Box>
      <FormComponent 
        initialValues={storyProps.initialValues}
        onSubmit={(values) => { console.log(values) }}
      >
        <Input  field='Description' validationRules={storyProps.validationRules['description']} />
        <Range  field='income' validationRules={storyProps.validationRules['income']} />
        <Range  field='outcome' validationRules={storyProps.validationRules['outcome']} />
        <DateComponent  field='date' validationRules={storyProps.validationRules['date']} />
        <DateRange  field='date_range' />
        <Checkbox  field='see_all' validationRules={storyProps.validationRules['see_all']} />
        <Dropdown field='client' options={clientOptions} />        
      </FormComponent>
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
    initialValues: {
      description: "",
      income_from: 0,
      income_to: 0,
      date: new Date(),
      date_range_from: new Date("09/11/2024"),
      date_range_to: new Date("09/21/2024"),
    },
    validationRules: {
      description: {
        [ALLOW_EMPTY]: false,
        [MAX_LENGTH]: 30,
      },
      income: {
        [MIN_MAX]: true,
        [MIN_LENGTH]: 0,
        [MAX_LENGTH]: 2000
      },
      outcome: {
        [MIN_MAX]: true,
        [MIN_LENGTH]: 0,
        [MAX_LENGTH]: 2000
      },
      date: {
        [ALLOW_EMPTY]: false,
      },
    }
  }
};
