import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(4)
  readonly password: string;
}
