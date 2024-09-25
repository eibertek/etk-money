import Multiselect from '@/components/shared/forms/multiselect';
import type { Meta, StoryObj } from '@storybook/react';

import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react'
import FormComponent from '@/components/shared/forms/form';

const clientOptions = [
  { id: '1234-2323-2323', label: 'client 1' },
  { id: '1234-2323-2324', label: 'client 2' },
  { id: '1234-2323-2325', label: 'client 3' },
  { id: '1234-2323-2326', label: 'client 4' },
  { id: '1234-2323-2327', label: 'client 5' },
  { id: '1234-2323-2328', label: 'client 6' },
  { id: '1234-2323-2329', label: 'client 7' },
  { id: '1234-2323-2330', label: 'client 8' },
  { id: '1234-2323-2331', label: 'client 9' },
  { id: '1234-2323-2332', label: 'client 10' },
  { id: '1234-2323-2333', label: 'client 11' },
  { id: '1234-2323-2334', label: 'client 12' },
  { id: '1234-2323-2335', label: 'client 13' },
  { id: '1234-2323-2336', label: 'client 14' },
  { id: '1234-2323-2337', label: 'client 15' },
  { id: '1234-2323-2338', label: 'client 16' },
  { id: '1234-2323-2339', label: 'client 17' },
  { id: '1234-2323-2339', label: 'client 18' },
];

const currencies = [
  {id:"Ars", label:"Ars"},
  {id:"u$d", label:"American Dollars"},
  {id:"JPN", label:"Japan Yens"},
];
const StoryComponent = (storyProps: any) => {
  return (
    <ChakraProvider>
      <Box p={5} textAlign={'center'}>Form Story</Box>
      <FormComponent 
        initialValues={storyProps.initialValues}
        onSubmit={(values) => { console.log(values) }}
      >
        <Multiselect field='clients' options={clientOptions} />        
        <Multiselect field='currency' options={currencies} />        
      </FormComponent>
    </ChakraProvider>
  );
}

const meta = {
  title: 'Components/Form/Multiselect',
  component: StoryComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiselectStory: Story = {
  args: {
    initialValues: {
      clients: [],
    },
  }
};
