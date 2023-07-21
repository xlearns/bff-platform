import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, User } from './user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput);
  }

  @Query(() => User, { name: 'getAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput', { type: () => CreateUserInput })
    updateUserInput: CreateUserInput,
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
