import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async create(User: User) {
    return await this.UserRepo.save(this.UserRepo.create(User));
  }

  async findAll() {
    const data = await this.UserRepo.find();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
