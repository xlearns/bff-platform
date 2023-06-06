import {  Field, ID, InputType, ObjectType } from '@nestjs/graphql';


@InputType()
export class UpdateStatusInput {
  @Field(() => ID)
  id!: number;

  @Field({ description: 'User state' })
  state!: string;

  @Field({ description: 'User status' })
  status!: string;
}


@ObjectType()
export class StatusType{
  @Field(() => ID)
  id!: string;
  @Field({ description: 'status code' , nullable: true})
  msg!: string;
  @Field({ description: 'status code', nullable: true })
  code!: number;
}

