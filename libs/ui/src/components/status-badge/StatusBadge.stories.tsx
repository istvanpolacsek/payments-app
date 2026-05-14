import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import StatusBadge from './StatusBadge';
import { expect } from 'storybook/test';
import { capitalize, lowerCase } from 'lodash';
import styles from './StatusBadge.module.scss';

const meta = {
  component: StatusBadge,
  title: 'UI/Components/Status Badge',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const playStatusBadgeStory: Story['play'] = async ({ args, canvas }) => {
  const status = args.status ?? 'CREATED';
  const badge = canvas.getByText(capitalize(status));

  await expect(badge).toBeInTheDocument();
  await expect(badge.className).toContain(styles.base);
  await expect(badge.className).toContain(styles[lowerCase(status)]);
  await expect(badge).toHaveTextContent(capitalize(status));
};

export const Default: Story = {
  args: {
    status: 'CREATED',
  },
  play: playStatusBadgeStory,
};

export const Failed: Story = {
  args: {
    status: 'FAILED',
  },
  play: playStatusBadgeStory,
};

export const Completed: Story = {
  args: {
    status: 'COMPLETED',
  },
  play: playStatusBadgeStory,
};
