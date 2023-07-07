import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

import { BaseModel } from 'src/common/models/base.model';

import {
  User as UserPrisma,

} from '@prisma/client';
import { Todo } from 'src/@generated/graphql/todo/todo.model';
@ObjectType()
export class User extends BaseModel implements UserPrisma {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => [Todo], { nullable: true })
  todo?: Todo[];


  @HideField()
  password: string;
}
