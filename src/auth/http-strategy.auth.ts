import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(username, password);
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
