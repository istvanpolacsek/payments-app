import type { FC, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import Button, { type ButtonProps } from '../button/Button';

const SubmitButton: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...rest
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...rest}>
      {children}
      {pending ? '...' : ''}
    </Button>
  );
};

export default SubmitButton;
