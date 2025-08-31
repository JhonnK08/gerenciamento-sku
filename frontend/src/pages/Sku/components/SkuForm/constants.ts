import z from 'zod';
import type { FormValues } from './types';

export const formSchema = z.object({
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

export const defaultFormValues: FormValues = {
  description: '',
  sku: '',
  comercialDescription: undefined,
};
