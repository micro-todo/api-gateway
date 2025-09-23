import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AppConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${configService.get<string>('jwtAccessSecret')}`,
    });
  }

  validate = (validationPayload: { sub: string; email: string }) => {
    return { id: validationPayload.sub, email: validationPayload.email };
    // const user = await this.prismaService.users.findUnique({
    //   where: { email: validationPayload.email },
    //   select: {
    //     id: true,
    //     email: true,
    //   },
    // });
    // return user;
  };
}
