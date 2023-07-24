import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User name' })
  name!: string;

  @Field({ description: 'User email' })
  password!: string;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ description: 'User name' })
  name!: string;

  @Field({ description: 'User email' })
  password!: string;
}

@ObjectType()
export class userResponse {
  @Field({ description: 'status code', nullable: true })
  code: number;
  @Field({ description: 'status code', nullable: true })
  message: string;
  @Field({ description: 'status code', nullable: true })
  data: User;
}

@ObjectType()
export class usersResponse {
  @Field({ description: 'status code', nullable: true })
  code: number;
  @Field({ description: 'status code', nullable: true })
  message: string;
  @Field(() => [User])
  data: User[];
}
