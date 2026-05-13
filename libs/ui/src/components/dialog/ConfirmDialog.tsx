import { type FC, useActionState } from 'react';
import type { DialogProps } from './Dialog';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import DialogBase from './DialogBase';
import styles from './Dialog.module.scss';
import SubmitButton from './SubmitButton';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';
import Form from './Form';
import { useSearchParams } from 'next/navigation';
import Button from '../button/Button';

const ConfirmDialog: FC<DialogProps> = ({ id }) => {
  const { onClose } = useDialogHandlers();
  const { updatePaymentStatus } = useActions();
  const params = useSearchParams();
  const mode = String(params.get('mode'));
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(updatePaymentStatus, {
    success: false,
  });

  return (
    <DialogBase>
      <Form ref={dialogRef} action={formAction}>
        <p className={styles.content}>Are you sure?</p>
        <input hidden name="id" defaultValue={id} />
        <input hidden name="mode" defaultValue={mode} />
        <ErrorMessage error={error} />
        <div className={styles.actions}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            type="button"
          >
            Close
          </Button>
          <SubmitButton>Confirm</SubmitButton>
        </div>
      </Form>
    </DialogBase>
  );
};

export default ConfirmDialog;
