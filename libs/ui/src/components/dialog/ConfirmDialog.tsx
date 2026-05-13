import { type FC, useActionState } from 'react';
import type { DialogProps } from './Dialog';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import DialogBase from './DialogBase';
import { Button } from '..';
import styles from './Dialog.module.scss';
import SubmitButton from './SubmitButton';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';

const ConfirmDialog: FC<DialogProps> = ({ mode, id }) => {
  const { onClose } = useDialogHandlers();
  const { updatePaymentStatus } = useActions();
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(updatePaymentStatus, {
    success: false,
  });

  return (
    <DialogBase>
      <form ref={dialogRef} className={styles.surface} action={formAction}>
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
      </form>
    </DialogBase>
  );
};

export default ConfirmDialog;
