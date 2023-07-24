import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { FederationModule } from './federation/federation.module';

@Module({
  imports: [UserModule, StatusModule, FederationModule],
})
export class ResolverModule {}
