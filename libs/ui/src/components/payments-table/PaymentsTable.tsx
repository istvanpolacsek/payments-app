import type { FC } from 'react';
import type { Payment } from '@types';
import { startCase, map } from 'lodash';
import styles from './PaymentsTable.module.scss';
import PaymentsTableItem from './PaymentsTableItem';

export interface PaymentsTableProps {
  items: Payment[];
}

const COLUMNS = [
  'ID',
  'amount',
  'debtorAccount',
  'creditorAccount',
  'status',
  'actions',
] as const;

const PaymentsTable: FC<PaymentsTableProps> = ({ items }) => {
  return (
    <div className={styles.base}>
      <table className={styles.table}>
        <caption className={styles.caption}>Payments</caption>
        <thead className={styles.head}>
          <tr>
            {map(COLUMNS, (name, i) => (
              <th className={styles.cell} key={i} scope="col">
                {startCase(name)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {map(items, ({ id, ...item }) => (
            <PaymentsTableItem key={id} id={id} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
