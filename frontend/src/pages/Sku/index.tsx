import { SkuStatus, type Sku } from '@/api/types/sku';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState, type ReactElement } from 'react';
import { SkuDataTable } from './components/SkuDataTable';
import { SkuForm } from './components/SkuForm';
import { SkuModal } from './components/SkuModal';

export function SkuPage(): ReactElement {
  const data: Sku[] = [
    {
      id: 'teste',
      sku: 'TESTE-TEST',
      status: SkuStatus.ACTIVE,
      comercialDescription: 'Test comercial',
      description: 'Test description',
    },
    {
      id: 'teste2',
      sku: 'TESTE-TEST2',
      status: SkuStatus.CANCEL,
      comercialDescription: 'Test comercial2',
      description: 'Test description2',
    },
    {
      id: 'teste3',
      sku: 'TESTE-TEST3',
      status: SkuStatus.COMPLETED_REGISTER,
      comercialDescription:
        'Produto desenvolvido com alta qualidade, projetado para oferecer durabilidade, desempenho superior e design moderno. Ideal para atender diferentes necessidades com eficiência.',
      description: 'Test description3',
    },
    {
      id: 'teste4',
      sku: 'TESTE-TEST4',
      status: SkuStatus.INACTIVE,
      comercialDescription: 'Test comercial4',
      description: 'Test description4',
    },
    {
      id: 'teste5',
      sku: 'TESTE-TEST5',
      status: SkuStatus.PRE_REGISTER,
      comercialDescription: 'Test comercial5',
      description: 'Test description5',
    },
  ];

  const [editSku, setEditSku] = useState<Sku>();

  function onChangeStatus(id: string, status: SkuStatus): void {
    //TODO - request to change status
  }

  function onEditSkuRow(id: string): void {
    const foundSku = data.find((item) => item.id === id);
    if (foundSku) {
      setEditSku(foundSku);
    }
  }

  function onOpenChangeEditModal(open: boolean) {
    if (!open) {
      setEditSku(undefined);
    }
  }

  return (
    <>
      {editSku && (
        <SkuModal open onOpenChange={onOpenChangeEditModal} edit>
          <SkuForm
            sku={editSku}
            onSubmit={(data) => console.log('Editar SKU', data)}
          />
        </SkuModal>
      )}
      <div className="flex h-dvh w-dvw flex-col items-center justify-start gap-7 p-7">
        <div>
          <h1 className="scroll-m-20 text-balance text-center text-3xl font-extrabold tracking-tight">
            Gerenciamento de SKUs
          </h1>
        </div>

        <div className="flex w-full flex-1 flex-col gap-6">
          <div className="flex h-9">
            <SkuModal
              trigger={
                <Button className="ml-auto">
                  <Plus />
                  Adicionar SKU
                </Button>
              }
            >
              <SkuForm onSubmit={(data) => console.log('data', data)} />
            </SkuModal>
          </div>
          <div className="flex flex-1">
            <SkuDataTable
              data={data}
              onChangeStatus={onChangeStatus}
              onEditRow={onEditSkuRow}
            />
          </div>
        </div>
      </div>
    </>
  );
}
