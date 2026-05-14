import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button, { COLORS, VARIANTS } from './Button';
import { expect, fn } from 'storybook/test';

const onClick = fn();

const meta = {
  component: Button,
  title: 'UI/Components/Button',
  args: { children: 'Button label', onClick },
  argTypes: {
    variant: { control: 'radio', options: VARIANTS },
    color: { control: 'radio', options: COLORS },
  },
  parameters: { layout: 'centered' },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(onClick).toHaveBeenCalled();
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledPrimary: Story = {
  args: {
    color: 'primary',
    variant: 'filled',
  },
};

export const FilledSecondary: Story = {
  args: {
    color: 'secondary',
    variant: 'filled',
  },
};

export const FilledDanger: Story = {
  args: {
    color: 'danger',
    variant: 'filled',
  },
};

export const OutlinedPrimary: Story = {
  args: {
    color: 'primary',
    variant: 'outlined',
  },
};

export const GhostPrimary: Story = {
  args: {
    color: 'primary',
    variant: 'ghost',
  },
};
