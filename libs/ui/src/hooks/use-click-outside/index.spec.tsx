import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useClickOutside from './index';

type TestComponentProps = {
  onOutsideClick: () => void;
};

function TestComponent({ onOutsideClick }: TestComponentProps) {
  const ref = useClickOutside<HTMLDivElement>(onOutsideClick);

  return (
    <div>
      <button type="button" data-testid="outside">
        outside
      </button>
      <div ref={ref} data-testid="inside">
        <span data-testid="inside-child">inside</span>
      </div>
    </div>
  );
}

describe('useClickOutside', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('calls the handler when clicking outside the referenced element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onOutsideClick={handler} />);

    fireEvent.click(getByTestId('outside'));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler when clicking inside the referenced element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onOutsideClick={handler} />);

    fireEvent.click(getByTestId('inside-child'));

    expect(handler).not.toHaveBeenCalled();
  });

  it('ignores clicks while the ref is not attached to an element', () => {
    const handler = vi.fn();

    renderHook(() => useClickOutside<HTMLDivElement>(handler));
    fireEvent.click(document.body);

    expect(handler).not.toHaveBeenCalled();
  });

  it('removes the document click listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const handler = vi.fn();
    const { unmount } = render(<TestComponent onOutsideClick={handler} />);

    // @ts-expect-error Mock function props
    const clickListener = addEventListenerSpy.mock.calls.findLast(
      ([eventName]: string[]) => eventName === 'click',
    )?.[1];

    expect(clickListener).toBeTypeOf('function');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', clickListener);
  });
});
