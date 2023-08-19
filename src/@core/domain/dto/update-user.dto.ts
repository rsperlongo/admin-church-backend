import { PartialType } from '@nestjs/mapped-types';
import { UsersDto } from './Users.dto';

export class UpdateUsersDto extends PartialType(UsersDto) {}
