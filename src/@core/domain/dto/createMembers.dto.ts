import { IsString } from 'class-validator';

export class CreateMemberDTO {
  @IsString()
  memberName: string;
}