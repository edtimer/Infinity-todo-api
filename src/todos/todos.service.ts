import { Injectable } from '@nestjs/common';

import { UpdateTodoInput } from './dto/update-todo.input';

import { PrismaService } from 'nestjs-prisma';
import { TodoCreateInput } from 'src/@generated/graphql/todo/todo-create.input';
import { Todo } from 'src/@generated/graphql/todo/todo.model';
import { User } from 'src/@generated/graphql/user/user.model';
import { UserEntity } from 'src/common/decorators/user.decorator';


@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) { }


  async create(@UserEntity()user:User,createTodoInput: TodoCreateInput): Promise<Todo> {
    console.log("create for the user",user)
    try {
      const newTodo = await this.prisma.todo.create({
        data: {
          name: createTodoInput.name,
          description: createTodoInput.description,
          status: 'PENDING',
          author: {connect:{id:user.id}},
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
  findTodoByUser(userId: String) {
    return this.prisma.todo.findMany({ where: { authorId: userId as unknown as string } });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
