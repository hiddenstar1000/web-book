# Frontend Web Application (Next.js App Router)

The frontend web interface for the User CRUD Management system, built with **Next.js 14+ (App Router)**, **React 18**, and **Tailwind CSS**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router, React 18 Client Components)
- **Styling**: Tailwind CSS with custom glassmorphism, micro-animations, and dynamic HSL color themes
- **API Communication**: Decoupled HTTP Client (`lib/api/client.ts` & `lib/api/users.ts`) using standard `fetch`
- **Testing Framework**: Jest & React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)

---

## 📁 Directory Layout

```text
frontend/
├── src/
│   ├── app/
│   │   ├── users/
│   │   │   └── page.tsx              # Main User Directory Management page component
│   │   ├── globals.css               # Tailwind directives & CSS keyframe animations
│   │   ├── layout.tsx                # Root layout wrapper
│   │   └── page.tsx                  # Root redirect page to /users
│   ├── components/
│   │   ├── UserTable.tsx             # Interactive User Directory Table component
│   │   ├── UserFormModal.tsx         # Create & Edit User form modal dialog
│   │   ├── UserSearchFilter.tsx      # Real-time search query & filter bar
│   │   └── DeleteConfirmModal.tsx    # Confirmation prompt dialog for user deletion
│   ├── lib/
│   │   └── api/
│   │       ├── client.ts             # Generic fetch client wrapper with ApiError handling
│   │       └── users.ts              # Endpoint service functions (getUsers, createUser, etc.)
│   ├── types/
│   │   └── user.ts                   # TypeScript interfaces (User, CreateUserPayload, etc.)
│   └── __tests__/                    # Component & Integration Jest Unit Tests
│       ├── HomePage.test.tsx
│       ├── UsersPage.test.tsx
│       ├── UserTable.test.tsx
│       ├── UserFormModal.test.tsx
│       ├── UserSearchFilter.test.tsx
│       ├── DeleteConfirmModal.test.tsx
│       └── usersApi.test.ts
├── jest.config.js                    # Jest config with >90% coverage threshold
├── jest.setup.js                     # Testing Library setup
├── tsconfig.json
└── package.json
```

---

## 🌐 Environment Configuration

Define client environment variables in a `.env.local` file:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api/v1` | Base URL of NestJS REST API |

---

## 🚀 Available Scripts

```bash
# Install dependencies
npm install

# Start Next.js development server (Port 3000)
npm run dev

# Build production application
npm run build

# Start production server
npm run start

# Run unit tests
npm run test

# Run unit tests with coverage report
npm run test:cov
```

---

## 🧩 Component Architecture

### 1. `UserTable`
- **Props**: `users: User[]`, `onEdit: (user) => void`, `onDelete: (user) => void`, `loading?: boolean`
- **Renders**: Responsive table with initial letter avatars, email font styling, role badges (`ADMIN`, `USER`, `GUEST`), status badges (`ACTIVE`, `INACTIVE`), and edit/delete action triggers.

### 2. `UserFormModal`
- **Props**: `isOpen`, `onClose`, `onSubmit`, `initialData?`, `loading?`, `error?`
- **Renders**: Reusable form modal for creating new users or editing pre-filled user records with client-side name/email validation.

### 3. `UserSearchFilter`
- **Props**: `search`, `onSearchChange`, `role`, `onRoleChange`, `status`, `onStatusChange`, `onReset`
- **Renders**: Search input field, role dropdown select, status dropdown select, and reset button.

### 4. `DeleteConfirmModal`
- **Props**: `isOpen`, `user`, `onClose`, `onConfirm`, `loading?`
- **Renders**: Destructive action confirmation dialog displaying user name and email.

---

## 🧪 Testing & Coverage

Frontend component tests use **React Testing Library**:
- **`UsersPage.test.tsx`**: Full integration test of page mounting, modal interactions, search/filter changes, pagination, and error retries.
- **`UserTable.test.tsx`**: Unit tests for table rows, loading states, empty states, and role badge styles.
- **`UserFormModal.test.tsx`**: Unit tests for create mode, edit pre-fill mode, client input validation errors, and dropdown selects.
- **`UserSearchFilter.test.tsx`**: Unit tests for search input and filter triggers.
- **`DeleteConfirmModal.test.tsx`**: Unit tests for deletion prompt confirmation.
- **`usersApi.test.ts`**: Unit tests for API client helper functions and error handling.

Run coverage report:
```bash
npm run test:cov
```
Target thresholds: **>90%** Statements, Lines, and Functions.
