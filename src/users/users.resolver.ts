import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';

import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User } from 'src/@generated/graphql/user/user.model';
import { AuthService } from 'src/auth/auth.service';
import { UserWhereUniqueInput } from 'src/@generated/graphql/user/user-where-unique.input';
import { CreateStaffInput } from './dto/create-user.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user, newUserData);
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(
    @UserEntity() user: User,
    @Args('data') newStaffData: CreateStaffInput,
  ) {
    return this.usersService.createStaff(newStaffData, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updatStaff(
    @UserEntity() user: User,
    @Args('data') newStaffData: UpdateUserInput,
    @Args('staffId') staffId: UserWhereUniqueInput
  ) {
    return this.usersService.updateStaff(user.id, newStaffData,staffId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async deleteUser(
    @UserEntity() user: User,
    @Args('data') userId: UserWhereUniqueInput,
  ) {
    return this.usersService.deleteUser(user.id,userId.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

}
