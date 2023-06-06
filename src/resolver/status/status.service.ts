import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  create() {
    return `This action adds a new Status`;
  }

  findAll() {
    return `This action returns all Status`;
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
