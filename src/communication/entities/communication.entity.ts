import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EmailCommunication {
  @Field(() => String)
  to: string;
  @Field(() => String)
  subject: string;
}
