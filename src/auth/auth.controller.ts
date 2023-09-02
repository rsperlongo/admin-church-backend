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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: UsersDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Body() loginUserDto: LogInDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  async logOut(@Res() res: Response) {
    return res.status;
  }
}
