import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  id!: number;

  @Field({ description: 'User name' })
  name!: string;

  @Field({ description: 'User email' })
  email!: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field({ description: 'User name', nullable: true })
  name!: string;

  @Field({ description: 'User email' })
  email!: string;

  //nullable:true allows null values
  @Field({ description: 'User avatar url', nullable: true })
  avatarUrl!: string;

  @Field({ description: 'User created date', nullable: true })
  createdAt!: Date;
}
