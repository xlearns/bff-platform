import { Field, ObjectType } from '@nestjs/graphql';

export interface Result {
  code: number;
  message: string;
  data?: any;
}

@ObjectType()
export class CommonResponse {
  @Field({ description: 'status code', nullable: true })
  code: number;
  @Field({ description: 'status code', nullable: true })
  message: string;
}
