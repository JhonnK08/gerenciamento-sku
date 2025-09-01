import type { Sku } from '@/api/types/sku';

export interface FormValues {
  sku: string;
  description: string;
  comercialDescription?: string;
}

export interface SkuFormProps {
  sku?: Sku;
  onSubmit: (data: FormValues) => void;
  disabled?: boolean;
}
