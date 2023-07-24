import { Test, TestingModule } from '@nestjs/testing';
import { FederationResolver } from './federation.resolver';
import { FederationService } from './federation.service';

describe('FederationResolver', () => {
  let resolver: FederationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FederationResolver, FederationService],
    }).compile();

    resolver = module.get<FederationResolver>(FederationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
