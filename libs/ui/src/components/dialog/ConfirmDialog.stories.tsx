import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ConfirmDialog from './ConfirmDialog';
import { paymentHandlers } from '../../mocks/handlers';
import { ActionsDecorator } from '../../mocks/decorators';

const meta = {
  component: ConfirmDialog,
  args: {},
  parameters: { layout: 'fullscreen' },
  title: 'UI/Components/Confirm Dialog',
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

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
};
