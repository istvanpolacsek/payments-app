import type { Meta, StoryObj } from '@storybook/nextjs';

import DeletePaymentDialog from './DeletePaymentDialog';
import { fn } from 'storybook/test';
import { ActionsProvider } from '../../providers';
import type { ActionsProviderProps } from '../../providers/actions/ActionsProvider';

const successHandler = fn(async () => ({
  success: true,
})).mockName('deletePayment');

const errorHandler = fn(async () => ({
  success: false,
  error: 'Something went wrong',
})).mockName('deletePayment');

const meta = {
  component: DeletePaymentDialog,
  title: 'UI/Components/Delete Payment Dialog',
  parameters: { layout: 'fullscreen' },
  args: { id: 'some-id' },
} satisfies Meta<typeof DeletePaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsProvider
        value={
          {
            deletePayment: successHandler,
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
            deletePayment: errorHandler,
          } as unknown as ActionsProviderProps
        }
      >
        {Story()}
      </ActionsProvider>
    ),
  ],
};
