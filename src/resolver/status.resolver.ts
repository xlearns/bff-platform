import { HttpAdapterHost } from '@nestjs/core';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class StatusResolver {
  private readonly startedAt = new Date();
  constructor(private readonly httpHost: HttpAdapterHost) {}

  @Query(() => String)
  async status() {
    return `The ${this.httpHost.httpAdapter.getType()} server is up and running for ${
      (Date.now() - this.startedAt.getTime()) / 1000
    } seconds.`;
  }
}
