import { SkuStatus, type Sku } from '@/api/types/sku';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import type { ReactElement } from 'react';

function ActionsDropdown({
  id,
}: Readonly<{
  id: string;
}>): ReactElement {
  return (
    <div className="flex justify-end">
      <DropdownMenu key={`actions-dropdown-${id}`}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Alterar fluxo</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              void navigator.clipboard.writeText(id);
            }}
          >
            Voltar ao pré-cadastro
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ativar</DropdownMenuItem>
          <DropdownMenuItem>Cancelar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function SkuDataTable(): ReactElement {
  const columns: ColumnDef<Sku>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
    },
    {
      accessorKey: 'description',
      header: 'DESCRIPTION',
    },
    {
      accessorKey: 'comercialDescription',
      header: 'COMERCIAL DESCRIPTION',
    },
    {
      id: 'actions',
      enableHiding: false,
      enableResizing: false,
      cell: ({ row }) => {
        return <ActionsDropdown id={row.id} />;
      },
      size: 40,
      maxSize: 40,
      minSize: 40,
    },
  ];

  const data: Sku[] = [
    {
      id: 'teste',
      sku: 'TESTE-TEST',
      status: SkuStatus.ACTIVE,
      comercialDescription: 'Test comercial',
      description: 'Test description',
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
