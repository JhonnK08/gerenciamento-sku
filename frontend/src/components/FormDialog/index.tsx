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

interface FormDialogProps {
  trigger: ReactElement;
  title: string;
  children: ReactNode;
  description?: string;
  onCancel: () => void;
}

export function FormDialog({
  children,
  description,
  title,
  trigger,
  onCancel,
}: Readonly<FormDialogProps>): ReactElement {
  return (
    <UIDialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mb-2">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </UIDialog>
  );
}
