import { Dialog } from '@/components/Dialog';
import type { ReactElement } from 'react';

interface SkuModalProps {
  children: ReactElement;
  trigger: ReactElement;
}

export function SkuModal({
  children,
  trigger,
}: Readonly<SkuModalProps>): ReactElement {
  return (
    <Dialog trigger={trigger} title={'Add SKU'}>
      {children}
    </Dialog>
  );
}
