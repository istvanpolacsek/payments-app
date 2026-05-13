import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type OnSetDialog = (dialog: string, params?: Record<string, string>) => void;

interface UseDialogHandlers {
  onClose: () => void;
  onSetDialog: OnSetDialog;
}

function useDialogHandlers(): UseDialogHandlers {
  const { push } = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const onClose = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete('d');
    push(`${pathname}?${newParams.toString()}`);
  };

  const onSetDialog: OnSetDialog = (dialog, params = {}) => {
    const newParams = new URLSearchParams(params);
    newParams.set('d', dialog);
    Object.entries(params).forEach(([key, value]) => newParams.set(key, value));
    push(`${pathname}?${newParams.toString()}`);
  };

  return {
    onClose,
    onSetDialog,
  };
}

export default useDialogHandlers;
