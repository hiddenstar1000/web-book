import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { User } from '@/types/user';

describe('DeleteConfirmModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const userToDelete: User = {
    id: '42',
    fullName: 'Eve Adams',
    email: 'eve@example.com',
    role: 'USER',
    status: 'ACTIVE',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(
      <DeleteConfirmModal
        isOpen={false}
        user={userToDelete}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
    expect(screen.queryByText(/Delete User Account/i)).not.toBeInTheDocument();
  });

  it('renders modal prompt and triggers onConfirm', async () => {
    mockOnConfirm.mockResolvedValue(undefined);

    render(
      <DeleteConfirmModal
        isOpen={true}
        user={userToDelete}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText(/Delete User Account/i)).toBeInTheDocument();
    expect(screen.getByText('Eve Adams')).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: 'Delete User' });
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
