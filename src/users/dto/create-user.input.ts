import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateStaffInput {
  @Field()
  @IsNotEmpty()
  firstname: string;
  @Field()
  @IsNotEmpty()
  lastname: string;
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

}
