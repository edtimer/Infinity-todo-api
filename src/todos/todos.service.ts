import { Injectable, UseGuards } from '@nestjs/common';

import { UpdateTodoInput } from './dto/update-todo.input';

import { PrismaService } from 'nestjs-prisma';
import { TodoCreateInput } from 'src/@generated/graphql/todo/todo-create.input';
import { Todo } from 'src/@generated/graphql/todo/todo.model';
import { User } from 'src/@generated/graphql/user/user.model';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { EnumStatus } from '@prisma/client';


@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) { }


  async create(@UserEntity() user: User, createTodoInput: TodoCreateInput): Promise<Todo> {
    console.log("create for the user", user)
    try {
      const newTodo = await this.prisma.todo.create({
        data: {
          name: createTodoInput.name,
          description: createTodoInput.description,
          status: 'PENDING',
          author: { connect: { id: user.id } },
          dueDate: createTodoInput.dueDate
        }
      })
      return newTodo;
    }
    catch (err) {
      throw Error(`Error: Unable to create a new todo : ${err}`)
    }
  }

  findAll() {
    return this.prisma.todo.findMany();
  }
  @UseGuards(GqlAuthGuard)
  async findTodoByUser(@UserEntity() user: User) {
    return await this.prisma.todo.findMany({ where: { authorId: user.id } });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: UpdateTodoInput) {
    try{

      const taskToUpdate = await this.prisma.todo.findUnique({ where: { id: id.id } })
      const newStatus = taskToUpdate.status === EnumStatus.DONE ? EnumStatus.PENDING : EnumStatus.DONE
      
      return await this.prisma.todo.update({
        where: { id: id.id }, data: {
          status: newStatus
        }
      });
    }
    catch(err){
      throw Error("Unable to update task")
    }

  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
