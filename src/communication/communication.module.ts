import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationResolver } from './communication.resolver';


@Module({
  providers: [CommunicationResolver, CommunicationService]
})
export class CommunicationModule {}
