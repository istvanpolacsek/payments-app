import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import EditPaymentDialog from './EditPaymentDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';
import { mockPayments } from '../../mocks/fixtures';

const [defaultValues] = mockPayments.single;

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
      <ActionsDecorator
        value={{ updatePayment: paymentHandlers.updateSuccess }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ updatePayment: paymentHandlers.updateError }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
};
