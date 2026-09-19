import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserSearchFilter } from '@/components/UserSearchFilter';

describe('UserSearchFilter', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnRoleChange = jest.fn();
  const mockOnStatusChange = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and filter dropdowns', () => {
    render(
      <UserSearchFilter
        search=""
        onSearchChange={mockOnSearchChange}
        role=""
        onRoleChange={mockOnRoleChange}
        status=""
        onStatusChange={mockOnStatusChange}
        onReset={mockOnReset}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      /Search by name or email address/i,
    );
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('Alice');
  });

  it('displays Reset button when filters are active and triggers reset', () => {
    render(
      <UserSearchFilter
        search="Alice"
        onSearchChange={mockOnSearchChange}
        role="ADMIN"
        onRoleChange={mockOnRoleChange}
        status="ACTIVE"
        onStatusChange={mockOnStatusChange}
        onReset={mockOnReset}
      />,
    );

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
