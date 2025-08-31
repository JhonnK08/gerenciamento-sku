import { DialogFormFooter } from '@/components/Dialog';
import { FormInput } from '@/components/FormInput';
import { FormTextArea } from '@/components/FormTextArea';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormValues {
  sku: string;
  description: string;
  comercialDescription?: string;
}

interface SkuFormProps {
  onSubmit: (data: FormValues) => void;
}

const formSchema = z.object({
  sku: z
    .string()
    .min(10, {
      error: 'SKU must be at least 10 characters.',
    })
    .max(50, {
      error: 'SKU must be at most 50 characters.',
    })
    .nonempty({
      error: 'SKU is required.',
    }),
  description: z
    .string()
    .min(10, {
      error: 'Description must be at least 10 characters.',
    })
    .max(200, {
      error: 'Description must be at most 200 characters.',
    })
    .nonempty({
      error: 'Description is required.',
    }),
  comercialDescription: z
    .string()
    .min(10, {
      error: 'Comercial description must be at least 10 characters.',
    })
    .max(200, {
      error: 'Comercial description must be at most 200 characters.',
    })
    .optional(),
});

export function SkuForm({ onSubmit }: Readonly<SkuFormProps>): ReactElement {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comercialDescription: '',
      description: '',
      sku: '',
    },
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
