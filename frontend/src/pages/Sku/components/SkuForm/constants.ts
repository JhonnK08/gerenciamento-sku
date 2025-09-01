import type { Sku } from '@/api/types/sku';
import z from 'zod';
import type { FormValues } from './types';

export const formSchema = z.object({
  sku: z
    .string()
    .min(10, {
      error: 'SKU deve possuir no mínimo 10 caracteres',
    })
    .max(50, {
      error: 'SKU deve possuir no mínimo 50 caracteres.',
    })
    .nonempty({
      error: 'SKU é obrigatório.',
    }),
  description: z
    .string()
    .min(10, {
      error: 'Descrição deve possuir no mínimo 10 caracteres.',
    })
    .max(200, {
      error: 'Deve possuir até 200 caracteres.',
    })
    .nonempty({
      error: 'Descrição é obrigatória.',
    }),
  comercialDescription: z
    .string()
    .min(10, {
      error: 'Deve possuir no mínimo 10 caracteres.',
    })
    .max(200, {
      error: 'Deve possuir até 200 caracteres.',
    })
    .optional(),
});

export const defaultFormValues: FormValues = {
  description: '',
  sku: '',
  comercialDescription: undefined,
};

export const parseSkuToFormValues = (sku: Sku): FormValues => {
  return {
    description: sku.description ?? '',
    sku: sku.sku,
    comercialDescription: sku.comercialDescription ?? undefined,
  };
};
