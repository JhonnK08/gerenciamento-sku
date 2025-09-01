import type { Sku, SkuStatus } from '@/api/types/sku';
import type { ColumnDef } from '@tanstack/react-table';

function parseStatusLabel(status: SkuStatus): string {
  switch (status) {
    case 'PRE_REGISTER':
      return 'Pré-cadastro';
    case 'COMPLETED_REGISTER':
      return 'Cadastro completo';
    case 'ACTIVE':
      return 'Ativo';
    case 'INACTIVE':
      return 'Desativado';
    case 'CANCEL':
      return 'Cancelado';
    default:
      throw new Error('Status not exists.');
  }
}

function handleDescriptionString(description?: string): string {
  if (!description) return '-';

  return description.length > 30
    ? description.substring(0, 30) + '...'
    : description;
}

export const baseColumns: ColumnDef<Sku>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  },
  {
    id: 'sku',
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    id: 'description',
    header: 'DESCRIÇÃO',
    accessorFn: (row) => handleDescriptionString(row.description),
  },
  {
    id: 'comercial-description',
    header: 'DESCRIÇÃO COMERCIAL',
    accessorFn: (row) => handleDescriptionString(row.comercialDescription),
  },
  {
    id: 'status',
    header: 'STATUS',
    accessorFn: (row) => {
      return parseStatusLabel(row.status);
    },
  },
];
