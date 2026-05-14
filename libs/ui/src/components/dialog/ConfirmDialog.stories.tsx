import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// @ts-expect-error Storybook mock import
import { getRouter } from '@storybook/nextjs/navigation.mock';

import ConfirmDialog from './ConfirmDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';
import { expect } from 'storybook/test';
import styles from './Dialog.module.scss';

const meta = {
  component: ConfirmDialog,
  args: {
    id: 'payment-1',
  },
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/payments',
        query: {
          d: 'confirm',
          id: 'payment-1',
          mode: 'complete',
        },
      },
    },
  },
  title: 'UI/Components/Confirm Dialog',
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

async function assertDialogFrame(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
) {
  const message = canvas.getByText('Are you sure?');
  const closeButton = canvas.getByRole('button', { name: 'Close' });
  const confirmButton = canvas.getByRole('button', { name: 'Confirm' });
  const idInput = canvas.getByDisplayValue('payment-1');
  const modeInput = canvas.getByDisplayValue('complete');

  await expect(message).toBeInTheDocument();
  await expect(message.className).toContain(styles.content);
  await expect(closeButton).toBeInTheDocument();
  await expect(confirmButton).toBeInTheDocument();
  await expect(idInput).toHaveAttribute('name', 'id');
  await expect(modeInput).toHaveAttribute('name', 'mode');
}

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator
        value={{ updatePaymentStatus: paymentHandlers.updateSuccess }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const router = getRouter();

    router.push.mockReset();
    paymentHandlers.updateSuccess.mockClear();

    await assertDialogFrame(canvas);
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));

    await expect(router.push).toHaveBeenCalledWith(
      '/payments?id=payment-1&mode=complete',
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Confirm' }));

    await expect(paymentHandlers.updateSuccess).toHaveBeenCalledTimes(1);
  },
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator
        value={{ updatePaymentStatus: paymentHandlers.updateError }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    paymentHandlers.updateError.mockClear();

    await assertDialogFrame(canvas);
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm' }));

    await expect(paymentHandlers.updateError).toHaveBeenCalledTimes(1);
    await expect(
      canvas.getByText('Failed to update payment status'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Failed to update payment status').className,
    ).toContain(styles.error);
  },
};
