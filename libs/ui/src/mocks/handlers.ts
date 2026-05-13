import { fn } from 'storybook/test';

export const createSuccessHandler = (actionName: string) =>
  fn(async () => ({
    success: true,
  })).mockName(actionName);

export const createErrorHandler = (
  actionName: string,
  error = 'Something went wrong',
) =>
  fn(async () => ({
    success: false,
    error,
  })).mockName(actionName);

export const paymentHandlers = {
  updateSuccess: createSuccessHandler('updatePaymentStatus'),
  updateError: createErrorHandler(
    'updatePaymentStatus',
    'Failed to update payment status',
  ),

  deleteSuccess: createSuccessHandler('deletePayment'),
  deleteError: createErrorHandler('deletePayment', 'Failed to delete payment'),

  createSuccess: createSuccessHandler('createPayment'),
  createError: createErrorHandler('createPayment', 'Failed to create payment'),

  editSuccess: createSuccessHandler('updatePayment'),
  editError: createErrorHandler('updatePayment', 'Failed to update payment'),
};
