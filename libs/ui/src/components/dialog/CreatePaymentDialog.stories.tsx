import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// @ts-expect-error Storybook mock import
import { getRouter } from '@storybook/nextjs/navigation.mock';

import CreatePaymentDialog from './CreatePaymentDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';
import { expect } from 'storybook/test';
import styles from './Dialog.module.scss';

const meta = {
  component: CreatePaymentDialog,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/payments',
        query: {
          d: 'create',
        },
      },
    },
  },
  title: 'UI/Components/Create Payment Dialog',
} satisfies Meta<typeof CreatePaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

async function assertDialogFrame(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
) {
  const amountInput = canvas.getByLabelText(/Amount/);
  const currencyInput = canvas.getByLabelText(/Currency/);
  const debtorAccountInput = canvas.getByLabelText(/Debtor Account/);
  const creditorAccountInput = canvas.getByLabelText(/Creditor Account/);

  await expect(amountInput).toBeInTheDocument();
  await expect(currencyInput).toBeInTheDocument();
  await expect(debtorAccountInput).toBeInTheDocument();
  await expect(creditorAccountInput).toBeInTheDocument();
  await expect(
    canvas.getByRole('button', { name: 'Close' }),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole('button', { name: 'Create' }),
  ).toBeInTheDocument();
}

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator
        value={{ createPayment: paymentHandlers.createSuccess }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const router = getRouter();
    const amountInput = canvas.getByLabelText(/Amount/);
    const currencyInput = canvas.getByLabelText(/Currency/);
    const debtorAccountInput = canvas.getByLabelText(/Debtor Account/);
    const creditorAccountInput = canvas.getByLabelText(/Creditor Account/);

    router.push.mockReset();
    paymentHandlers.createSuccess.mockClear();

    await assertDialogFrame(canvas);
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(router.push).toHaveBeenCalledWith('/payments?');

    await userEvent.type(amountInput, '150');
    await userEvent.type(currencyInput, 'EUR');
    await userEvent.type(debtorAccountInput, 'DE89370400440532013000');
    await userEvent.type(creditorAccountInput, 'GB82WEST12345698765432');
    await userEvent.click(canvas.getByRole('button', { name: 'Create' }));

    await expect(paymentHandlers.createSuccess).toHaveBeenCalledTimes(1);
  },
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ createPayment: paymentHandlers.createError }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const amountInput = canvas.getByLabelText(/Amount/);
    const currencyInput = canvas.getByLabelText(/Currency/);
    const debtorAccountInput = canvas.getByLabelText(/Debtor Account/);
    const creditorAccountInput = canvas.getByLabelText(/Creditor Account/);

    paymentHandlers.createError.mockClear();

    await assertDialogFrame(canvas);
    await userEvent.type(amountInput, '150');
    await userEvent.type(currencyInput, 'EUR');
    await userEvent.type(debtorAccountInput, 'DE89370400440532013000');
    await userEvent.type(creditorAccountInput, 'GB82WEST12345698765432');
    await userEvent.click(canvas.getByRole('button', { name: 'Create' }));

    await expect(paymentHandlers.createError).toHaveBeenCalledTimes(1);
    await expect(
      canvas.getByText('Failed to create payment'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Failed to create payment').className,
    ).toContain(styles.error);
  },
};
