import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/database/prisma.service';

describe('PrismaService (integration)', () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);

    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.sku.deleteMany();
    await prisma.$disconnect();
  });

  it('should connect to the database successfully', async () => {
    const result = await prisma.$queryRaw`SELECT 1 as result;`;
    expect(result).toEqual([{ result: BigInt(1) }]);
  });

  it('should be able to create and read a test record', async () => {
    const sku = await prisma.sku.create({
      data: {
        sku: 'TEST-001',
        comercialDescription: 'Integration test',
        description: 'Testing prisma service',
        status: 'PRE_REGISTER',
      },
    });

    expect(sku).toHaveProperty('id');
    expect(sku.sku).toBe('TEST-001');

    const found = await prisma.sku.findUnique({
      where: { id: sku.id },
    });
    expect(found).not.toBeNull();
    expect(found?.sku).toBe('TEST-001');
  });
});
