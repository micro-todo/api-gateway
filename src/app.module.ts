import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { AuthModule } from './auth/auth.module';
import { GlobalClientsModule } from './global-clients/global-clients.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    GlobalClientsModule,
    AuthModule,
  ],
  controllers: [TasksController],
})
export class AppModule {}
