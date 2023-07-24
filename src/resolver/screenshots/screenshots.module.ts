import { Module } from '@nestjs/common';
import { ScreenshotsService } from './screenshots.service';
import { ScreenshotsController } from './screenshots.controller';

@Module({
  controllers: [ScreenshotsController],
  providers: [ScreenshotsService],
})
export class ScreenshotsModule {}
