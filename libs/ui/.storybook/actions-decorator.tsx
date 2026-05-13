import { ActionsProviderProps } from '../src/providers/actions/ActionsProvider';
// @ts-expect-error Storybook imports
import { fn } from 'storybook/test';
import { ActionsProvider } from '../src/providers';

const defaultValue: ActionsProviderProps = {
  createPayment: fn(),
  updatePayment: fn(),
  updatePaymentStatus: fn(),
  deletePayment: fn(),
};

const ActionsDecorator = (Story) => (
  <ActionsProvider value={defaultValue}>{Story()}</ActionsProvider>
);

export default ActionsDecorator;
