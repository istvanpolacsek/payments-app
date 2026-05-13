import type { Meta, StoryObj } from '@storybook/nextjs';

import StatusBadge from './StatusBadge';
import { expect } from 'storybook/test';
import { capitalize } from 'lodash';

const meta = {
  component: StatusBadge,
  title: 'UI/Components/Status Badge',
  parameters: { layout: 'centered' },
  play: async ({ args, canvas }) => {
    const { status } = args;
    const badge = canvas.getByText(capitalize(status ?? ''));

    await expect(badge).toBeInTheDocument();
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'CREATED',
  },
};

export const Failed: Story = {
  args: {
    status: 'FAILED',
  },
};

export const Completed: Story = {
  args: {
    status: 'COMPLETED',
  },
};
