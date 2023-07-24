import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/User';

import { CreateUserInput, userResponse, usersResponse } from './user.type';
import { CommonResponse } from 'src/common/result.interface';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => CommonResponse, { name: 'createUser' })
  async create(
    @Args('user', { type: () => CreateUserInput })
    user: User,
  ) {
    await this.userService.create(user);
    return { code: 200, message: '创建成功' };
  }

  @Query(() => usersResponse, { name: 'findUsers' })
  async findAll() {
    const data = await this.userService.findAll();
    return { code: 200, message: '查询成功', data };
  }

  @Query(() => userResponse, { name: 'findOneUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const data = this.userService.findOne(id);
    return { code: 200, message: '查询成功', data };
  }
}
