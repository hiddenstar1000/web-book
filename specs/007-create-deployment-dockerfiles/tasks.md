# Tasks: Production Dockerfile Generation for Deployment

**Feature Directory**: `specs/007-create-deployment-dockerfiles`
**Feature Branch**: `007-create-deployment-dockerfiles`
**Spec File**: `specs/007-create-deployment-dockerfiles/spec.md`
**Plan File**: `specs/007-create-deployment-dockerfiles/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify service project structures and build scripts.

- [x] T001 Verify `backend/package.json` build scripts (`npm run build`) and `frontend/package.json` build scripts (`npm run build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verify container build ignore rules before Dockerfile creation.

- [x] T002 Verify Docker ignore entries in `backend/.dockerignore` and `frontend/.dockerignore`

---

## Phase 3: User Story 1 - NestJS Backend Containerization (Priority: P1) 🎯 MVP

**Goal**: Build a multi-stage production Dockerfile in `backend/Dockerfile` using `node:20-alpine`, compiling NestJS TypeScript into `dist/` and exposing port 3001 with non-root user `node`.

**Independent Test**: Build `backend/Dockerfile` using `docker build -t web-book-backend:test ./backend` and confirm successful compilation.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create multi-stage production `backend/Dockerfile` with `node:20-alpine` base image, TypeScript build stage, production `dist/` runner stage, `USER node`, and `EXPOSE 3001`
- [x] T004 [US1] Test local Docker build for backend image using `docker build -t web-book-backend:test ./backend`

**Checkpoint**: At this point, User Story 1 is fully functional and backend container images can be compiled.

---

## Phase 4: User Story 2 - Next.js Frontend Containerization (Priority: P2)

**Goal**: Build a multi-stage production Dockerfile in `frontend/Dockerfile` using `node:20-alpine`, compiling Next.js 14 App Router assets and exposing port 3000 with non-root user `node`.

**Independent Test**: Build `frontend/Dockerfile` using `docker build -t web-book-frontend:test ./frontend` and confirm successful compilation.

### Implementation for User Story 2

- [x] T005 [P] [US2] Create multi-stage production `frontend/Dockerfile` with `node:20-alpine` base image, App Router build stage, production `npm start` runner stage, `USER node`, and `EXPOSE 3000`
- [x] T006 [US2] Test local Docker build for frontend image using `docker build -t web-book-frontend:test ./frontend`

**Checkpoint**: At this point, User Stories 1 and 2 are complete, providing Dockerfiles for both backend and frontend.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verify image footprint and complete quickstart validation.

- [x] T007 [P] Inspect container image sizes for `web-book-backend:test` and `web-book-frontend:test`
- [x] T008 Run quickstart validation checks from `specs/007-create-deployment-dockerfiles/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS user story tasks.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (can run in parallel with US1).
- **Polish (Phase 5)**: Depends on Phase 3 and Phase 4 completion.

### Parallel Opportunities

- `T003` (`backend/Dockerfile`) and `T005` (`frontend/Dockerfile`) affect different files and can be written in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Complete Phase 3 (`backend/Dockerfile`).
3. Validate backend image build.

### Incremental Delivery

1. Complete MVP (Backend containerization).
2. Complete User Story 2 (Frontend containerization).
3. Complete Polish & Validation.
