import { Test, TestingModule } from '@nestjs/testing';
import { JwtMiddleware } from './authoriser.service';

describe('AuthoriserService', () => {
  let service: JwtMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtMiddleware],
    }).compile();

    service = module.get<JwtMiddleware>(JwtMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
