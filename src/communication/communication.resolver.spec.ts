import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationResolver } from './communication.resolver';
import { CommunicationService } from './communication.service';

describe('CommunicationResolver', () => {
  let resolver: CommunicationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationResolver, CommunicationService],
    }).compile();

    resolver = module.get<CommunicationResolver>(CommunicationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
