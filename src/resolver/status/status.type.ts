import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
// must auto gen schema-> shema.gql

@ObjectType()
export class StatusType {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field({ description: 'status code', nullable: true })
  password!: string;
  @Field({ description: 'status code', nullable: true })
  host!: string;
  @Field({ description: 'status code', nullable: true })
  port!: string;
  @Field({ description: 'status code', nullable: true })
  user!: string;
}

@ObjectType()
export class CommonResponse {
  @Field({ description: 'status code', nullable: true })
  code: number;
  @Field({ description: 'status code', nullable: true })
  message: string;
}

@ObjectType()
export class stateResponse {
  @Field({ description: 'status code', nullable: true })
  code: number;
  @Field({ description: 'status code', nullable: true })
  message: string;
  @Field({ description: 'status code', nullable: true })
  data: StatusType;
}

@ObjectType()
export class statusResponse {
  @Field({ description: 'status code', nullable: true })
  code: number;
  @Field({ description: 'status code', nullable: true })
  message: string;
  @Field(() => [StatusType])
  data: StatusType[];
}

@InputType()
export class CreateStateInput {
  @Field({ description: 'User name' })
  user!: string;

  @Field({ description: 'User email' })
  password!: string;

  @Field({ description: 'User email' })
  host!: string;

  @Field({ description: 'User email' })
  port!: number;
}
