import { type FC, useActionState } from 'react';
import DialogBase from './DialogBase';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';
import styles from './Dialog.module.scss';
import SubmitButton from './SubmitButton';

import Form from './Form';
import Input from '../input/Input';
import Button from '../button/Button';

const CreatePaymentDialog: FC = () => {
  const { onClose } = useDialogHandlers();
  const { createPayment } = useActions();
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(createPayment, {
    success: false,
  });

  return (
    <DialogBase>
      <Form ref={dialogRef} action={formAction}>
        <Input
          required
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          type="number"
          step="0.01"
          min="0"
        />
        <Input
          required
          name="currency"
          label="Currency"
          placeholder="ie. EUR"
        />
        <Input
          required
          name="debtorAccount"
          label="Debtor Account"
          placeholder="Enter Debtor Account"
        />
        <Input
          required
          name="creditorAccount"
          label="Creditor Account"
          placeholder="Enter Creditor Account"
        />
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
