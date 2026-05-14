import { describe, expect, it } from 'vitest';
import Input from '../input/Input';
import { usePaymentFormInputs } from './hooks';

describe('usePaymentFormInputs', () => {
  it('returns the expected payment form field definitions', () => {
    const fields = usePaymentFormInputs();

    expect(fields).toHaveLength(4);
    expect(fields).toMatchObject([
      {
        component: Input,
        required: true,
        name: 'amount',
        label: 'Amount',
        type: 'number',
        step: '0.01',
        min: 0,
        placeholder: 'Enter Amount',
      },
      {
        component: Input,
        required: true,
        name: 'currency',
        label: 'Currency',
        placeholder: 'ie. EUR',
        minLength: 3,
        maxLength: 3,
      },
      {
        component: Input,
        required: true,
        name: 'debtorAccount',
        label: 'Debtor Account',
        placeholder: 'Enter Debtor Account',
        pattern: '^[A-Z]{2}[A-Z0-9]{13,32}$',
        title:
          'Must start with 2 country letters followed by alphanumeric characters',
      },
      {
        component: Input,
        required: true,
        name: 'creditorAccount',
        label: 'Creditor Account',
        placeholder: 'Enter Creditor Account',
        pattern: '^[A-Z]{2}[A-Z0-9]{13,32}$',
        title:
          'Must start with 2 country letters followed by alphanumeric characters',
      },
    ]);
  });

  it('leaves field default values undefined when no payment is provided', () => {
    const fields = usePaymentFormInputs();

    expect(fields.map(({ defaultValue }) => defaultValue)).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });

  it('maps provided payment values to the corresponding field defaults', () => {
    const fields = usePaymentFormInputs({
      amount: 150.25,
      currency: 'EUR',
      debtorAccount: 'DE89370400440532013000',
      creditorAccount: 'GB82WEST12345698765432',
    });

    expect(fields.map(({ defaultValue }) => defaultValue)).toEqual([
      150.25,
      'EUR',
      'DE89370400440532013000',
      'GB82WEST12345698765432',
    ]);
  });
});
