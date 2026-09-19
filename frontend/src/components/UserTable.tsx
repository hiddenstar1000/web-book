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
      <div className="p-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800/80 backdrop-blur-md shadow-2xl animate-pulse">
        <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <div className="text-sm font-medium">Loading user records...</div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800/80 backdrop-blur-md shadow-2xl space-y-2">
        <div className="text-3xl">🔍</div>
        <div className="text-base font-semibold text-slate-300">No users found</div>
        <div className="text-xs text-slate-500">No users found matching your criteria. Try adjusting filters or search terms.</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md shadow-2xl shadow-slate-950/60">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="border-b border-slate-800/80 bg-slate-950/80 text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <th className="py-4 px-6">User</th>
            <th className="py-4 px-6">Email</th>
            <th className="py-4 px-6">Role</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 text-sm text-slate-200">
          {users.map((user) => {
            const initial = user.fullName ? user.fullName.charAt(0).toUpperCase() : '?';
            return (
              <tr
                key={user.id}
                className="hover:bg-slate-800/40 transition-colors duration-150 group"
              >
                <td className="py-4 px-6 font-medium text-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-150">
                    {initial}
                  </div>
                  <span className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {user.fullName}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                  {user.email}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      user.role === 'ADMIN'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-sm shadow-amber-500/10'
                        : user.role === 'USER'
                          ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm shadow-indigo-500/10'
                          : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
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
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-150 border border-slate-700/80 hover:border-slate-600 active:scale-95 cursor-pointer"
                      aria-label={`Edit ${user.fullName}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="px-3 py-1.5 text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg transition-all duration-150 border border-rose-500/20 hover:border-rose-500/40 active:scale-95 cursor-pointer"
                      aria-label={`Delete ${user.fullName}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
