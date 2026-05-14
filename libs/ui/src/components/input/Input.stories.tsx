import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Input from './Input';

const meta = {
  component: Input,
  title: 'UI/Components/Input',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'name',
    label: 'Input label',
    placeholder: 'Enter Text',
  },
};

export const Required: Story = {
  args: {
    name: 'name',
    label: 'Input label',
    placeholder: 'Enter Text',
    required: true,
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    name: 'name',
    label: 'Input label',
    placeholder: 'Enter value',
    step: '0.01',
  },
};
