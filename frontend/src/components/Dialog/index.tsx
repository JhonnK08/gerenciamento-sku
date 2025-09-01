import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog as UIDialog,
} from '@/components/ui/dialog';
import type { ReactElement, ReactNode } from 'react';
import { Button } from '../ui/button';

interface DialogProps {
  title: string;
  children: ReactNode;
  description?: string;
  open?: boolean;
  trigger?: ReactElement;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  description,
  open,
  title,
  trigger,
  onOpenChange,
}: Readonly<DialogProps>): ReactElement {
  return (
    <UIDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-2">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </UIDialog>
  );
}

export function DialogFormFooter({
  onCancel,
}: Readonly<{
  onCancel: () => void;
}>): ReactElement {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  );
}
