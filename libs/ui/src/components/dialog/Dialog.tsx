'use client';

import type { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Payment } from '@types';
import ConfirmDialog from './ConfirmDialog';

type DialogTypes = 'create' | 'edit' | 'delete' | 'confirm';

export interface DialogProps extends Partial<Payment> {
  mode?: 'complete' | 'fail';
}

const Dialog: FC<DialogProps> = (props) => {
  const params = useSearchParams();
  const dialog = params.get('d') as DialogTypes;

  switch (dialog) {
    case 'confirm':
      return <ConfirmDialog {...props} />;
    default:
      return null;
  }
};

export default Dialog;
