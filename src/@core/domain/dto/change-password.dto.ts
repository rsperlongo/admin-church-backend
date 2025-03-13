import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(4)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  newPassword: string;
}
