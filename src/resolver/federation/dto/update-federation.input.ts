import { CreateFederationInput } from './create-federation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFederationInput extends PartialType(CreateFederationInput) {
  @Field(() => Int)
  id: number;
}
