import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// @ts-expect-error Storybook mock import
import { getRouter } from '@storybook/nextjs/navigation.mock';

import DeletePaymentDialog from './DeletePaymentDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';
import { expect } from 'storybook/test';
import styles from './Dialog.module.scss';

const meta = {
  component: DeletePaymentDialog,
  title: 'UI/Components/Delete Payment Dialog',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/payments',
        query: {
          d: 'delete',
          id: 'payment-1',
        },
      },
    },
  },
  args: { id: 'payment-1' },
} satisfies Meta<typeof DeletePaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

async function assertDialogFrame(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
) {
  const message = canvas.getByText('Are you sure?');
  const closeButton = canvas.getByRole('button', { name: 'Close' });
  const deleteButton = canvas.getByRole('button', { name: 'Delete' });
  const idInput = canvas.getByDisplayValue('payment-1');

  await expect(message).toBeInTheDocument();
  await expect(message.className).toContain(styles.content);
  await expect(closeButton).toBeInTheDocument();
  await expect(deleteButton).toBeInTheDocument();
  await expect(idInput).toHaveAttribute('name', 'id');
}

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator
        value={{ deletePayment: paymentHandlers.deleteSuccess }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const router = getRouter();

    router.push.mockReset();
    paymentHandlers.deleteSuccess.mockClear();

    await assertDialogFrame(canvas);
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));

    await expect(router.push).toHaveBeenCalledWith('/payments?id=payment-1');

    await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));

    await expect(paymentHandlers.deleteSuccess).toHaveBeenCalledTimes(1);
  },
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ deletePayment: paymentHandlers.deleteError }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    paymentHandlers.deleteError.mockClear();

    await assertDialogFrame(canvas);
    await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));

    await expect(paymentHandlers.deleteError).toHaveBeenCalledTimes(1);
    await expect(
      canvas.getByText('Failed to delete payment'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Failed to delete payment').className,
    ).toContain(styles.error);
  },
};
