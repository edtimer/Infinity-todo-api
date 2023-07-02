import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  @IsNotEmpty()
  email?: string;

  @Field()
  @IsNotEmpty()
  id?: string;
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password?: string;
}
