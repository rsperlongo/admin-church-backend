import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { UsersDto } from 'src/@core/domain/dto/Users.dto';
import { LogInDto } from 'src/@core/domain/dto/Login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import RegisterDto from 'src/@core/domain/dto/Register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() registrationData: RegisterDto,
  ) {
    const user = await this.authService.register(registrationData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Body() loginUserDto: LogInDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  async logOut(@Res() res: Response) {
    return res.status;
  }
}
