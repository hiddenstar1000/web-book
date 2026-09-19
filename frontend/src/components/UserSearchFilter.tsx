'use client';

import React from 'react';
import { UserRole, UserStatus } from '@/types/user';

interface UserSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export const UserSearchFilter: React.FC<UserSearchFilterProps> = ({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onReset,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
      <div className="flex-1 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email address..."
          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 placeholder:text-slate-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="GUEST">GUEST</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {(search || role || status) && (
          <button
            onClick={onReset}
            className="px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors border border-slate-700/50"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
