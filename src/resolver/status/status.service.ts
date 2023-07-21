import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serve } from '../../entities/Serve';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Serve) private readonly ServeRepo: Repository<Serve>,
  ) {}

  create() {
    return `This action adds a new Status`;
  }

  async findAll() {
    const data = await this.ServeRepo.find();
    return data;
  }

  private async findOneById(id): Promise<Serve> {
    const serveInfo = await this.ServeRepo.findOne(id);
    if (!serveInfo) {
      throw new HttpException(`not fount`, 404);
    }
    return serveInfo;
  }

  findOne(id: number) {
    return `This action returns a #${id} Status`;
  }

  update(id: number, updateStatusInput) {
    return `This action updates a #${id} Status`;
  }

  remove(id: number) {
    return `This action removes a #${id} Status`;
  }
}
