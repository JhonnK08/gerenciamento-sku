import { DialogFormFooter } from '@/components/Dialog';
import { FormInput } from '@/components/FormInput';
import { FormTextArea } from '@/components/FormTextArea';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { defaultFormValues, formSchema } from './constants';
import type { FormValues, SkuFormProps } from './types';

export function SkuForm({ onSubmit }: Readonly<SkuFormProps>): ReactElement {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-7 grid gap-4">
          <div className="grid gap-3">
            <FormInput name={'sku'} label={'SKU'} placeholder="SKU" />
          </div>
          <div className="grid gap-3">
            <FormTextArea
              name={'description'}
              label={'Descrição'}
              placeholder={'Descrição'}
            />
          </div>
          <div className="grid gap-3">
            <FormTextArea
              name={'comercialDescription'}
              label={'Descrição comercial'}
              placeholder={'Descrição comercial'}
            />
          </div>
        </div>
        <DialogFormFooter onCancel={() => console.log('cancel')} />
      </form>
    </Form>
  );
}
