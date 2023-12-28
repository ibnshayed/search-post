import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { PostModule } from './post';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, UserModule, PostModule],
})
export class MainModule {}
