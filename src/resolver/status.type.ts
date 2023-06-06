import {  Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType{
  @Field(() => ID)
  id!: string;

  @Field({ description: 'User name' })
  name!: string;

  @Field({ description: 'User email' })
  email!: string;
 
  //Cannot return null for non-nullable field
  @Field({ description: 'User avatar url', nullable: true })
  avatarUrl!: string;

  @Field({ description: 'User created date', nullable: true })
  createdAt!: Date;
}

