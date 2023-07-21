import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { CommonResponse, statusResponse, stateResponse } from './status.type';
import { Inject } from '@nestjs/common';

@Resolver('Status')
export class StatusResolver {
  constructor(
    @Inject(StatusService) private readonly StatusService: StatusService,
  ) {}

  @Query(() => statusResponse, { name: 'findStatus' })
  async findAll() {
    const data = await this.StatusService.findAll();
    return { code: 200, message: '查询成功', data };
  }

  @Query(() => stateResponse, { name: 'findOneStatus' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const data = await this.StatusService.findOne(id);
    return { code: 200, message: '查询成功', data };
  }

  @Mutation(() => CommonResponse, { name: 'deleteStatus' })
  async deleteStatus(@Args('id') id: number) {
    await this.StatusService.remove(id);
    return { code: 200, message: '删除成功' };
  }
}
