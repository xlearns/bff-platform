import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { statusResponse, stateResponse, CreateStateInput } from './status.type';
import { Inject } from '@nestjs/common';
import { CommonResponse, Result } from 'src/common/result.interface';
import { Serve } from 'src/entities/Serve';

@Resolver('Status')
export class StatusResolver {
  constructor(
    @Inject(StatusService) private readonly StatusService: StatusService,
  ) {}

  @Query(() => statusResponse, { name: 'findStatus' })
  async findAll(): Promise<Result> {
    const data = await this.StatusService.findAll();
    return { code: 200, message: '查询成功', data };
  }

  @Query(() => stateResponse, { name: 'findOneStatus' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Result> {
    const data = await this.StatusService.findOne(id);
    return { code: 200, message: '查询成功', data };
  }

  @Mutation(() => CommonResponse, { name: 'createState' })
  async create(
    @Args('state', { type: () => CreateStateInput }) state: Serve,
  ): Promise<Result> {
    await this.StatusService.create(state);
    return { code: 200, message: '创建成功' };
  }

  @Mutation(() => CommonResponse, { name: 'deleteStatus' })
  async deleteStatus(@Args('id', { type: () => Int }) id: number) {
    await this.StatusService.remove(id);
    return { code: 200, message: '删除成功' };
  }
}
