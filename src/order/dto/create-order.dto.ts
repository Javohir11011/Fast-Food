import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;
}
