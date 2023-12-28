import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import uniqueValidator from 'mongoose-unique-validator';

import { Post, PostSchema } from '../schemas';
import { User, UserSchema } from '../schemas/user.schema';
import { DataServices } from './data-service.abastract';
import { MongoDBDataServices } from './mongodb-data.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        <MongooseModuleFactoryOptions>{
          uri: configService.get('mongoDBConnectionString'),
          connectionFactory: (connection: any) => {
            const logger = new Logger('MongoDBModule', { timestamp: true });
            if (connection.readyState === 1) {
              logger.log(
                '=======================================> MongoDB connected',
              );
            }

            connection.on('disconnected', () => {
              logger.log(
                '=======================================> MongoDB disconnected',
              );
            });
            connection.on('error', (error: any) => {
              logger.log(
                '=======================================> DB connection failed! for error: ',
                error,
              );
            });

            connection.plugin(mongoosePaginate);
            connection.plugin(uniqueValidator, {
              message: '{PATH} must be unique',
            });
            return connection;
          },
        },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [
    {
      provide: DataServices,
      useClass: MongoDBDataServices,
    },
  ],
  exports: [DataServices],
})
export class MongoDBModule {}
