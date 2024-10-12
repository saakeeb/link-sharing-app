// DropDownSelect.stories.tsx

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import DropDownSelect, { DropDownSelectProps } from './dropdown-box';

export default {
  title: 'Components/DropDownSelect',
  component: DropDownSelect,
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    isClearable: { control: 'boolean' },
    isMulti: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<DropDownSelectProps> = (args) => (
  <DropDownSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  placeholder: 'Select an option...',
  isClearable: true,
  isMulti: false,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  isMulti: true,
};
