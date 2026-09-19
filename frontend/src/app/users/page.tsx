'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { User, CreateUserPayload, UpdateUserPayload } from '@/types/user';
import { getUsers, createUser, updateUser, deleteUser } from '@/lib/api/users';
import { UserTable } from '@/components/UserTable';
import { UserFormModal } from '@/components/UserFormModal';
import { UserSearchFilter } from '@/components/UserSearchFilter';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination state
  const [search, setSearch] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchUsersList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers({
        search,
        role,
        status,
        page,
        limit: 10,
      });
      setUsers(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalUsers(response.total || 0);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users from server.');
    } finally {
      setLoading(false);
    }
  }, [search, role, status, page]);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  const handleCreateOrUpdate = async (
    payload: CreateUserPayload | UpdateUserPayload,
  ) => {
    setModalLoading(true);
    setModalError(null);
    try {
      if (editingUser) {
        await updateUser(editingUser.id, payload);
      } else {
        await createUser(payload as CreateUserPayload);
      }
      setIsFormOpen(false);
      setEditingUser(null);
      fetchUsersList();
    } catch (err: any) {
      setModalError(err.message || 'Action failed.');
      throw err;
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    setModalLoading(true);
    try {
      await deleteUser(deletingUser.id);
      setDeletingUser(null);
      fetchUsersList();
    } catch (err: any) {
      setError(err.message || 'Delete operation failed.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingUser(null);
    setModalError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setModalError(null);
    setIsFormOpen(true);
  };

  const handleResetFilters = () => {
    setSearch('');
    setRole('');
    setStatus('');
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-indigo-400 bg-clip-text text-transparent">
              User Directory Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage system users, role authorizations, and account statuses ({totalUsers} total records)
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-base font-bold">+</span> Add New User
          </button>
        </div>

        {/* Global Error Alert */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={fetchUsersList}
              className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Search & Filter Bar */}
        <UserSearchFilter
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          role={role}
          onRoleChange={(val) => {
            setRole(val);
            setPage(1);
          }}
          status={status}
          onStatusChange={(val) => {
            setStatus(val);
            setPage(1);
          }}
          onReset={handleResetFilters}
        />

        {/* User Table */}
        <UserTable
          users={users}
          onEdit={handleOpenEdit}
          onDelete={(user) => setDeletingUser(user)}
          loading={loading}
        />

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingUser}
        loading={modalLoading}
        error={modalError}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingUser}
        user={deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteConfirm}
        loading={modalLoading}
      />
    </main>
  );
}
