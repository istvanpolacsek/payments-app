import type { FC } from 'react';
import type { Payment } from '@types';
import { map } from 'lodash';
import PaymentsTableItem from './PaymentsTableItem';
import PaymentsTableActions from './PaymentsTableActions';
import PaymentsTableBase from './PaymentsTableBase';

export interface PaymentsTableProps {
  items: Payment[];
}

const PaymentsTable: FC<PaymentsTableProps> = ({ items }) => (
  <PaymentsTableBase>
    <tbody>
      {map(items, ({ id, ...item }) => (
        <PaymentsTableItem key={id} id={id} {...item} />
      ))}
    </tbody>
    <PaymentsTableActions items={items} />
  </PaymentsTableBase>
);

export default PaymentsTable;
