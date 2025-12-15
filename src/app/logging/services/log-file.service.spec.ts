import { Test, TestingModule } from '@nestjs/testing';
import { LogFileService } from './log-file.service';

describe('LogFileService', () => {
  let service: LogFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogFileService],
    }).compile();

    service = module.get<LogFileService>(LogFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
