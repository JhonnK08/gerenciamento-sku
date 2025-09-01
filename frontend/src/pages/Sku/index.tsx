import {
  fetchSkus,
  registerSku,
  updateSkuInfo,
  updateSkuStatus,
} from '@/api/requests/sku';
import { SkuStatus, type Sku } from '@/api/types/sku';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState, type ReactElement } from 'react';
import { SkuDataTable } from './components/SkuDataTable';
import { SkuForm } from './components/SkuForm';
import type { FormValues } from './components/SkuForm/types';
import { SkuModal } from './components/SkuModal';

export function SkuPage(): ReactElement {
  const queryClient = useQueryClient();

  const { data, isPending: isPendingData } = useQuery({
    queryKey: ['fetchAllSkus'],
    queryFn: fetchAllSkus,
  });

  const { mutate: mutateInsertSku, isPending: isPendingInsert } = useMutation({
    mutationFn: insertSku,
    onSuccess: (data) => {
      if (data) {
        void queryClient.invalidateQueries({ queryKey: ['fetchAllSkus'] });
      }
    },
  });

  const { mutate: mutateUpdateStatus, isPending: isPendingUpdateStatus } =
    useMutation({
      mutationFn: updateStatusSku,
      onSuccess: (data) => {
        if (data) {
          void queryClient.invalidateQueries({ queryKey: ['fetchAllSkus'] });
        }
      },
    });

  const { mutate: mutateUpdateInfo, isPending: isPendingUpdateInfo } =
    useMutation({
      mutationFn: updateInfoSku,
      onSuccess: (data) => {
        if (data) {
          void queryClient.invalidateQueries({ queryKey: ['fetchAllSkus'] });
          setEditSku(undefined);
        }
      },
    });

  async function fetchAllSkus(): Promise<Sku[]> {
    try {
      const response = await fetchSkus();

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function insertSku(data: FormValues): Promise<Sku | undefined> {
    try {
      const response = await registerSku({
        sku: data.sku,
        comercialDescription: data.comercialDescription,
        description: data.description,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function updateStatusSku({
    id,
    newStatus,
  }: {
    id: string;
    newStatus: SkuStatus;
  }): Promise<Sku | undefined> {
    try {
      const response = await updateSkuStatus(id, {
        status: newStatus,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function updateInfoSku({
    id,
    values,
  }: {
    id: string;
    values: FormValues;
  }): Promise<Sku | undefined> {
    try {
      const response = await updateSkuInfo(id, {
        comercialDescription: values.comercialDescription,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  const [editSku, setEditSku] = useState<Sku>();

  function onChangeStatus(id: string, newStatus: SkuStatus): void {
    mutateUpdateStatus({
      id,
      newStatus,
    });
  }

  function onEditSkuRow(id: string): void {
    const foundSku = data?.find((item) => item.id === id);
    if (foundSku) {
      setEditSku(foundSku);
    }
  }

  function onOpenChangeEditModal(open: boolean) {
    if (!open) {
      setEditSku(undefined);
    }
  }

  function onSubmitEdit(values: FormValues) {
    if (!editSku) return;

    mutateUpdateInfo({
      id: editSku.id,
      values,
    });
  }

  function onSubmitAdd(values: FormValues) {
    mutateInsertSku(values);
  }

  return (
    <>
      {editSku && (
        <SkuModal open onOpenChange={onOpenChangeEditModal} edit>
          <SkuForm
            sku={editSku}
            onSubmit={onSubmitEdit}
            disabled={isPendingUpdateInfo}
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
              <SkuForm onSubmit={onSubmitAdd} disabled={isPendingInsert} />
            </SkuModal>
          </div>
          <div className="flex flex-1">
            <SkuDataTable
              data={data ?? []}
              onChangeStatus={onChangeStatus}
              onEditRow={onEditSkuRow}
              disabledActions={isPendingUpdateStatus}
              loading={isPendingData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
