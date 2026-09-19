import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole, UserStatus } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  const mockUserDoc = (dto: any) => ({
    ...dto,
    _id: '507f1f77bcf86cd799439011',
    id: '507f1f77bcf86cd799439011',
    save: jest.fn().mockResolvedValue({
      id: '507f1f77bcf86cd799439011',
      ...dto,
    }),
  });

  beforeEach(async () => {
    mockUserModel = jest.fn().mockImplementation((dto) => mockUserDoc(dto));
    mockUserModel.findOne = jest.fn();
    mockUserModel.find = jest.fn();
    mockUserModel.findById = jest.fn();
    mockUserModel.findByIdAndUpdate = jest.fn();
    mockUserModel.findByIdAndDelete = jest.fn();
    mockUserModel.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      const dto = {
        fullName: 'Alice Smith',
        email: 'alice@example.com',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      };

      const result = await service.create(dto);
      expect(result).toHaveProperty('id');
      expect(result.email).toBe('alice@example.com');
    });

    it('should throw ConflictException if user email already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({ id: '123', email: 'alice@example.com' });
      const dto = {
        fullName: 'Alice Smith',
        email: 'alice@example.com',
      };

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return paginated user list with search, role, and status filters', async () => {
      const mockExec = jest.fn().mockResolvedValue([
        { id: '1', fullName: 'Alice', email: 'alice@example.com', role: UserRole.ADMIN, status: UserStatus.ACTIVE },
      ]);
      const mockLimit = jest.fn().mockReturnValue({ exec: mockExec });
      const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
      const mockSort = jest.fn().mockReturnValue({ skip: mockSkip });

      mockUserModel.find.mockReturnValue({ sort: mockSort });
      mockUserModel.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const result = await service.findAll({
        search: 'Alice',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        page: 1,
        limit: 10,
      });

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });

    it('should handle default pagination numbers when page or limit are invalid or default', async () => {
      const mockExec = jest.fn().mockResolvedValue([]);
      const mockLimit = jest.fn().mockReturnValue({ exec: mockExec });
      const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
      const mockSort = jest.fn().mockReturnValue({ skip: mockSkip });

      mockUserModel.find.mockReturnValue({ sort: mockSort });
      mockUserModel.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(0) });

      const result = await service.findAll({ page: 0, limit: -5 });
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      const mockUser = { id: '507f1f77bcf86cd799439011', fullName: 'Alice' };
      mockUserModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await service.findById('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findById('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const mockUpdated = { id: '123', fullName: 'Updated Alice' };
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUpdated),
      });

      const result = await service.update('123', { fullName: 'Updated Alice' });
      expect(result).toEqual(mockUpdated);
    });

    it('should throw ConflictException if updated email conflicts with another user', async () => {
      mockUserModel.findOne.mockResolvedValue({ id: '999', email: 'taken@example.com' });

      await expect(
        service.update('123', { email: 'taken@example.com' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if user to update does not exist', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.update('invalid-id', { fullName: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove user successfully', async () => {
      mockUserModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '123' }),
      });

      const result = await service.remove('123');
      expect(result).toEqual({ message: 'User deleted successfully' });
    });

    it('should throw NotFoundException if user to delete does not exist', async () => {
      mockUserModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });
});
