import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTodoInput {

  @IsNotEmpty()
  @Field(() => String, { description: 'todo name' })
  name: String;

  @IsNotEmpty()
  @Field(() => String, { description: 'todo auhtor Id' })
  authorId: String;

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date, { description: 'todo due date' })
  dueDate: Date;

  @IsNotEmpty()
  @Field(() => String, { description: 'todo description' })
  description: String;

}
