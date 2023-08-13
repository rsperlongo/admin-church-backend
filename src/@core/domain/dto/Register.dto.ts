import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default RegisterDto;
