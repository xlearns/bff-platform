import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [UserModule, StatusModule],
})
export class ResolverModule {}
