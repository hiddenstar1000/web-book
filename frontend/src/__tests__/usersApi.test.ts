import { apiClient, ApiError } from '@/lib/api/client';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/lib/api/users';

global.fetch = jest.fn();

describe('Frontend API Client & Users API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('apiClient', () => {
    it('returns parsed json data on successful HTTP response', async () => {
      const mockData = { id: '1', fullName: 'Test User' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await apiClient('/users/1');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/users/1',
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        }),
      );
    });

    it('throws ApiError with array message', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({ message: ['Email invalid', 'Name required'] }),
      });

      await expect(apiClient('/users')).rejects.toThrow('Email invalid, Name required');
    });

    it('calls getUsers without optional params', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [] }),
      });

      const res = await getUsers();
      expect(res).toEqual({ data: [] });
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/users', expect.any(Object));
    });

    it('handles non-JSON error response gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockRejectedValue(new Error('SyntaxError')),
      });

      await expect(apiClient('/users')).rejects.toThrow('An error occurred');
    });
  });

  describe('users API functions', () => {
    it('calls getUsers with formatted query parameters', async () => {
      const mockPaginated = { data: [], total: 0, page: 1, limit: 10, totalPages: 1 };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPaginated),
      });

      const res = await getUsers({ search: 'Alice', role: 'ADMIN', status: 'ACTIVE', page: 2, limit: 5 });
      expect(res).toEqual(mockPaginated);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/users?search=Alice&role=ADMIN&status=ACTIVE&page=2&limit=5',
        expect.any(Object),
      );
    });

    it('calls getUserById', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '123' }),
      });

      const res = await getUserById('123');
      expect(res).toEqual({ id: '123' });
    });

    it('calls createUser', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '123', fullName: 'Bob' }),
      });

      const res = await createUser({ fullName: 'Bob', email: 'bob@example.com' });
      expect(res).toHaveProperty('id', '123');
    });

    it('calls updateUser', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '123', fullName: 'Updated' }),
      });

      const res = await updateUser('123', { fullName: 'Updated' });
      expect(res).toHaveProperty('fullName', 'Updated');
    });

    it('calls deleteUser', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'Deleted' }),
      });

      const res = await deleteUser('123');
      expect(res).toEqual({ message: 'Deleted' });
    });
  });
});
