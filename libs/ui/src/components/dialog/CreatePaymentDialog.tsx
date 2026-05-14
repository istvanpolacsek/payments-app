import { type FC, useActionState } from 'react';
import DialogBase from './DialogBase';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';
import styles from './Dialog.module.scss';
import SubmitButton from './SubmitButton';
import Form from './Form';
import Button from '../button/Button';
import { usePaymentFormInputs } from './hooks';
import { map } from 'lodash';

const CreatePaymentDialog: FC = () => {
  const { onClose } = useDialogHandlers();
  const { createPayment } = useActions();
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(createPayment, {
    success: false,
  });
  const fields = usePaymentFormInputs();

  return (
    <DialogBase>
      <Form ref={dialogRef} action={formAction}>
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
          <SubmitButton>Create</SubmitButton>
        </div>
      </Form>
    </DialogBase>
  );
};

export default CreatePaymentDialog;
