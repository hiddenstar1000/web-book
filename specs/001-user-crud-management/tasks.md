# Tasks: User CRUD Management

**Feature Branch**: `001-user-crud-management`  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and repository structure for backend REST API and frontend web UI.

- [x] T001 Initialize NestJS backend application structure in `backend/`
- [x] T002 [P] Initialize Next.js App Router application structure in `frontend/`
- [x] T003 [P] Configure Jest and set test coverage thresholds (>90% lines, functions, statements, branches) in `backend/jest.config.js`
- [x] T004 [P] Configure Jest and React Testing Library with >90% test coverage threshold in `frontend/jest.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T005 Setup MongoDB Mongoose connection and environment configuration in `backend/src/app.module.ts`
- [x] T006 [P] Setup NestJS global ValidationPipe, TransformPipe, and HTTP Exception Filter in `backend/src/main.ts` and `backend/src/common/filters/http-exception.filter.ts`
- [x] T007 [P] Setup Next.js base HTTP client and shared User TypeScript interfaces in `frontend/src/types/user.ts` and `frontend/src/lib/api/client.ts`

**Checkpoint**: Foundation ready - user story implementation complete.

---

## Phase 3: User Story 1 - Create and View User Profiles (Priority: P1) 🎯 MVP

**Goal**: Allow users to create new user profiles with essential attributes (`fullName`, `email`, `role`, `status`) and view a paginated list of existing users.

**Independent Test**: Create a user profile via UI or API with valid attributes, verify it persists in MongoDB, and observe the new record rendered in the active user table.

### Tests for User Story 1 (Mandatory per Constitution) ⚠️

- [x] T008 [P] [US1] Unit tests for CreateUserDto, UserSchema, and UsersService creation/listing logic in `backend/src/modules/users/users.service.spec.ts`
- [x] T009 [P] [US1] Unit tests for UsersController POST and GET endpoints in `backend/src/modules/users/users.controller.spec.ts`
- [x] T010 [P] [US1] Component unit tests for UserTable and UserFormModal rendering and creation in `frontend/src/__tests__/UserTable.test.tsx` and `frontend/src/__tests__/UserFormModal.test.tsx`

### Implementation for User Story 1

- [x] T011 [P] [US1] Define Mongoose User Schema in `backend/src/modules/users/schemas/user.schema.ts` with fields: `fullName` (string, required, trim, min length 2, max length 100), `email` (string, required, trim, lowercase, unique index), `role` (enum: 'ADMIN'|'USER'|'GUEST', default: 'USER'), `status` (enum: 'ACTIVE'|'INACTIVE', default: 'ACTIVE'), `createdAt`, `updatedAt`
- [x] T012 [P] [US1] Define CreateUserDto in `backend/src/modules/users/dto/create-user.dto.ts` with class-validator decorators for `fullName`, `email`, `role`, `status`
- [x] T013 [US1] Implement UsersService `create` and `findAll` methods in `backend/src/modules/users/users.service.ts` handling MongoDB code 11000 duplicate email conflict
- [x] T014 [US1] Implement UsersController `POST /api/v1/users` and `GET /api/v1/users` endpoints in `backend/src/modules/users/users.controller.ts`
- [x] T015 [US1] Register UsersModule in `backend/src/modules/users/users.module.ts`
- [x] T016 [P] [US1] Implement API client methods `getUsers` and `createUser` in `frontend/src/lib/api/users.ts`
- [x] T017 [P] [US1] Implement UserTable component in `frontend/src/components/UserTable.tsx` rendering user list attributes
- [x] T018 [P] [US1] Implement UserFormModal component in `frontend/src/components/UserFormModal.tsx` for creating users with input validation
- [x] T019 [US1] Assemble User Management page in `frontend/src/app/users/page.tsx` bringing together UserFormModal and UserTable

**Checkpoint**: User Story 1 (MVP) is fully functional and testable independently.

---

## Phase 4: User Story 2 - Update Existing User Details (Priority: P2)

**Goal**: Allow administrators to edit existing user records (updating name, role, or active status) with validation.

**Independent Test**: Select an existing user, modify attributes, submit updates, and verify updated fields persist in MongoDB and update in the UI.

### Tests for User Story 2 ⚠️

- [x] T020 [P] [US2] Unit tests for UpdateUserDto and UsersService update method in `backend/src/modules/users/users.service.spec.ts`
- [x] T021 [P] [US2] Unit tests for UsersController PATCH and GET by ID endpoints in `backend/src/modules/users/users.controller.spec.ts`
- [x] T022 [P] [US2] Component unit tests for edit mode in UserFormModal in `frontend/src/__tests__/UserEditModal.test.tsx`

### Implementation for User Story 2

- [x] T023 [P] [US2] Define UpdateUserDto in `backend/src/modules/users/dto/update-user.dto.ts` with optional validation fields (`fullName`, `email`, `role`, `status`)
- [x] T024 [US2] Implement UsersService `update` and `findById` methods in `backend/src/modules/users/users.service.ts`
- [x] T025 [US2] Implement UsersController `GET /api/v1/users/:id` and `PATCH /api/v1/users/:id` in `backend/src/modules/users/users.controller.ts`
- [x] T026 [P] [US2] Implement API client method `updateUser` in `frontend/src/lib/api/users.ts`
- [x] T027 [US2] Update UserFormModal in `frontend/src/components/UserFormModal.tsx` to pre-fill existing user data for edit mode
- [x] T028 [US2] Connect edit action handlers between UserTable and page state in `frontend/src/app/users/page.tsx`

**Checkpoint**: User Stories 1 AND 2 are fully functional and independently testable.

---

## Phase 5: User Story 3 - Search, Filter, and Delete Users (Priority: P3)

**Goal**: Search users by keyword (name or email), filter by role/status, and delete obsolete users after confirmation.

**Independent Test**: Apply search/filter criteria in the UI and confirm table filters accordingly; trigger deletion, approve confirmation modal, and verify record is removed.

### Tests for User Story 3 ⚠️

- [x] T029 [P] [US3] Unit tests for search/filter query building and delete logic in `backend/src/modules/users/users.service.spec.ts`
- [x] T030 [P] [US3] Unit tests for search parameters and DELETE endpoint in `backend/src/modules/users/users.controller.spec.ts`
- [x] T031 [P] [US3] Component unit tests for UserSearchFilter and DeleteConfirmModal in `frontend/src/__tests__/UserSearchFilter.test.tsx` and `frontend/src/__tests__/DeleteConfirmModal.test.tsx`

### Implementation for User Story 3

- [x] T032 [US3] Enhance UsersService `findAll` to support `search` (regex match on fullName or email), `role`, and `status` in `backend/src/modules/users/users.service.ts`
- [x] T033 [US3] Implement UsersService `remove` method in `backend/src/modules/users/users.service.ts`
- [x] T034 [US3] Implement UsersController `DELETE /api/v1/users/:id` endpoint in `backend/src/modules/users/users.controller.ts`
- [x] T035 [P] [US3] Implement API client method `deleteUser` in `frontend/src/lib/api/users.ts`
- [x] T036 [P] [US3] Implement UserSearchFilter component in `frontend/src/components/UserSearchFilter.tsx` with search input and dropdown filters
- [x] T037 [P] [US3] Implement DeleteConfirmModal component in `frontend/src/components/DeleteConfirmModal.tsx` with confirmation button
- [x] T038 [US3] Wire search, filter, and delete actions in `frontend/src/app/users/page.tsx`

**Checkpoint**: All user stories are independently functional and fully implemented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification of constitution compliance and end-to-end user journeys.

- [x] T039 [P] Run backend unit test suite (`npm run test:cov` in `backend/`) and verify >90% test coverage across lines, statements, functions, and branches
- [x] T040 [P] Run frontend unit test suite (`npm run test:cov` in `frontend/`) and verify >90% test coverage across components and utilities
- [x] T041 Execute end-to-end quickstart validation scenarios defined in `specs/001-user-crud-management/quickstart.md`
