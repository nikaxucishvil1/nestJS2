import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsEmail,
  Length
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3)
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(16, { message: 'you must be at least 16 years old' })
  @Max(80, { message: 'your age should be under or equal to 80' })
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
