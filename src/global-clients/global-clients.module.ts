import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { AppConfig } from 'src/config/app.config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'USER_SERVICE',
        useFactory: (configService: ConfigService<AppConfig>) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('userServiceHost'),
            port: configService.get<number>('userServicePort'),
          },
        }),
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: 'TASKS_SERVICE',
        useFactory: (configService: ConfigService<AppConfig>) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('tasksServiceHost'),
            port: configService.get<number>('tasksServicePort'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientsModule {}
