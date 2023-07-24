import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusResolver } from './status.resolver';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Serve } from 'src/entities/Serve';

@Module({
  imports: [TypeOrmModule.forFeature([Serve])],
  providers: [StatusResolver, StatusService],
  exports: [StatusService],
})
export class StatusModule {}
