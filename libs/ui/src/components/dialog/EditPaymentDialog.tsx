import { type FC, useActionState } from 'react';
import DialogBase from './DialogBase';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';
import styles from './Dialog.module.scss';
import SubmitButton from './SubmitButton';
import Form from './Form';
import type { DialogProps } from './Dialog';
import Button from '../button/Button';
import { usePaymentFormInputs } from './hooks';
import { map } from 'lodash';

const EditPaymentDialog: FC<DialogProps> = ({ id, ...rest }) => {
  const { onClose } = useDialogHandlers();
  const { updatePayment } = useActions();
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(updatePayment, {
    success: false,
  });
  const fields = usePaymentFormInputs({ id, ...rest });

  return (
    <DialogBase>
      <Form ref={dialogRef} action={formAction}>
        <input hidden name={id} />
        {map(fields, ({ component: Component, ...rest }, i) => (
          <Component key={i} {...rest} />
        ))}
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
          <SubmitButton>Update</SubmitButton>
        </div>
      </Form>
    </DialogBase>
  );
};

export default EditPaymentDialog;
