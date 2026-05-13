'use client';

import type { FC } from 'react';
import type { PaymentsTableProps } from './PaymentsTable';
import { useDialogHandlers } from '../../hooks';
import { useSearchParams } from 'next/navigation';
import { filter } from 'lodash';
import Dialog from '../dialog/Dialog';
import Button from '../button/Button';
import styles from './PaymentsTable.module.scss';

const PaymentsTableActions: FC<PaymentsTableProps> = ({ items }) => {
  const { onSetDialog } = useDialogHandlers();
  const params = useSearchParams();
  const id = String(params.get('id'));
  const [selectedPayment] = filter(items, ['id', id]);

  const handleCreate = () => onSetDialog('create');

  return (
    <div className={styles.footActions}>
      <Button onClick={handleCreate}>Create new</Button>
      <Dialog {...selectedPayment} />
    </div>
  );
};

export default PaymentsTableActions;
