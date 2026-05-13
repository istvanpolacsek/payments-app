import type { Meta, StoryObj } from '@storybook/nextjs';

import EditPaymentDialog from './EditPaymentDialog';
import { fn } from 'storybook/test';
import { ActionsProvider } from '../../providers';
import type { ActionsProviderProps } from '../../providers/actions/ActionsProvider';
import { mockPayments } from '../../mocks/fixtures';

const [defaultValues] = mockPayments.single;

const successHandler = fn(async () => ({
  success: true,
})).mockName('updatePayment');

const errorHandler = fn(async () => ({
  success: false,
  error: 'Something went wrong',
})).mockName('updatePayment');

const meta = {
  component: EditPaymentDialog,
  title: 'UI/Components/Edit Payment Dialog',
  parameters: { layout: 'fullscreen' },
  args: { ...defaultValues },
} satisfies Meta<typeof EditPaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsProvider
        value={
          {
            updatePayment: successHandler,
          } as unknown as ActionsProviderProps
        }
      >
        {Story()}
      </ActionsProvider>
    ),
  ],
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsProvider
        value={
          {
            updatePayment: errorHandler,
          } as unknown as ActionsProviderProps
        }
      >
        {Story()}
      </ActionsProvider>
    ),
  ],
};
