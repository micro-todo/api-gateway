import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class AccessTokenGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // eslint-disable-next-line
      console.error('Auth failed:', { err, info, user });
      throw err || new UnauthorizedException();
    }
    console.log('Auth success, user:', user);
    // eslint-disable-next-line
    return user;
  }
}
