import { PartialType } from "@nestjs/mapped-types";
import { CreateMemberDTO } from "./createMembers.dto";

export class UpdateMembersDto extends PartialType(CreateMemberDTO) {}