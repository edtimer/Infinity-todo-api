import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class UserIdArg {
  @IsNotEmpty()
  userId: string;
}