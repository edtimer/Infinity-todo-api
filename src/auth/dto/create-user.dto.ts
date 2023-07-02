import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseModel } from "src/common/models/base.model";


@InputType()
export class CreateUserDto {

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  firstname?: string;

  @Field()
  lastname?: string;


}