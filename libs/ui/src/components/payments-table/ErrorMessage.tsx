import type { FC } from 'react';
import styles from './PaymentsTable.module.scss';
import { COLUMNS } from './PaymentsTableBase';

const ErrorMessage: FC = () => {
  return (
    <tr>
      <td className={styles.suspenseMessage} colSpan={COLUMNS.length}>
        Error fetching payments
      </td>
    </tr>
  );
};

export default ErrorMessage;
