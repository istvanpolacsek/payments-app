import { type RefObject, useEffect, useRef } from 'react';

function useClickOutside<T extends HTMLElement>(
  handler: () => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const isInsideRef =
        event.composedPath().includes(element) ||
        (event.target instanceof Node && element.contains(event.target));

      if (!isInsideRef) {
        handler();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handler]);

  return ref;
}

export default useClickOutside;
