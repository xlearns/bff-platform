import { Module } from '@nestjs/common';
import { FederationService } from './federation.service';
import { FederationResolver } from './federation.resolver';
import { UserModule } from 'src/resolver/user/user.module';
import { StatusModule } from 'src/resolver/status/status.module';

@Module({
  imports: [UserModule, StatusModule],
  providers: [FederationResolver, FederationService],
  exports: [FederationService],
})
export class FederationModule {}
