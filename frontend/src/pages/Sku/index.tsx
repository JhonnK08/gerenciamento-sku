import { Button } from '@/components/ui/button';
import type { ReactElement } from 'react';
import { SkuDataTable } from './components/SkuDataTable';
import { SkuForm } from './components/SkuForm';
import { SkuModal } from './components/SkuModal';

export function SkuPage(): ReactElement {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-start gap-7 p-7">
      <div>
        <h1 className="scroll-m-20 text-balance text-center text-3xl font-extrabold tracking-tight">
          SKU Management
        </h1>
      </div>

      <div className="flex w-full flex-1 flex-col gap-6">
        <div className="flex h-9">
          <SkuModal trigger={<Button className="ml-auto">Add SKU</Button>}>
            <SkuForm />
          </SkuModal>
        </div>
        <div className="flex flex-1">
          <SkuDataTable />
        </div>
      </div>
    </div>
  );
}
