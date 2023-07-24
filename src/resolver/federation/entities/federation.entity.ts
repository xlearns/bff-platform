import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StatusType } from 'src/resolver/status/status.type';
import { User } from 'src/resolver/user/user.type';

@ObjectType()
export class Federation {
  @Field({ description: 'Example field (placeholder)', nullable: true })
  message: string;
}

@ObjectType()
export class Response {
  @Field(() => Int)
  code?: number;
  @Field(() => [User], { nullable: true })
  user?: User[];
  @Field(() => [StatusType], { nullable: true })
  serve?: StatusType[];
}
