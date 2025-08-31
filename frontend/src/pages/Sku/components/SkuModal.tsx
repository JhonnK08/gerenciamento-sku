import { FormDialog } from '@/components/FormDialog';
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
    <FormDialog
      trigger={trigger}
      title={'Add SKU'}
      onCancel={() => console.log('cancel')}
    >
      {children}
    </FormDialog>
  );
}
