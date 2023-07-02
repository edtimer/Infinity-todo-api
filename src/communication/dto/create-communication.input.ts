import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEmailInput {
  @Field()
  @IsNotEmpty()
  sendTo: string;
  @Field()
  @IsNotEmpty()
  subject: string;
  @Field()
  object:string;
}
