import { Dialog } from '@/components/Dialog';
import type { ReactElement } from 'react';

interface SkuModalProps {
  children: ReactElement;
  trigger?: ReactElement;
  edit?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SkuModal({
  children,
  open,
  trigger,
  edit,
  onOpenChange,
}: Readonly<SkuModalProps>): ReactElement {
  return (
    <Dialog
      open={open}
      trigger={trigger}
      title={edit ? 'Editar SKU' : 'Adicionar SKU'}
      onOpenChange={onOpenChange}
    >
      {children}
    </Dialog>
  );
}
