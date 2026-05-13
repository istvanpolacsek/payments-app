import type { Meta, StoryObj } from '@storybook/nextjs';

import CreatePaymentDialog from './CreatePaymentDialog';
import { fn } from 'storybook/test';
import type { ActionsProviderProps } from '../../providers/actions/ActionsProvider';
import { ActionsProvider } from '../../providers';

const successHandler = fn(async () => ({
  success: true,
})).mockName('createPayment');

const errorHandler = fn(async () => ({
  success: false,
  error: 'Something went wrong',
})).mockName('createPayment');

const meta = {
  component: CreatePaymentDialog,
  parameters: { layout: 'fullscreen' },
  title: 'UI/Components/Create Payment Dialog',
} satisfies Meta<typeof CreatePaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsProvider
        value={
          {
            createPayment: successHandler,
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
            createPayment: errorHandler,
          } as unknown as ActionsProviderProps
        }
      >
        {Story()}
      </ActionsProvider>
    ),
  ],
};
