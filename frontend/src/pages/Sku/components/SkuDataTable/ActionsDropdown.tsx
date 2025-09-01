import { SkuStatus } from '@/api/types/sku';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';

type ActionOption = {
  label: string;
  onClick: () => void;
};

type ActionOptions = {
  main: ActionOption;
  additionalOptions?: ActionOption[];
};

interface ActionsDropdownProps {
  id: string;
  status: SkuStatus;
  onEdit: (id: string) => void;
  onChangeStatus: (id: string, newStatus: SkuStatus) => void;
  disabledActions?: boolean;
}

export function ActionsDropdown({
  id,
  status,
  onChangeStatus,
  onEdit,
  disabledActions,
}: Readonly<ActionsDropdownProps>): ReactNode {
  const options = useMemo<ActionOptions | null>(() => {
    switch (status) {
      case SkuStatus.PRE_REGISTER:
        return {
          main: { label: 'Completar cadastro', onClick: () => onEdit(id) },
          additionalOptions: [
            {
              label: 'Cancelar',
              onClick: () => onChangeStatus(id, SkuStatus.CANCEL),
            },
          ],
        };
      case SkuStatus.COMPLETED_REGISTER:
        return {
          main: { label: 'Editar cadastro', onClick: () => onEdit(id) },
          additionalOptions: [
            {
              label: 'Ativar',
              onClick: () => onChangeStatus(id, SkuStatus.ACTIVE),
            },
            {
              label: 'Cancelar',
              onClick: () => onChangeStatus(id, SkuStatus.CANCEL),
            },
          ],
        };
      case SkuStatus.ACTIVE:
        return {
          main: {
            label: 'Desativar',
            onClick: () => onChangeStatus(id, SkuStatus.INACTIVE),
          },
        };
      case SkuStatus.INACTIVE:
        return {
          main: {
            label: 'Ativar',
            onClick: () => onChangeStatus(id, SkuStatus.ACTIVE),
          },
          additionalOptions: [
            {
              label: 'Voltar ao pré-cadastro',
              onClick: () => onChangeStatus(id, SkuStatus.PRE_REGISTER),
            },
          ],
        };
      default:
        return null;
    }
  }, [id, status]);

  if (!options) return null;

  return (
    <div className="flex justify-end">
      <DropdownMenu key={`actions-dropdown-${id}`}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={disabledActions}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={options.main.onClick}>
            {options.main.label}
          </DropdownMenuItem>
          {!!options.additionalOptions?.length && (
            <>
              <DropdownMenuSeparator />
              {options.additionalOptions.map((item) => (
                <DropdownMenuItem
                  key={`dropdown-item-${item.label.toLowerCase()}`}
                  onClick={item.onClick}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
