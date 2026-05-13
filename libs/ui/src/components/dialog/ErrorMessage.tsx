import type { FC } from 'react';
import styles from './Dialog.module.scss';

export interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) =>
  error ? <span className={styles.error}>{error}</span> : null;

export default ErrorMessage;
