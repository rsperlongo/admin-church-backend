import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
