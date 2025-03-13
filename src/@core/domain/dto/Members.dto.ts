import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class MemberDto {
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
  uf: string;

  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPhoneNumber()
  Phone: number;
}
