'use client';

import React from 'react';
import { User } from '@/types/user';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  user,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900/95 border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6 shadow-slate-950/80">
        <div className="flex items-center gap-3.5 text-rose-400">
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold text-xl shadow-inner shadow-rose-500/10 shrink-0">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-100 tracking-tight">Delete User Account</h3>
            <p className="text-xs text-slate-400">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Are you sure you want to permanently delete{' '}
          <strong className="text-slate-100 font-semibold">{user.fullName}</strong> (
          <span className="font-mono text-xs text-slate-400">{user.email}</span>)?
        </p>

        <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/30 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
};
