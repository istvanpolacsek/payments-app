'use client';

import type { FC } from 'react';
import type { Payment } from '@types';
import styles from './PaymentsTable.module.scss';
import { useDialogHandlers } from '../../hooks';
import Button from '../button/Button';

const PaymentsTableItemActions: FC<Payment> = (props) => {
  const { status, id } = props;
  const { onSetDialog } = useDialogHandlers();

  const handleEdit = () => onSetDialog('edit', { id });
  const handleDelete = () => onSetDialog('delete', { id });
  const handleSetCompleted = () =>
    onSetDialog('confirm', { id, mode: 'complete' });
  const handleSetFailed = () => onSetDialog('confirm', { id, mode: 'fail' });

  return (
    <div className={styles.actions}>
      <Button variant="outlined" onClick={handleEdit}>
        Edit
      </Button>
      {status === 'CREATED' && (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSetCompleted}
          >
            Complete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSetFailed}
          >
            Mark as Failed
          </Button>
        </>
      )}
      <Button variant="outlined" color="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default PaymentsTableItemActions;
