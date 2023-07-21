import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
// must auto gen schema-> shema.gql

@ObjectType()
export class StatusType {
  @Field(() => ID)
  id!: string;
  @Field({ description: 'status code', nullable: true })
  password!: number;
  @Field({ description: 'status code', nullable: true })
  host!: string;
  @Field({ description: 'status code', nullable: true })
  port!: number;
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
