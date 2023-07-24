import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FederationService } from './federation.service';
import { Federation, Response } from './entities/federation.entity';
import { CreateFederationInput } from './dto/create-federation.input';
import { UpdateFederationInput } from './dto/update-federation.input';
import { User } from 'src/entities/User';
import { UserService } from 'src/resolver/user/user.service';
import { StatusService } from 'src/resolver/status/status.service';

@Resolver(Response)
export class FederationResolver {
  constructor(
    private readonly federationService: FederationService,
    private readonly usersService: UserService,
    private readonly StatusService: StatusService,
  ) {}

  @ResolveField('serve', () => [User], { nullable: true })
  async serve(@Parent() post: Response) {
    console.log(post, 'serve');
    return await this.StatusService.findAll();
  }

  @ResolveField('user', () => [User], { nullable: true })
  async user(@Parent() post: Response) {
    console.log(post, 'user');
    return await this.usersService.findAll();
  }

  @Mutation(() => Federation)
  createFederation(
    @Args('createFederationInput') createFederationInput: CreateFederationInput,
  ) {
    return this.federationService.create(createFederationInput);
  }

  @Query(() => Response, { name: 'findFeders' })
  async findAll() {
    return {
      code: 200,
    };
  }

  @Query(() => Federation, { name: 'findOneFeder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.federationService.findOne(id);
  }

  @Mutation(() => Federation)
  updateFederation(
    @Args('updateFederationInput') updateFederationInput: UpdateFederationInput,
  ) {
    return this.federationService.update(
      updateFederationInput.id,
      updateFederationInput,
    );
  }

  @Mutation(() => Federation)
  removeFederation(@Args('id', { type: () => Int }) id: number) {
    return this.federationService.remove(id);
  }
}
