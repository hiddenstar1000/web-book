# Quickstart & Verification Guide: User CRUD Management

This guide provides setup, run commands, and test verification scenarios for the User CRUD Management application.

---

## 1. Prerequisites

- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **MongoDB**: Local instance running on `mongodb://localhost:27017/user_crud_db` (or MongoDB Docker container)

---

## 2. Environment Setup & Development Servers

### Backend (NestJS REST API)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start NestJS development server (Port 3001)
npm run start:dev
```

### Frontend (Next.js Web UI)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server (Port 3000)
npm run dev
```

---

## 3. Unit Test Execution & >90% Coverage Verification

Per the project constitution mandate, both API and UI test suites enforce >90% line, branch, statement, and function coverage.

### Verify Backend API Coverage
```bash
cd backend
npm run test:cov
```
*Expected Outcome*: All Jest unit tests pass, and total coverage summary reports >90% across all metrics.

### Verify Frontend UI Coverage
```bash
cd frontend
npm run test:cov
```
*Expected Outcome*: All React Testing Library component tests pass, and coverage report exceeds 90%.

---

## 4. Manual End-to-End Validation Steps

1. **Access Web Application**: Open `http://localhost:3000` in browser.
2. **Create User**:
   - Click "Add User".
   - Fill in Name: `Alice Johnson`, Email: `alice@example.com`, Role: `ADMIN`, Status: `ACTIVE`.
   - Submit form. Verify record appears immediately in the table.
3. **Duplicate Email Error**:
   - Click "Add User" again with `alice@example.com`.
   - Verify validation conflict alert (`409 Conflict / Email already registered`).
4. **Update User**:
   - Click "Edit" on `Alice Johnson`.
   - Change Role to `USER`. Save. Verify list reflects updated role.
5. **Search & Filter**:
   - Type `Alice` in search bar. Confirm table filters correctly.
6. **Delete User**:
   - Click "Delete" on `Alice Johnson`.
   - Confirm modal prompt. Verify record is removed from the table.
