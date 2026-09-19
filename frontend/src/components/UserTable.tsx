'use client';

import React from 'react';
import { User } from '@/types/user';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  loading?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 animate-pulse">
        Loading user records...
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
        No users found matching your criteria.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <th className="py-4 px-6">User</th>
            <th className="py-4 px-6">Email</th>
            <th className="py-4 px-6">Role</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-sm text-slate-200">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-slate-800/40 transition-colors duration-150 group"
            >
              <td className="py-4 px-6 font-medium text-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span>{user.fullName}</span>
              </td>
              <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                {user.email}
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    user.role === 'ADMIN'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : user.role === 'USER'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    user.status === 'ACTIVE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'ACTIVE'
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-rose-400'
                    }`}
                  />
                  {user.status}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700"
                    aria-label={`Edit ${user.fullName}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="px-3 py-1.5 text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg transition-colors border border-rose-500/20"
                    aria-label={`Delete ${user.fullName}`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
