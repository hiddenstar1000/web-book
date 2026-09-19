import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole, UserStatus } from './schemas/user.schema';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create', async () => {
    const dto = { fullName: 'Bob', email: 'bob@example.com', role: UserRole.USER, status: UserStatus.ACTIVE };
    mockUsersService.create.mockResolvedValue({ id: '1', ...dto });

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id', '1');
  });

  it('should call service.findAll with query parameters', async () => {
    const expectedResponse = { data: [], total: 0, page: 1, limit: 10, totalPages: 1 };
    mockUsersService.findAll.mockResolvedValue(expectedResponse);

    const result = await controller.findAll('Bob', UserRole.ADMIN, UserStatus.ACTIVE, 1, 10);
    expect(service.findAll).toHaveBeenCalledWith({
      search: 'Bob',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      page: 1,
      limit: 10,
    });
    expect(result).toEqual(expectedResponse);
  });

  it('should call service.findById', async () => {
    mockUsersService.findById.mockResolvedValue({ id: '123', fullName: 'Bob' });

    const result = await controller.findOne('123');
    expect(service.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual({ id: '123', fullName: 'Bob' });
  });

  it('should call service.update', async () => {
    const dto = { fullName: 'Updated Bob' };
    mockUsersService.update.mockResolvedValue({ id: '123', fullName: 'Updated Bob' });

    const result = await controller.update('123', dto);
    expect(service.update).toHaveBeenCalledWith('123', dto);
    expect(result).toEqual({ id: '123', fullName: 'Updated Bob' });
  });

  it('should call service.remove', async () => {
    mockUsersService.remove.mockResolvedValue({ message: 'User deleted successfully' });

    const result = await controller.remove('123');
    expect(service.remove).toHaveBeenCalledWith('123');
    expect(result).toEqual({ message: 'User deleted successfully' });
  });
});
