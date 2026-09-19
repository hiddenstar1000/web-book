import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserTable } from '@/components/UserTable';
import { User } from '@/types/user';

describe('UserTable', () => {
  const mockUsers: User[] = [
    {
      id: '1',
      fullName: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
    {
      id: '2',
      fullName: 'Bob Smith',
      email: 'bob@example.com',
      role: 'USER',
      status: 'INACTIVE',
    },
    {
      id: '3',
      fullName: 'Charlie Guest',
      email: 'charlie@example.com',
      role: 'GUEST',
      status: 'ACTIVE',
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading prop is true', () => {
    render(
      <UserTable
        users={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        loading={true}
      />,
    );
    expect(screen.getByText(/Loading user records/i)).toBeInTheDocument();
  });

  it('renders empty message when no users are provided', () => {
    render(
      <UserTable
        users={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        loading={false}
      />,
    );
    expect(screen.getByText(/No users found matching your criteria/i)).toBeInTheDocument();
  });

  it('renders user rows accurately with ADMIN, USER, and GUEST roles and triggers action handlers', () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        loading={false}
      />,
    );

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Charlie Guest')).toBeInTheDocument();

    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[1]);
  });
});
