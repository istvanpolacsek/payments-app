import { type FC, useActionState } from 'react';
import type { DialogProps } from './Dialog';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import DialogBase from './DialogBase';
import { Button } from '..';
import styles from './Dialog.module.scss';
import SubmitButton from './SubmitButton';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';
import Form from './Form';

const DeletePaymentDialog: FC<DialogProps> = ({ id }) => {
  const { onClose } = useDialogHandlers();
  const { deletePayment } = useActions();
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(deletePayment, {
    success: false,
  });

  return (
    <DialogBase>
      <Form ref={dialogRef} action={formAction}>
        <p className={styles.content}>Are you sure?</p>
        <input hidden name="id" defaultValue={id} />
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
          <SubmitButton color="danger" variant="outlined">
            Delete
          </SubmitButton>
        </div>
      </Form>
    </DialogBase>
  );
};

export default DeletePaymentDialog;
