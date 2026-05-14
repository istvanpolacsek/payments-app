import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useDialogHandlers from './index';

const pushMock = vi.fn();
const usePathnameMock = vi.fn();
const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => usePathnameMock(),
  useSearchParams: () => useSearchParamsMock(),
}));

describe('useDialogHandlers', () => {
  beforeEach(() => {
    pushMock.mockReset();
    usePathnameMock.mockReturnValue('/payments');
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
  });

  it('removes the dialog parameter when closing', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams('d=confirm&id=payment-1&mode=complete'),
    );

    const { result } = renderHook(() => useDialogHandlers());

    result.current.onClose();

    expect(pushMock).toHaveBeenCalledWith('/payments?id=payment-1&mode=complete');
  });

  it('opens a dialog without extra params', () => {
    const { result } = renderHook(() => useDialogHandlers());

    result.current.onSetDialog('create');

    expect(pushMock).toHaveBeenCalledWith('/payments?d=create');
  });

  it('opens a dialog with the provided params', () => {
    const { result } = renderHook(() => useDialogHandlers());

    result.current.onSetDialog('confirm', {
      id: 'payment-1',
      mode: 'complete',
    });

    expect(pushMock).toHaveBeenCalledWith(
      '/payments?id=payment-1&mode=complete&d=confirm',
    );
  });
});
