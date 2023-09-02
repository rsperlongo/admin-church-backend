import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UsersDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
