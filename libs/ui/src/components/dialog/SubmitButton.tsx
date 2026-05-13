import type { FC, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../index';

const SubmitButton: FC<PropsWithChildren> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {children}
      {pending ? '...' : ''}
    </Button>
  );
};

export default SubmitButton;
