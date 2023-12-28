import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard, PermissionsGuard, RolesGuard, TrimPipe } from './common';
import { ConfigurationModule } from './configs';
import { MainModule } from './modules/main.module';
import { MongoDBModule } from './repository';

@Module({
  imports: [ConfigurationModule, MongoDBModule, MainModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_PIPE,
      useClass: TrimPipe,
    },
  ],
})
export class AppModule {}
