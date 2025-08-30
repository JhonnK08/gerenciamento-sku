import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateSkuInfoDto {
  @IsNotEmpty()
  @MaxLength(200, {
    message: 'comercialDescription must be less than 200 characters',
  })
  comercialDescription: string;
}
