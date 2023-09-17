import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload-interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(payload: JwtPayload, password: string) {
    const user = await this.authService.validateUser(payload, password);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
