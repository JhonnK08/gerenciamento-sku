import { SkuStatus, type Sku } from '@/api/types/sku';
import { DataTable } from '@/components/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { ReactElement } from 'react';
import { ActionsDropdown } from './ActionsDropdown';
import { baseColumns } from './constants';

interface SkuDataTableProps {
  data: Sku[];
  onEditRow: (id: string) => void;
  onChangeStatus: (id: string, status: SkuStatus) => void;
  loading?: boolean;
  disabledActions?: boolean;
}

export function SkuDataTable({
  data,
  onChangeStatus,
  onEditRow,
  disabledActions,
  loading,
}: Readonly<SkuDataTableProps>): ReactElement {
  const columns: ColumnDef<Sku>[] = [
    ...baseColumns,
    {
      id: 'actions',
      enableHiding: false,
      enableResizing: false,
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            id={row.original.id}
            status={row.original.status}
            onChangeStatus={onChangeStatus}
            onEdit={onEditRow}
            disabledActions={disabledActions}
          />
        );
      },
      size: 40,
      maxSize: 40,
      minSize: 40,
    },
  ];

  return <DataTable columns={columns} data={data} loading={loading} />;
}
