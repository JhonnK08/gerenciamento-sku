import { SkuStatus } from '@/api/types/sku';
import { DialogFormFooter } from '@/components/Dialog';
import { FormInput } from '@/components/FormInput';
import { FormTextArea } from '@/components/FormTextArea';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  defaultFormValues,
  formSchema,
  parseSkuToFormValues,
} from './constants';
import type { FormValues, SkuFormProps } from './types';

export function SkuForm({
  disabled,
  sku,
  onSubmit,
}: Readonly<SkuFormProps>): ReactElement {
  const [defaultValues, setDefaultValues] = useState(defaultFormValues);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const disabledFields = sku?.status === SkuStatus.COMPLETED_REGISTER;

  useEffect(() => {
    if (sku) {
      const newValues = parseSkuToFormValues(sku);
      setDefaultValues(newValues);
      form.reset(newValues);
    }
  }, [sku]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-7 grid gap-4">
          <div className="grid gap-3">
            <FormInput
              name="sku"
              label="SKU"
              placeholder="SKU"
              disabled={disabled || disabledFields}
            />
          </div>
          <div className="grid gap-3">
            <FormTextArea
              name="description"
              label="Descrição"
              placeholder="Descrição"
              disabled={disabled || disabledFields}
            />
          </div>
          <div className="grid gap-3">
            <FormTextArea
              name="comercialDescription"
              label="Descrição comercial"
              placeholder="Descrição comercial"
              disabled={disabled}
            />
          </div>
        </div>
        <DialogFormFooter disabled={disabled} />
      </form>
    </Form>
  );
}
