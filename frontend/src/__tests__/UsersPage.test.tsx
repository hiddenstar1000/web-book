import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersPage from '@/app/users/page';
import * as usersApi from '@/lib/api/users';
import { UserPaginatedResponse } from '@/types/user';

jest.mock('@/lib/api/users');

describe('UsersPage Integration Component', () => {
  const mockPaginatedData: UserPaginatedResponse = {
    data: [
      {
        id: '1',
        fullName: 'Alice Wonder',
        email: 'alice@example.com',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    ],
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usersApi.getUsers as jest.Mock).mockResolvedValue(mockPaginatedData);
  });

  it('renders user directory and fetches users list on mount', async () => {
    render(<UsersPage />);

    expect(screen.getByText(/User Directory Management/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    });
  });

  it('opens creation modal and creates a user successfully', async () => {
    (usersApi.createUser as jest.Mock).mockResolvedValue({
      id: '2',
      fullName: 'Bob Builder',
      email: 'bob@example.com',
      role: 'USER',
      status: 'ACTIVE',
    });

    render(<UsersPage />);

    await waitFor(() => expect(screen.getByText('Alice Wonder')).toBeInTheDocument());

    const addBtn = screen.getByRole('button', { name: /\+ Add New User/i });
    fireEvent.click(addBtn);

    expect(screen.getByRole('heading', { name: 'Add New User' })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Doe'), {
      target: { value: 'Bob Builder' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane.doe@example.com'), {
      target: { value: 'bob@example.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    await waitFor(() => {
      expect(usersApi.createUser).toHaveBeenCalledWith({
        fullName: 'Bob Builder',
        email: 'bob@example.com',
        role: 'USER',
        status: 'ACTIVE',
      });
    });
  });

  it('opens edit modal and updates a user', async () => {
    (usersApi.updateUser as jest.Mock).mockResolvedValue({
      id: '1',
      fullName: 'Alice Updated',
    });

    render(<UsersPage />);

    await waitFor(() => expect(screen.getByText('Alice Wonder')).toBeInTheDocument());

    const editBtn = screen.getByRole('button', { name: /Edit Alice Wonder/i });
    fireEvent.click(editBtn);

    expect(screen.getByText('Edit User Profile')).toBeInTheDocument();

    const nameInput = screen.getByDisplayValue('Alice Wonder');
    fireEvent.change(nameInput, { target: { value: 'Alice Updated' } });

    const updateBtn = screen.getByRole('button', { name: /Update User/i });
    fireEvent.submit(updateBtn.closest('form')!);

    await waitFor(() => {
      expect(usersApi.updateUser).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ fullName: 'Alice Updated' }),
      );
    });
  });

  it('opens delete modal and deletes a user', async () => {
    (usersApi.deleteUser as jest.Mock).mockResolvedValue({ message: 'Deleted' });

    render(<UsersPage />);

    await waitFor(() => expect(screen.getByText('Alice Wonder')).toBeInTheDocument());

    const deleteBtn = screen.getByRole('button', { name: /Delete Alice Wonder/i });
    fireEvent.click(deleteBtn);

    expect(screen.getByText(/Delete User Account/i)).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: 'Delete User' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(usersApi.deleteUser).toHaveBeenCalledWith('1');
    });
  });

  it('displays API error alert and supports retry button', async () => {
    (usersApi.getUsers as jest.Mock).mockRejectedValueOnce(
      new Error('Network Connection Error'),
    );

    render(<UsersPage />);

    expect(
      await screen.findByText(/Network Connection Error/i),
    ).toBeInTheDocument();

    (usersApi.getUsers as jest.Mock).mockResolvedValueOnce(mockPaginatedData);
    const retryBtn = screen.getByRole('button', { name: /Retry/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    });
  });

  it('handles search, role, status filters and pagination clicks', async () => {
    (usersApi.getUsers as jest.Mock).mockResolvedValue({
      data: [mockPaginatedData.data[0]],
      total: 25,
      page: 1,
      limit: 10,
      totalPages: 3,
    });

    render(<UsersPage />);

    await waitFor(() => expect(screen.getByText('Alice Wonder')).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText(/Search by name or email/i);
    fireEvent.change(searchInput, { target: { value: 'Wonder' } });

    const roleSelect = screen.getByDisplayValue('All Roles');
    fireEvent.change(roleSelect, { target: { value: 'ADMIN' } });

    const statusSelect = screen.getByDisplayValue('All Statuses');
    fireEvent.change(statusSelect, { target: { value: 'ACTIVE' } });

    await waitFor(() => {
      expect(usersApi.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'Wonder', role: 'ADMIN', status: 'ACTIVE' }),
      );
    });

    const nextBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(usersApi.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 }),
      );
    });

    const prevBtn = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevBtn);

    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetBtn);

    await waitFor(() => {
      expect(usersApi.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ search: '', role: '', status: '', page: 1 }),
      );
    });
  });

  it('handles error in handleCreateOrUpdate and handleDeleteConfirm', async () => {
    (usersApi.createUser as jest.Mock).mockRejectedValueOnce(
      new Error('Create Failed'),
    );
    (usersApi.deleteUser as jest.Mock).mockRejectedValueOnce(
      new Error('Delete Failed'),
    );

    render(<UsersPage />);

    await waitFor(() => expect(screen.getByText('Alice Wonder')).toBeInTheDocument());

    const addBtn = screen.getByRole('button', { name: /\+ Add New User/i });
    fireEvent.click(addBtn);

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Doe'), {
      target: { value: 'Fail User' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane.doe@example.com'), {
      target: { value: 'fail@example.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    expect(await screen.findByText('Create Failed')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeBtn);

    const deleteBtn = screen.getByRole('button', { name: /Delete Alice Wonder/i });
    fireEvent.click(deleteBtn);

    const confirmBtn = screen.getByRole('button', { name: 'Delete User' });
    fireEvent.click(confirmBtn);

    expect(await screen.findByText('⚠️ Delete Failed')).toBeInTheDocument();
  });
});
