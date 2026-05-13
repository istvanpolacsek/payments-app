import type { FC, PropsWithChildren } from 'react';
import styles from './PaymentsTable.module.scss';
import { map, startCase } from 'lodash';

export const COLUMNS = [
  'ID',
  'amount',
  'debtorAccount',
  'creditorAccount',
  'status',
  'actions',
] as const;

const PaymentsTableBase: FC<PropsWithChildren> = ({ children }) => (
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
      {children}
    </table>
  </div>
);

export default PaymentsTableBase;
