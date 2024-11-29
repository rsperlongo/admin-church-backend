import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";

export class ProfileDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly role: Role;


}