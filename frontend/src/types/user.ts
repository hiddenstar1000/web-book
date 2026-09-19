export type UserRole = 'ADMIN' | 'USER' | 'GUEST';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  fullName: string;
  email: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UpdateUserPayload {
  fullName?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserPaginatedResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
