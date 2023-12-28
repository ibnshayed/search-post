/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDBConfiguration } from './db';
import { EnvConfiguration } from './env';
import { JwtConfiguration } from './jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration, MongoDBConfiguration, JwtConfiguration],
    }),
  ],
})
export class ConfigurationModule {}
