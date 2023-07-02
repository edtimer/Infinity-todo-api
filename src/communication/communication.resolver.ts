import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommunicationService } from './communication.service';
import { EmailCommunication } from './entities/communication.entity';
import { CreateEmailInput } from './dto/create-communication.input';
import { CreateInstantMessageInput } from './dto/create-communication-instant.input';



@Resolver(() => EmailCommunication)
export class CommunicationResolver {
  constructor(private readonly communicationService: CommunicationService) {}
//to notify on task due
  @Mutation(() => String)
  createEmailCommunication(@Args('data') createCommunicationInput: CreateEmailInput) :Promise<any>{
    return this.communicationService.sendEmail(createCommunicationInput);
  }

}
