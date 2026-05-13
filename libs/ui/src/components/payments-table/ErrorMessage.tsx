import type { FC } from 'react';
import styles from './PaymentsTable.module.scss';
import { COLUMNS } from './PaymentsTableBase';
import { PaymentsTableBase } from '../index';

const ErrorMessage: FC = () => (
  <PaymentsTableBase>
    <tbody>
      <tr>
        <td className={styles.suspenseMessage} colSpan={COLUMNS.length}>
          Error fetching payments
        </td>
      </tr>
    </tbody>
  </PaymentsTableBase>
);

export default ErrorMessage;
