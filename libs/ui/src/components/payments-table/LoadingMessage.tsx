import type { FC } from 'react';
import styles from './PaymentsTable.module.scss';
import PaymentsTableBase, { COLUMNS } from './PaymentsTableBase';

const ErrorMessage: FC = () => (
  <PaymentsTableBase>
    <tbody>
      <tr>
        <td className={styles.suspenseMessage} colSpan={COLUMNS.length}>
          Loading payments...
        </td>
      </tr>
    </tbody>
  </PaymentsTableBase>
);

export default ErrorMessage;
