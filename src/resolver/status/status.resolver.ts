import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { StatusType, UpdateStatusInput } from './status.type';


@Resolver(() => StatusType)
export class StatusResolver {
  constructor(private readonly StatusService: StatusService) {}

  @Mutation(() => StatusType)
  createStatus() {
    return this.StatusService.create();
  }

  @Query(() => StatusType, { name: 'getAllStatus' })
  findAll() {
    return this.StatusService.findAll();
  }

  @Query(() => StatusType, { name: 'getStatusById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.StatusService.findOne(id);
  }

  @Mutation(() => StatusType)
  updateStatus(@Args('updateStatusInput',{ type: () => UpdateStatusInput }) updateStatusInput) {
    return this.StatusService.update(updateStatusInput.id, updateStatusInput);
  }

  @Mutation(() => StatusType)
  removeStatus(@Args('id', { type: () => Int }) id: number) {
    return this.StatusService.remove(id);
  }
}
