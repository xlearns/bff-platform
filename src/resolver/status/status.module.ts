import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusResolver } from './status.resolver';

@Module({
  imports: [],
  providers: [StatusResolver, StatusService],
  exports:[StatusService]
})
export class StatusModule {}
