import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { FederationModule } from './federation/federation.module';
import { ScreenshotsModule } from './screenshots/screenshots.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UserModule,
    StatusModule,
    FederationModule,
    ScreenshotsModule,
    UploadModule,
  ],
})
export class ResolverModule {}
