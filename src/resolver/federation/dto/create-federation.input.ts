import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFederationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
