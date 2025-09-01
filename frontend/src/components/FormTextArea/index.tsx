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
import { Textarea } from '../ui/textarea';

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  description?: ReactNode;
  disabled?: boolean;
}

export function FormTextArea({
  label,
  name,
  placeholder,
  description,
  disabled,
}: Readonly<FormTextAreaProps>): ReactElement {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              className="resize-none"
              disabled={disabled}
            />
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
