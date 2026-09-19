import { apiClient } from './client';
import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  UserPaginatedResponse,
} from '@/types/user';

export async function getUsers(params?: {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<UserPaginatedResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.role) query.append('role', params.role);
  if (params?.status) query.append('status', params.status);
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());

  const queryString = query.toString();
  const endpoint = `/users${queryString ? `?${queryString}` : ''}`;
  return apiClient<UserPaginatedResponse>(endpoint, { method: 'GET' });
}

export async function getUserById(id: string): Promise<User> {
  return apiClient<User>(`/users/${id}`, { method: 'GET' });
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  return apiClient<User>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<User> {
  return apiClient<User>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/users/${id}`, {
    method: 'DELETE',
  });
}
