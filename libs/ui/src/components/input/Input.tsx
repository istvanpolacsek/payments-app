import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, required, ...rest }, ref) => (
    <div className={styles.base}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        ref={ref}
        name={name}
        {...rest}
        required={required}
        className={styles.input}
      />
    </div>
  ),
);

export default Input;
