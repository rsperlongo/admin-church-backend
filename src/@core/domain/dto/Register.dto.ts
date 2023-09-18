import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, minLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsOptional()
  name: string
}

export default RegisterDto;
