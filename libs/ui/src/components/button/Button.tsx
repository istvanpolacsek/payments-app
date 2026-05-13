import styles from './Button.module.scss';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { fromPairs, map, flatMap } from 'lodash';

export const VARIANTS = ['filled', 'outlined', 'ghost'] as const;
export const COLORS = ['primary', 'secondary', 'danger'] as const;

const buttonCva = cva(styles.base, {
  variants: {
    variant: fromPairs(map(VARIANTS, (v) => [v, styles[v]])) as Record<
      (typeof VARIANTS)[number],
      string
    >,
    color: fromPairs(map(COLORS, (c) => [c, styles[c]])) as Record<
      (typeof COLORS)[number],
      string
    >,
  },
  defaultVariants: {
    variant: 'filled',
    color: 'primary',
  },
  compoundVariants: flatMap(VARIANTS, (variant) =>
    map(COLORS, (color) => ({
      variant,
      color,
      className: styles[`${variant}-${color}`],
    })),
  ),
});

type ButtonVariants = VariantProps<typeof buttonCva>;

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'filled',
      color = 'primary',

      ...rest
    },
    ref,
  ) => (
    <button ref={ref} {...rest} className={buttonCva({ variant, color })}>
      {children}
    </button>
  ),
);

export default Button;
