import { fromPairs, map, lowerCase, capitalize } from 'lodash';
import type { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './StatusBadge.module.scss';

const STATUSES = ['CREATED', 'FAILED', 'COMPLETED'] as const;
type Statuses = (typeof STATUSES)[number];

const statusBadgeCva = cva(styles.base, {
  variants: {
    status: fromPairs(
      map(STATUSES, (s) => [s, styles[lowerCase(s)]]),
    ) as Record<Statuses, string>,
  },
  defaultVariants: {
    status: 'CREATED',
  },
});

type StatusBadgeVariants = VariantProps<typeof statusBadgeCva>;

const StatusBadge: FC<StatusBadgeVariants> = ({ status = 'CREATED' }) =>
  status ? (
    <span className={statusBadgeCva({ status })}>{capitalize(status)}</span>
  ) : null;

export default StatusBadge;
