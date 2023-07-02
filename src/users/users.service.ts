import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateStaffInput } from './dto/create-user.input';
import { User } from 'src/@generated/graphql/user/user.model';
import { UserIdArg } from './args/userId.arg';
import { UserWhereInput } from 'src/@generated/graphql/user/user-where.input';
import { AuthService } from 'src/auth/auth.service';
import { UserWhereUniqueInput } from 'src/@generated/graphql/user/user-where-unique.input';
import { connect } from 'http2';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private authService:AuthService
  ) { }


//! todo remove auth service and jwt service from user module
  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput,

  ) {
    const user =await this.authService.validateUser(userId)

    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
  async createStaff(addStaffDto: CreateStaffInput,userId:string) {
    //crate a user based on staff and add staff role
    const user =await this.authService.validateUser(userId)


    const { firstname, lastname, email, password } = addStaffDto;
    const hashedPassword = await this.passwordService.hashPassword(
      addStaffDto.password)
      
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password:hashedPassword,
        },
      });
      console.log('user created with staff role', createdUser);
      return createdUser;
    } catch {
      throw BadRequestException;
    }
  }

  async updateStaff(userId:string,editStaffDto: UpdateUserInput,staffUserId:UserWhereUniqueInput) {
    //crate a user based on staff and add staff role
    const user =await this.authService.validateUser(userId)



    const { firstname, lastname, email ,password,} = editStaffDto;
    const hashedPassword = await this.passwordService.hashPassword(
      editStaffDto.password)
    try {
      const updateStaff = await this.prisma.user.update({
        where:{id:staffUserId.id},
        data: {
          firstname,
          lastname,
          email,
          password:hashedPassword
        },
      });
      console.log('staff updated', updateStaff);
      return updateStaff;
    } catch(err) {
      console.log(err);
      
      throw BadRequestException;
    }
  }
  async updateUser (user: User, newUserData: UpdateUserInput) {
    // const user =await this.authService.validateUser(userId)
console.log("About to update user")


    try{

      return this.prisma.user.update({
        data: newUserData,
        where: {
          id: newUserData.id,
        },
      });
    }catch(err){
      console.log("error",err)
    }
  }

  async deleteUser(loggedInuserId:string,userId:string) {
    const user =await this.authService.validateUser(loggedInuserId)



 

      const userToBeDeleted = await this.prisma.user.findUnique({
        where:{
          id:userId
        },
      })
    try {
      const deleteUser = await this.prisma.user.delete({
        where:{id:userId},
      });
      console.log('delete successful', deleteUser);
      return deleteUser;
    } catch(err) {
      // throw BadRequestException;
      throw Error(`Error because ${err}`)
    }
  }

}


