import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Body,
  Res,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LogInDto } from 'src/@core/domain/dto/Login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { CreateUserDto } from 'src/@core/domain/dto/createUser.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { dbUsers } from 'src/constants/user';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, emailService: EmailService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  async logIn(@Body() loginUserDto: LogInDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  async logOut(@Res() res: Response) {
    return res.status;
  }

  @Post('forgot-password')
  async forgotPassword(email: string): Promise<void> {
    const user = dbUsers.find((user) => user.email === email);
    if(!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() { token, password }: { token: string; password: string }
): Promise<void> {
    return this.authService.resetPassword(token, password);
}
}
