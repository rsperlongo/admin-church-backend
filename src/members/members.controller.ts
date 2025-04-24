import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { UpdateMembersDto } from 'src/@core/domain/dto/updateMembers.dto';
import { CreateMemberDTO } from 'src/@core/domain/dto/createMembers.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post('create')
  async postMembers(@Body() members: CreateMemberDTO) {
    return this.membersService.createMember(members);
  }

  @Get()
  async GetMembers() {
    return this.membersService.findAll();
  }

  @Get('/:id')
  async getByIdMembers(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch('/:id')
  async updateMember(
    @Param('id') id: string,
    @Body() updateMember: UpdateMembersDto,
  ): Promise<UpdateMembersDto> {
    return await this.membersService.update(id, updateMember);
  }

  @Delete('/:id')
  async removeMember(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
