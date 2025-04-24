import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from 'src/@core/domain/dto/Update-user.dto';
import { forgotPasswordDto } from 'src/@core/domain/dto/forgot-password.dto';
import { resetPasswordDto } from 'src/@core/domain/dto/reset-password.dto';
import { Role } from './roles.decorator';
import { Roles as UserRoles } from './enum/role.enum';
import { RolesGuard } from 'src/auth/auth.guard';
import UserEntity from 'src/@core/domain/entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.getById(id);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: forgotPasswordDto) {
    await this.usersService.forgotPassword(forgotPasswordDto.email);
    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: resetPasswordDto) {
    await this.usersService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
    return { message: 'Password has been reset successfully' };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUsersDto,
  ): Promise<UpdateUsersDto> {
    return await this.usersService.update(id, updateUser);
  }

  @Delete('/:id')
  @Role(UserRoles.Admin)
  @UseGuards(RolesGuard)
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
