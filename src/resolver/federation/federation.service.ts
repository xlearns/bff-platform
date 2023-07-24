import { Injectable } from '@nestjs/common';
import { CreateFederationInput } from './dto/create-federation.input';
import { UpdateFederationInput } from './dto/update-federation.input';

@Injectable()
export class FederationService {
  create(createFederationInput: CreateFederationInput) {
    return 'This action adds a new federation';
  }

  async findAll() {
    return new Promise((r) => {
      r({
        code: '200',
        serve: {},
        user: {},
      });
    });
  }

  findOne(id: number) {
    return new Promise((r) => {
      r({
        message: 'find one',
      });
    });
  }

  update(id: number, updateFederationInput: UpdateFederationInput) {
    return `This action updates a #${id} federation`;
  }

  remove(id: number) {
    return `This action removes a #${id} federation`;
  }
}
