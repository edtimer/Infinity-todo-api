import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from 'src/@generated/graphql/todo/todo.model';
import { PrismaService } from 'nestjs-prisma';
import { TodoCreateInput } from 'src/@generated/graphql/todo/todo-create.input';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/@generated/graphql/user/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';


@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}
  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  createTodo(@UserEntity() user: User,@Args('createTodoInput') createTodoInput: TodoCreateInput) {
    return this.todosService.create(user,createTodoInput);
  }

  @Query(() => [Todo], { name: 'getAllTodos' })
  findAll() {
    return this.todosService.findAll();
  }

  @Query(() => Todo, { name: 'getSingleTodo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.findOne(id);
  }
  @Query(() => [Todo], { name: 'findTodoByUser' })
  findTodoByUser(@Args('userId') userId:string) {
    return this.todosService.findTodoByUser(userId);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.remove(id);
  }
}
