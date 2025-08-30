import { IsIn, IsNotEmpty } from 'class-validator';
import { AllowedTransitionStatus, SkuStatus } from '../entities/sku.entity';

export class UpdateSkuStatusDto {
  @IsNotEmpty()
  @IsIn(AllowedTransitionStatus, {
    message: 'Invalid status',
  })
  status: SkuStatus;
}
