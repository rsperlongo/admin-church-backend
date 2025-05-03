import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMemberDTO {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  @MaxLength(2)
  uf: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  phone: string;
}
