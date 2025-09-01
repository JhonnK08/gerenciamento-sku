import type { ReactElement, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: ReactNode;
  disabled?: boolean;
}

export function FormInput({
  description,
  label,
  name,
  placeholder,
  disabled,
}: Readonly<FormInputProps>): ReactElement {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} disabled={disabled} />
          </FormControl>
          {description !== undefined && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
