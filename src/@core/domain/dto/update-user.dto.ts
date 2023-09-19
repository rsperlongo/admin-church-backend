import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './Users.dto';

export class UpdateUsersDto extends PartialType(UserDto) {}
