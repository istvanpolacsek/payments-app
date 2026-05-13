'use client';

import type { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Payment } from '@types';
import ConfirmDialog from './ConfirmDialog';
import CreatePaymentDialog from './CreatePaymentDialog';
import EditPaymentDialog from './EditPaymentDialog';
import DeletePaymentDialog from './DeletePaymentDialog';

type DialogTypes = 'create' | 'edit' | 'delete' | 'confirm';

export type DialogProps = Partial<Payment>;

const Dialog: FC<DialogProps> = (props) => {
  const params = useSearchParams();
  const dialog = params.get('d') as DialogTypes;

  switch (dialog) {
    case 'create':
      return <CreatePaymentDialog />;
    case 'edit':
      return <EditPaymentDialog {...props} />;
    case 'confirm':
      return <ConfirmDialog {...props} />;
    case 'delete':
      return <DeletePaymentDialog {...props} />;
    default:
      return null;
  }
};

export default Dialog;
