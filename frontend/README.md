# Frontend Web Application (Next.js App Router)

The frontend web interface for the User CRUD Management system, built with **Next.js 14+ (App Router)**, **React 18**, and **Tailwind CSS 3.4+**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router, React 18 Client Components)
- **Styling**: Tailwind CSS 3.4+ with PostCSS, glassmorphism card overlays, focus ring glows, micro-animations, and dark mode HSL palettes
- **API Communication**: Decoupled HTTP Client (`lib/api/client.ts` & `lib/api/users.ts`) using standard `fetch`
- **Testing Framework**: Jest & React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)

---

## 🎨 Styling & Design System (Tailwind CSS)

The frontend leverages Tailwind CSS 3.4+ with custom configuration extensions and utility classes.

### 1. Configuration Files
- **[tailwind.config.js](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/tailwind.config.js)**: Configures content path matching (`./src/**/*.{js,ts,jsx,tsx}`), dark mode class strategy (`darkMode: 'class'`), custom `fadeIn` keyframes, and animation rules.
- **[postcss.config.js](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/postcss.config.js)**: Registers `tailwindcss` and `autoprefixer` plugins.
- **[src/app/globals.css](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/app/globals.css)**: Implements base Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`), HSL dark theme background variables, custom utility classes, and custom scrollbars.

### 2. Custom Utility Classes
Defined under `@layer utilities` in `globals.css`:

```css
@layer utilities {
  .glass-card {
    @apply bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-2xl shadow-slate-950/50;
  }
  .glass-input {
    @apply bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-150;
  }
  .glass-button-primary {
    @apply bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed;
  }
}
```

### 3. Visual Components & Styling Tokens
- **Page Container**: `bg-slate-950` with subtle radial mesh ambient glows (`from-indigo-600/10` to `violet-600/10`).
- **Table Container**: `bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl`.
- **Form Modals**: `bg-slate-900/95 border border-slate-800/90 rounded-2xl backdrop-blur-md animate-fade-in`.
- **Search & Filter Toolbar**: Integrated glassmorphic bar (`bg-slate-900/60 border border-slate-800/80 rounded-2xl`) with search icon and hover-scale reset pill button.

---

## 📁 Directory Layout

```text
frontend/
├── src/
│   ├── app/
│   │   ├── users/
│   │   │   └── page.tsx              # Main User Directory Management page component
│   │   ├── globals.css               # Tailwind directives, theme variables & animations
│   │   ├── layout.tsx                # Root layout wrapper (dark mode class baseline)
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
├── tailwind.config.js                # Tailwind CSS 3.4 theme configuration
├── postcss.config.js                 # PostCSS plugin configuration
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
- **Renders**: Responsive glassmorphic table with initial letter avatars, email font styling, role badges (`ADMIN`, `USER`, `GUEST`), status badges (`ACTIVE`, `INACTIVE`), and edit/delete action triggers.

### 2. `UserFormModal`
- **Props**: `isOpen`, `onClose`, `onSubmit`, `initialData?`, `loading?`, `error?`
- **Renders**: Reusable form modal with backdrop blur filter (`backdrop-blur-md`), input focus rings (`focus:border-indigo-500`), error alert banners, and client-side name/email validation.

### 3. `UserSearchFilter`
- **Props**: `search`, `onSearchChange`, `role`, `onRoleChange`, `status`, `onStatusChange`, `onReset`
- **Renders**: Integrated toolbar with magnifying glass search input, role select, status select, and animated reset pill button (`hover:scale-105`).

### 4. `DeleteConfirmModal`
- **Props**: `isOpen`, `user`, `onClose`, `onConfirm`, `loading?`
- **Renders**: Destructive action warning confirmation dialog with warning icon and rose button styling.

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
