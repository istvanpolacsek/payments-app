import type { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ActionsProvider, {
  type ActionsProviderProps,
  useActions,
} from './ActionsProvider';

const {
  createPaymentMock,
  updatePaymentMock,
  updatePaymentStatusMock,
  deletePaymentMock,
} = vi.hoisted(() => ({
  createPaymentMock: vi.fn(async () => ({ success: true })),
  updatePaymentMock: vi.fn(async () => ({ success: true })),
  updatePaymentStatusMock: vi.fn(async () => ({ success: true })),
  deletePaymentMock: vi.fn(async () => ({ success: true })),
}));

vi.mock('../../actions', () => ({
  createPayment: createPaymentMock,
  updatePayment: updatePaymentMock,
  updatePaymentStatus: updatePaymentStatusMock,
  deletePayment: deletePaymentMock,
}));

function createHandlers(): ActionsProviderProps {
  return {
    createPayment: vi.fn(async () => ({ success: true })),
    updatePayment: vi.fn(async () => ({ success: true })),
    updatePaymentStatus: vi.fn(async () => ({ success: true })),
    deletePayment: vi.fn(async () => ({ success: true })),
  };
}

describe('ActionsProvider', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns the default action handlers from context', () => {
    const { result } = renderHook(() => useActions());

    expect(result.current).toEqual({
      createPayment: createPaymentMock,
      updatePayment: updatePaymentMock,
      updatePaymentStatus: updatePaymentStatusMock,
      deletePayment: deletePaymentMock,
    });
  });

  it('merges nested provider overrides with the existing context value', () => {
    const parentHandlers = createHandlers();
    const deleteOverride = vi.fn(async () => ({ success: false }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <ActionsProvider value={parentHandlers}>
        <ActionsProvider
          value={
            { deletePayment: deleteOverride } as unknown as ActionsProviderProps
          }
        >
          {children}
        </ActionsProvider>
      </ActionsProvider>
    );

    const { result } = renderHook(() => useActions(), { wrapper });

    expect(result.current).toEqual({
      ...parentHandlers,
      deletePayment: deleteOverride,
    });
  });
});
