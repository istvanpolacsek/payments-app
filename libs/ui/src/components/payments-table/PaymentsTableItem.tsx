import type { FC } from 'react';
import type { Payment } from '@types';
import { getCurrencyFormatter } from '../../util';
import styles from './PaymentsTable.module.scss';
import { cva } from 'class-variance-authority';
import PaymentsTableItemActions from './PaymentsTableItemActions';
import StatusBadge from '../status-badge/StatusBadge';

const cellCva = cva(styles.cell, {
  variants: {
    variant: {
      text: styles.textCell,
      number: styles.numberCell,
      status: styles.statusCell,
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
      <td className={cellCva({ variant: 'status' })}>
        <StatusBadge status={status} />
      </td>
      <td className={cellCva()}>
        <PaymentsTableItemActions {...props} />
      </td>
    </tr>
  );
};

export default PaymentsTableItem;
