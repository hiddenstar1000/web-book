import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserFormModal } from '@/components/UserFormModal';
import { User } from '@/types/user';

describe('UserFormModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(
      <UserFormModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );
    expect(screen.queryByText(/Add New User/i)).not.toBeInTheDocument();
  });

  it('renders creation title and handles valid submission', async () => {
    mockOnSubmit.mockResolvedValue(undefined);

    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByText('Add New User')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Doe'), {
      target: { value: 'Charlie Brown' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane.doe@example.com'), {
      target: { value: 'charlie@example.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        fullName: 'Charlie Brown',
        email: 'charlie@example.com',
        role: 'USER',
        status: 'ACTIVE',
      });
    });
  });

  it('handles fallback default values when initialData has empty fields', () => {
    const partialUser: any = { id: '99' };
    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={partialUser}
      />,
    );

    expect(screen.getByText('Edit User Profile')).toBeInTheDocument();
  });

  it('shows error message on short full name submission', async () => {
    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    const nameInput = screen.getByPlaceholderText('e.g. Jane Doe');
    fireEvent.change(nameInput, { target: { value: 'A' } });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    expect(
      await screen.findByText('Full name must be at least 2 characters long'),
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error message on invalid email address', async () => {
    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Doe'), {
      target: { value: 'Valid Name' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane.doe@example.com'), {
      target: { value: 'invalid-email-format' },
    });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    expect(
      await screen.findByText('Please enter a valid email address'),
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles onClose and cancel button clicks', () => {
    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    const closeBtn = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  it('handles role and status select dropdown changes', async () => {
    mockOnSubmit.mockResolvedValue(undefined);

    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Doe'), {
      target: { value: 'Sam Smith' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane.doe@example.com'), {
      target: { value: 'sam@example.com' },
    });

    const roleSelect = screen.getByDisplayValue('USER');
    fireEvent.change(roleSelect, { target: { value: 'GUEST' } });

    const statusSelect = screen.getByDisplayValue('ACTIVE');
    fireEvent.change(statusSelect, { target: { value: 'INACTIVE' } });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        fullName: 'Sam Smith',
        email: 'sam@example.com',
        role: 'GUEST',
        status: 'INACTIVE',
      });
    });
  });

  it('displays API error and catches submission rejection', async () => {
    mockOnSubmit.mockRejectedValue(new Error('Email already taken'));

    render(
      <UserFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        error="Server error"
      />,
    );

    expect(screen.getByText('Server error')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Doe'), {
      target: { value: 'Sam Smith' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane.doe@example.com'), {
      target: { value: 'sam@example.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Create User/i });
    fireEvent.submit(submitBtn.closest('form')!);

    expect(await screen.findByText('Email already taken')).toBeInTheDocument();
  });
});
