import type { ColumnDef } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkuStatus } from '../../api/types/sku';
import { DataTable } from './index';

interface Sku {
  id: string;
  sku: string;
  status: SkuStatus;
}

const columns: ColumnDef<Sku>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
  },
];

describe('DataTable', () => {
  it('should render correctly the columns', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('SKU')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should render rows when there are data', () => {
    const data: Sku[] = [
      { id: '1', sku: 'SKU001', status: SkuStatus.ACTIVE },
      { id: '2', sku: 'SKU002', status: SkuStatus.INACTIVE },
    ];

    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('SKU001')).toBeInTheDocument();
    expect(screen.getByText(SkuStatus.ACTIVE)).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('SKU002')).toBeInTheDocument();
    expect(screen.getByText(SkuStatus.INACTIVE)).toBeInTheDocument();
  });

  it('should render message "Sem resultados." when there are no data', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('Sem resultados.')).toBeInTheDocument();
  });

  it('should render LoadingSpinner when loading is true', () => {
    render(<DataTable columns={columns} data={[]} loading />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
