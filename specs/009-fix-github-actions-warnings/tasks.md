# Tasks: GitHub Actions Node.js 20 Deprecation Warning Fix

**Feature Directory**: `specs/009-fix-github-actions-warnings`
**Feature Branch**: `009-fix-github-actions-warnings`
**Spec File**: `specs/009-fix-github-actions-warnings/spec.md`
**Plan File**: `specs/009-fix-github-actions-warnings/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify current action steps in the release workflow.

- [x] T001 Inspect action `uses:` definitions in `.github/workflows/publish-ghcr.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm Node 24 native action versions before editing.

- [x] T002 Verify target major versions: `actions/checkout@v5`, `docker/login-action@v4`, `docker/build-push-action@v7`, and `appleboy/ssh-action@v1.2.0`

---

## Phase 3: User Story 1 - Upgrade GitHub Action Major Versions (Priority: P1) 🎯 MVP

**Goal**: Update all GitHub Action steps in `.github/workflows/publish-ghcr.yaml` to major versions natively targeting Node.js 24 runtime.

**Independent Test**: Parse `.github/workflows/publish-ghcr.yaml` and verify zero deprecated action versions (`actions/checkout@v4`, `docker/login-action@v3`, `docker/build-push-action@v6`) remain.

### Implementation for User Story 1

- [x] T003 [P] [US1] Update checkout step from `actions/checkout@v4` to `actions/checkout@v5` in `.github/workflows/publish-ghcr.yaml`
- [x] T004 [P] [US1] Update GHCR login step from `docker/login-action@v3` to `docker/login-action@v4` in `.github/workflows/publish-ghcr.yaml`
- [x] T005 [P] [US1] Update backend and frontend build steps from `docker/build-push-action@v6` to `docker/build-push-action@v7` in `.github/workflows/publish-ghcr.yaml`
- [x] T006 [P] [US1] Update SSH deployment step from `appleboy/ssh-action@v1.0.3` to `appleboy/ssh-action@v1.2.0` in `.github/workflows/publish-ghcr.yaml`

**Checkpoint**: At this point, User Story 1 is complete and all actions are upgraded for Node 24 runners.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Validate workflow syntax and run verification checks.

- [x] T007 [P] Run Node YAML syntax parser check on `.github/workflows/publish-ghcr.yaml`
- [x] T008 Execute quickstart validation checks from `specs/009-fix-github-actions-warnings/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS user story tasks.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **Polish (Phase 4)**: Depends on Phase 3 completion.

### Parallel Opportunities

- `T003`, `T004`, `T005`, and `T006` within Phase 3 can be edited in parallel or in a single pass.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Complete Phase 3 (Upgrade action versions in `.github/workflows/publish-ghcr.yaml`).
3. Validate YAML syntax and action version greps.
