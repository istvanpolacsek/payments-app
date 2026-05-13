import type { Meta, StoryObj } from '@storybook/nextjs';

import PaymentsTable from './PaymentsTable';
import { mockPayments, createPayments, createPaymentsByStatus } from '../../mocks/fixtures';

const meta = {
  component: PaymentsTable,
  title: 'UI/Components/Payments Table',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PaymentsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    items: mockPayments.empty,
  },
};

export const Single: Story = {
  args: {
    items: mockPayments.single,
  },
};

export const Mixed: Story = {
  args: {
    items: mockPayments.mixed,
  },
};

export const AllCompleted: Story = {
  args: {
    items: mockPayments.allCompleted,
  },
};

export const AllFailed: Story = {
  args: {
    items: mockPayments.allFailed,
  },
};

export const Many: Story = {
  args: {
    items: createPayments(10),
  },
};

export const CustomStatuses: Story = {
  args: {
    items: createPaymentsByStatus(['COMPLETED', 'CREATED', 'FAILED', 'COMPLETED']),
  },
};
