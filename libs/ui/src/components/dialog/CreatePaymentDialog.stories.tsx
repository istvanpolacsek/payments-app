import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CreatePaymentDialog from './CreatePaymentDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';

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
      <ActionsDecorator
        value={{ createPayment: paymentHandlers.createSuccess }}
      >
        {Story()}
      </ActionsDecorator>
    ),
  ],
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <ActionsDecorator value={{ createPayment: paymentHandlers.createError }}>
        {Story()}
      </ActionsDecorator>
    ),
  ],
};
