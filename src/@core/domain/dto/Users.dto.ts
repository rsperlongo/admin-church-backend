import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  id?: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  // @IsNotEmpty()
  // password: string;

  createdOn?: Date;
}
