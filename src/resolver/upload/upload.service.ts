import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async processFile(file: any): Promise<void> {}

  private async saveFileToDatabase(file: any): Promise<void> {}
}
