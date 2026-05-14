import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// @ts-expect-error Storybook mock import
import { getRouter } from '@storybook/nextjs/navigation.mock';

import EditPaymentDialog from './EditPaymentDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';
import { mockPayments } from '../../mocks/fixtures';
import { expect } from 'storybook/test';
import styles from './Dialog.module.scss';

const [defaultValues] = mockPayments.single;

const meta = {
  component: EditPaymentDialog,
  title: 'UI/Components/Edit Payment Dialog',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/payments',
        query: {
          d: 'edit',
          id: defaultValues.id,
        },
      },
    },
  },
  args: { ...defaultValues },
} satisfies Meta<typeof EditPaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

async function assertDialogFrame(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
  args: NonNullable<Story['args']>,
) {
  const amountInput = canvas.getByLabelText(/amount/i);
  const currencyInput = canvas.getByLabelText(/currency/i);
  const debtorAccountInput = canvas.getByLabelText(/debtor account/i);
  const creditorAccountInput = canvas.getByLabelText(/creditor account/i);

  await expect(amountInput).toBeInTheDocument();
  await expect(currencyInput).toBeInTheDocument();
  await expect(debtorAccountInput).toBeInTheDocument();
  await expect(creditorAccountInput).toBeInTheDocument();
  await expect(amountInput).toHaveValue(Number(args.amount));
  await expect(currencyInput).toHaveValue(String(args.currency ?? ''));
  await expect(debtorAccountInput).toHaveValue(
    String(args.debtorAccount ?? ''),
  );
  await expect(creditorAccountInput).toHaveValue(
    String(args.creditorAccount ?? ''),
  );
  await expect(
    canvas.getByRole('button', { name: 'Close' }),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole('button', { name: 'Update' }),
  ).toBeInTheDocument();
}

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ updatePayment: paymentHandlers.editSuccess }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ args, canvas, userEvent }) => {
    const router = getRouter();
    const amountInput = canvas.getByLabelText(/amount/i);
    const currencyInput = canvas.getByLabelText(/currency/i);
    const debtorAccountInput = canvas.getByLabelText(/debtor account/i);
    const creditorAccountInput = canvas.getByLabelText(/creditor account/i);

    router.push.mockReset();
    paymentHandlers.editSuccess.mockClear();

    await assertDialogFrame(canvas, args);
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(router.push).toHaveBeenCalledWith(`/payments?id=${args.id}`);

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '250');
    await userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, 'USD');
    await userEvent.clear(debtorAccountInput);
    await userEvent.type(debtorAccountInput, 'FR1420041010050500013M02606');
    await userEvent.clear(creditorAccountInput);
    await userEvent.type(creditorAccountInput, 'NL91ABNA0417164300');
    await userEvent.click(canvas.getByRole('button', { name: 'Update' }));

    await expect(paymentHandlers.editSuccess).toHaveBeenCalledTimes(1);
  },
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ updatePayment: paymentHandlers.editError }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
  play: async ({ args, canvas, userEvent }) => {
    const amountInput = canvas.getByLabelText(/amount/i);
    const currencyInput = canvas.getByLabelText(/currency/i);
    const debtorAccountInput = canvas.getByLabelText(/debtor account/i);
    const creditorAccountInput = canvas.getByLabelText(/creditor account/i);

    paymentHandlers.editError.mockClear();

    await assertDialogFrame(canvas, args);
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '250');
    await userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, 'USD');
    await userEvent.clear(debtorAccountInput);
    await userEvent.type(debtorAccountInput, 'FR1420041010050500013M02606');
    await userEvent.clear(creditorAccountInput);
    await userEvent.type(creditorAccountInput, 'NL91ABNA0417164300');
    await userEvent.click(canvas.getByRole('button', { name: 'Update' }));

    await expect(paymentHandlers.editError).toHaveBeenCalledTimes(1);
    await expect(
      canvas.getByText('Failed to update payment'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Failed to update payment').className,
    ).toContain(styles.error);
  },
};
