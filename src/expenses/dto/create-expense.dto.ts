import { IsString, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  despription: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(1000)
  @Min(10)
  amount: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

