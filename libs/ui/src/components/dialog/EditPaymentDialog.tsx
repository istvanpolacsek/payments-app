import { type FC, useActionState } from 'react';
import DialogBase from './DialogBase';
import { useClickOutside, useDialogHandlers } from '../../hooks';
import { useActions } from '../../providers';
import ErrorMessage from './ErrorMessage';
import styles from './Dialog.module.scss';
import { Button } from '../index';
import SubmitButton from './SubmitButton';
import Input from '../input/Input';
import Form from './Form';
import type { DialogProps } from './Dialog';

const EditPaymentDialog: FC<DialogProps> = ({
  id,
  amount,
  currency,
  creditorAccount,
  debtorAccount,
}) => {
  const { onClose } = useDialogHandlers();
  const { updatePayment } = useActions();
  const dialogRef = useClickOutside<HTMLFormElement>(onClose);
  const [{ error = null }, formAction] = useActionState(updatePayment, {
    success: false,
  });

  return (
    <DialogBase>
      <Form ref={dialogRef} action={formAction}>
        <input hidden name={id} />
        <Input
          required
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          type="number"
          step="0.01"
          min="0"
          defaultValue={amount}
        />
        <Input
          required
          name="currency"
          label="Currency"
          placeholder="ie. EUR"
          defaultValue={currency}
        />
        <Input
          required
          name="debtorAccount"
          label="Debtor Account"
          placeholder="Enter Debtor Account"
          defaultValue={debtorAccount}
        />
        <Input
          required
          name="creditorAccount"
          label="Creditor Account"
          placeholder="Enter Creditor Account"
          defaultValue={creditorAccount}
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
          <SubmitButton>Update</SubmitButton>
        </div>
      </Form>
    </DialogBase>
  );
};

export default EditPaymentDialog;
