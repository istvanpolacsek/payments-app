import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// @ts-expect-error Storybook mock import
import { getRouter } from '@storybook/nextjs/navigation.mock';
import { expect, within } from 'storybook/test';

import PaymentsTable from './PaymentsTable';
import {
  mockPayments,
  createPayments,
  createPaymentsByStatus,
} from '../../mocks/fixtures';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';

const meta = {
  component: PaymentsTable,
  title: 'UI/Components/Payments Table',
  parameters: {
    layout: 'centered',
    nextjs: {
      navigation: {
        pathname: '/payments',
        query: {},
      },
    },
  },
} satisfies Meta<typeof PaymentsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

async function assertTableFrame(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
) {
  await expect(
    canvas.getByRole('table', { name: 'Payments' }),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole('button', { name: 'Create new' }),
  ).toBeInTheDocument();
}

export const Empty: Story = {
  args: {
    items: mockPayments.empty,
  },
  play: async ({ canvas, userEvent }) => {
    const router = getRouter();

    router.push.mockReset();
    await assertTableFrame(canvas);
    await expect(canvas.queryByRole('rowheader', { name: /PAY-/ })).toBeNull();

    await userEvent.click(canvas.getByRole('button', { name: 'Create new' }));

    await expect(router.push).toHaveBeenCalledWith('/payments?d=create');
  },
};

export const Single: Story = {
  args: {
    items: mockPayments.single,
  },
  play: async ({ canvas, userEvent }) => {
    const router = getRouter();
    const row = canvas.getByRole('row', { name: /PAY-001/i });
    const rowCanvas = within(row);

    router.push.mockReset();
    await assertTableFrame(canvas);
    await expect(rowCanvas.getByText('PAY-001')).toBeInTheDocument();
    await expect(
      rowCanvas.getByRole('button', { name: 'Edit' }),
    ).toBeInTheDocument();
    await expect(
      rowCanvas.getByRole('button', { name: 'Delete' }),
    ).toBeInTheDocument();
    await expect(
      rowCanvas.queryByRole('button', { name: 'Complete' }),
    ).toBeNull();

    await userEvent.click(rowCanvas.getByRole('button', { name: 'Edit' }));
    await userEvent.click(rowCanvas.getByRole('button', { name: 'Delete' }));

    await expect(router.push).toHaveBeenNthCalledWith(
      1,
      '/payments?id=PAY-001&d=edit',
    );
    await expect(router.push).toHaveBeenNthCalledWith(
      2,
      '/payments?id=PAY-001&d=delete',
    );
  },
};

export const Mixed: Story = {
  args: {
    items: mockPayments.mixed,
  },
  play: async ({ canvas, userEvent }) => {
    const router = getRouter();
    const createdRow = canvas.getByRole('row', { name: /PAY-002/i });
    const createdRowCanvas = within(createdRow);

    router.push.mockReset();
    await assertTableFrame(canvas);
    await expect(
      canvas.getByRole('row', { name: /PAY-001/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('row', { name: /PAY-003/i }),
    ).toBeInTheDocument();
    await expect(
      createdRowCanvas.getByRole('button', { name: 'Complete' }),
    ).toBeInTheDocument();
    await expect(
      createdRowCanvas.getByRole('button', { name: 'Mark as Failed' }),
    ).toBeInTheDocument();

    await userEvent.click(
      createdRowCanvas.getByRole('button', { name: 'Complete' }),
    );
    await userEvent.click(
      createdRowCanvas.getByRole('button', { name: 'Mark as Failed' }),
    );

    await expect(router.push).toHaveBeenNthCalledWith(
      1,
      '/payments?id=PAY-002&mode=complete&d=confirm',
    );
    await expect(router.push).toHaveBeenNthCalledWith(
      2,
      '/payments?id=PAY-002&mode=fail&d=confirm',
    );
  },
};

export const AllCompleted: Story = {
  args: {
    items: mockPayments.allCompleted,
  },
  play: async ({ canvas }) => {
    await assertTableFrame(canvas);
    await expect(canvas.getAllByRole('row')).toHaveLength(6);
    await expect(canvas.queryByRole('button', { name: 'Complete' })).toBeNull();
    await expect(
      canvas.queryByRole('button', { name: 'Mark as Failed' }),
    ).toBeNull();
  },
};

export const AllFailed: Story = {
  args: {
    items: mockPayments.allFailed,
  },
  play: async ({ canvas }) => {
    await assertTableFrame(canvas);
    await expect(canvas.getAllByRole('row')).toHaveLength(6);
    await expect(canvas.queryByRole('button', { name: 'Complete' })).toBeNull();
  },
};

export const Many: Story = {
  args: {
    items: createPayments(10),
  },
};

export const CustomStatuses: Story = {
  args: {
    items: createPaymentsByStatus([
      'COMPLETED',
      'CREATED',
      'FAILED',
      'COMPLETED',
    ]),
  },
};

export const Loading: Story = {
  args: { items: [] },
  render: () => <LoadingMessage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Loading payments...')).toBeInTheDocument();
    await expect(
      canvas.getByRole('table', { name: 'Payments' }),
    ).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: { items: [] },
  render: () => <ErrorMessage />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Error fetching payments'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('table', { name: 'Payments' }),
    ).toBeInTheDocument();
  },
};
