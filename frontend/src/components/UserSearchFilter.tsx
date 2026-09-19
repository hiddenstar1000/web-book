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
  const isFiltered = Boolean(search || role || status);

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-xl shadow-slate-950/40">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm">
          🔍
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email address..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 transition-all duration-150 shadow-inner"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-150 cursor-pointer"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="GUEST">GUEST</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-150 cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {isFiltered && (
          <button
            onClick={onReset}
            className="px-4 py-2.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-200 rounded-xl transition-all duration-150 border border-indigo-500/20 hover:border-indigo-500/40 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 animate-fade-in"
          >
            <span>🔄</span>
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
