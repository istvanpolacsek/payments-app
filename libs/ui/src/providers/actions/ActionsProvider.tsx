import type { StandardResponse } from '@types';
import { createContext, type FC, type ProviderProps, useContext } from 'react';
import {
  createPayment,
  deletePayment,
  updatePayment,
  updatePaymentStatus,
} from '../../actions';

type Handler = (
  prevState: StandardResponse,
  formData: FormData,
) => Promise<StandardResponse>;
type Handlers =
  | 'createPayment'
  | 'updatePayment'
  | 'updatePaymentStatus'
  | 'deletePayment';

export type ActionsProviderProps = Record<Handlers, Handler>;

export const ActionsContext = createContext<ActionsProviderProps>({
  createPayment: createPayment,
  updatePayment: updatePayment,
  updatePaymentStatus: updatePaymentStatus,
  deletePayment: deletePayment,
});

const { Provider } = ActionsContext;

const ActionsProvider: FC<ProviderProps<ActionsProviderProps>> = ({
  value,
  children,
}) => {
  const prevValue = useActions();

  return <Provider value={{ ...prevValue, ...value }}>{children}</Provider>;
};

export default ActionsProvider;

export function useActions() {
  return useContext(ActionsContext);
}
