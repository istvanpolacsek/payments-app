import type { FC } from 'react';
import type { Payment } from '@types';
import { getCurrencyFormatter } from '../../util';
import styles from './PaymentsTable.module.scss';
import { Button, StatusBadge } from '..';
import { cva } from 'class-variance-authority';

const cellCva = cva(styles.cell, {
  variants: {
    variant: {
      text: styles.textCell,
      number: styles.numberCell,
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

const PaymentsTableItem: FC<Payment> = (props) => {
  const { id, amount, currency, debtorAccount, creditorAccount, status } =
    props;
  const format = getCurrencyFormatter('en-US', currency);

  return (
    <tr>
      <th className={cellCva()} scope="col">
        {id}
      </th>
      <td className={cellCva({ variant: 'number' })}>{format(amount)}</td>
      <td className={cellCva()}>{debtorAccount}</td>
      <td className={cellCva()}>{creditorAccount}</td>
      <td className={cellCva()}>
        <StatusBadge status={status} />
      </td>
      <td className={cellCva()}>
        <div className={styles.actions}>
          <Button variant="outlined">Edit</Button>
          {status === 'CREATED' && (
            <>
              <Button variant="outlined" color="secondary">
                Complete
              </Button>
              <Button variant="outlined" color="secondary">
                Mark as Failed
              </Button>
            </>
          )}
          <Button variant="outlined" color="danger">
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PaymentsTableItem;
