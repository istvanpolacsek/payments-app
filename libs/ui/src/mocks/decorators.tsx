import type { FC, ProviderProps } from 'react';
import type { ActionsProviderProps } from '../providers/actions/ActionsProvider';
import { ActionsProvider } from '../providers';

export const ActionsDecorator: FC<
  ProviderProps<Partial<ActionsProviderProps>>
> = ({ value, children }) => (
  <ActionsProvider value={value as ActionsProviderProps}>
    {children}
  </ActionsProvider>
);
