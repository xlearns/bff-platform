import { HttpAdapterHost } from '@nestjs/core';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {UserType} from "./status.type"
@Resolver()
export class StatusResolver {
  private readonly startedAt = new Date();
  constructor(private readonly httpHost: HttpAdapterHost) {}

  @Query(() => String)
  async test() {
    return "hello world"
  }

  @Query(() => String)
  async User(@Args('parse') parse: string) {
    return `user: ${parse}`
  }

  @Subscription(()=>UserType)
  async subsUser(@Args('parse') parse: string) {
    return `subsUser: ${parse}`
  }
  @Mutation(()=>UserType)
  async createUser(@Args('parse') parse: string) {
    console.log('createUser ok',parse);
    return new Promise((resolve,reject)=>{
      resolve(parse)
    })
  }

  @Mutation(()=>UserType)
  async updateUser(@Args('parse') parse: string) {
    console.log('updateUser ok',parse);
    return new Promise((resolve,reject)=>{
      resolve(parse)
    })
  }
  @Mutation(()=>UserType)
  async deleteUser(@Args('parse') parse: string) {
    console.log('deleteUser ok',parse);
    return new Promise((resolve,reject)=>{
      resolve(parse)
    })
  }

}
