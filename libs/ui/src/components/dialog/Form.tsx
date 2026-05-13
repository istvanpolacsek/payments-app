import { type FormHTMLAttributes, forwardRef } from 'react';
import styles from './Dialog.module.scss';

const Form = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  ({ children, className, ...rest }, ref) => (
    <form ref={ref} className={styles.surface} {...rest}>
      {children}
    </form>
  ),
);

export default Form;
