import type { Payment } from '@types';
import Input, { type InputProps } from '../input/Input';
import type { ComponentType } from 'react';

interface PaymentFormInput extends InputProps {
  component: ComponentType<InputProps>;
}

export function usePaymentFormInputs(
  defaultValues?: Partial<Payment>,
): PaymentFormInput[] {
  return [
    {
      component: Input,
      required: true,
      name: 'amount',
      label: 'Amount',
      type: 'number',
      step: '0.01',
      min: 0,
      placeholder: 'Enter Amount',
      defaultValue: defaultValues?.amount,
      role: 'spinbutton',
    },
    {
      component: Input,
      required: true,
      name: 'currency',
      label: 'Currency',
      placeholder: 'ie. EUR',
      minLength: 3,
      maxLength: 3,
      defaultValue: defaultValues?.currency,
    },
    {
      component: Input,
      required: true,
      name: 'debtorAccount',
      label: 'Debtor Account',
      placeholder: 'Enter Debtor Account',
      defaultValue: defaultValues?.debtorAccount,
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
      defaultValue: defaultValues?.creditorAccount,
      pattern: '^[A-Z]{2}[A-Z0-9]{13,32}$',
      title:
        'Must start with 2 country letters followed by alphanumeric characters',
    },
  ];
}
