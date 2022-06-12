import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateCurrencyDTO {
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
