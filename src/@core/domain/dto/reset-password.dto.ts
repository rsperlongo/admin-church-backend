import { IsString, Matches, MinLength } from "class-validator";

export class resetPasswordDto {

    @IsString()
    @MinLength(4)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    token: string;
    newPassword: string;
}