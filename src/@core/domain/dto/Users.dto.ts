import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;
}
