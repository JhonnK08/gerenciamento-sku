import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSkuDto {
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  comercialDescription?: string;

  @IsOptional()
  @IsBoolean()
  canceled?: boolean;
}
