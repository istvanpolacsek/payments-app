import type { Meta, StoryObj } from '@storybook/nextjs';

import ConfirmDialog from './ConfirmDialog';
import { fn } from 'storybook/test';
import { ActionsProvider } from '../../providers';
import type { ActionsProviderProps } from '../../providers/actions/ActionsProvider';

const successHandler = fn(async () => ({
  success: true,
  redirectUrl: '/',
})).mockName('updatePaymentStatus');

const errorHandler = fn(async () => ({
  success: false,
  error: 'Something went wrong',
})).mockName('updatePaymentStatus');

const meta = {
  component: ConfirmDialog,
  args: { mode: 'complete' },
  parameters: { layout: 'fullscreen' },
  title: 'UI/Components/Confirm Dialog',
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSuccess: Story = {
  decorators: [
    (Story) => (
      <ActionsProvider
        value={
          {
            updatePaymentStatus: successHandler,
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
            updatePaymentStatus: errorHandler,
          } as unknown as ActionsProviderProps
        }
      >
        {Story()}
      </ActionsProvider>
    ),
  ],
};
