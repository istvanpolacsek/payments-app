import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface UseDialogHandlers {
  onClose: () => void;
  onSetDialog: (dialog: string) => void;
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

  const onSetDialog = (dialog: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set('d', dialog);
    push(`${pathname}?${newParams.toString()}`);
  };

  return {
    onClose,
    onSetDialog,
  };
}

export default useDialogHandlers;
