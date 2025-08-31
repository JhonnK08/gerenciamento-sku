export interface FormValues {
  sku: string;
  description: string;
  comercialDescription?: string;
}

export interface SkuFormProps {
  onSubmit: (data: FormValues) => void;
}
