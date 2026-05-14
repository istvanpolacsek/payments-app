import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DeletePaymentDialog from './DeletePaymentDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';

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
      <ActionsDecorator
        value={{ deletePayment: paymentHandlers.deleteSuccess }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ deletePayment: paymentHandlers.deleteError }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
};
