import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serve } from 'src/entities/Serve';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Serve) private readonly ServeRepo: Repository<Serve>,
  ) {}

  async create(serve: Serve): Promise<Serve> {
    return this.ServeRepo.save(this.ServeRepo.create(serve));
  }

  async findAll() {
    const data = await this.ServeRepo.find();
    return data;
  }

  private async findOneById(id: number): Promise<Serve> {
    const serveInfo = await this.ServeRepo.findOne({ where: { id } });
    if (!serveInfo) {
      throw new HttpException(`指定 id=${id} 的status不存在`, 404);
    }
    return serveInfo;
  }

  async findOne(id: number) {
    return this.findOneById(id);
  }

  update(id: number, updateStatusInput) {
    return `This action updates a #${id} Status`;
  }

  async remove(id: number): Promise<void> {
    await this.findOneById(id);
    this.ServeRepo.delete(id);
  }
}
