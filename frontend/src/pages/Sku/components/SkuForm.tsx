import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ReactElement } from 'react';

export function SkuForm(): ReactElement {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="sku">SKU</Label>
        <Input id="sku" name="sku" defaultValue="" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Descrição</Label>
        <Input id="description" name="description" defaultValue="" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="comercial-description">Descrição Comercial</Label>
        <Input
          id="comercial-description"
          name="comercial-description"
          defaultValue=""
        />
      </div>
    </div>
  );
}
