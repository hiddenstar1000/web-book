# Tasks: Node.js 22 Runtime Upgrade & Documentation Update

**Feature Directory**: `specs/008-upgrade-node-22-readme-update`
**Feature Branch**: `008-upgrade-node-22-readme-update`
**Spec File**: `specs/008-upgrade-node-22-readme-update/spec.md`
**Plan File**: `specs/008-upgrade-node-22-readme-update/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify current Dockerfiles and README documentation files before editing.

- [x] T001 Inspect `backend/Dockerfile`, `frontend/Dockerfile`, `README.md`, `backend/README.md`, and `frontend/README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm Node 22 base image specification and target documentation sections.

- [x] T002 Verify `node:22-alpine` base image availability and identify documentation sections to update

---

## Phase 3: User Story 1 - Node 22 Runtime Base Upgrade (Priority: P1) 🎯 MVP

**Goal**: Upgrade `backend/Dockerfile` and `frontend/Dockerfile` base image stages from `node:20-alpine` to `node:22-alpine`.

**Independent Test**: Inspect Dockerfiles and run `docker build` commands to verify successful builds on `node:22-alpine`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Update base image in `backend/Dockerfile` from `node:20-alpine` to `node:22-alpine`
- [x] T004 [P] [US1] Update base image in `frontend/Dockerfile` from `node:20-alpine` to `node:22-alpine`
- [x] T005 [US1] Test local Docker builds on `node:22-alpine` for backend and frontend images

**Checkpoint**: At this point, User Story 1 is complete, running container builds on Node 22.

---

## Phase 4: User Story 2 - Comprehensive Project Documentation Update (Priority: P2)

**Goal**: Update root `README.md`, `backend/README.md`, and `frontend/README.md` to reference Node 22 prerequisites and provide Docker container build and deployment guides.

**Independent Test**: Verify Node 22 references and Docker sections exist across all 3 README files.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update root `README.md` prerequisites to Node.js `v22.x`, add Docker container deployment guide, and update Spec Kit workflow documentation
- [x] T007 [P] [US2] Update `backend/README.md` prerequisites to Node.js `v22.x` and add backend Docker container build and execution instructions
- [x] T008 [P] [US2] Update `frontend/README.md` prerequisites to Node.js `v22.x` and add frontend Docker container build and execution instructions

**Checkpoint**: User Stories 1 and 2 are complete, aligning code and documentation with Node 22 and Docker.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Run quickstart validation script to verify all updates.

- [x] T009 Execute quickstart validation checks from `specs/008-upgrade-node-22-readme-update/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS user story tasks.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (can run in parallel with US1).
- **Polish (Phase 5)**: Depends on Phase 3 and Phase 4 completion.

### Parallel Opportunities

- `T003` (`backend/Dockerfile`) and `T004` (`frontend/Dockerfile`) can be updated in parallel.
- `T006` (`README.md`), `T007` (`backend/README.md`), and `T008` (`frontend/README.md`) can be updated in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Complete Phase 3 (Upgrade Dockerfiles to `node:22-alpine`).
3. Validate Docker builds.

### Incremental Delivery

1. Complete MVP (Node 22 base upgrade).
2. Complete User Story 2 (Update README.md documentation files).
3. Complete Polish & Validation.
