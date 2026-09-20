# Tasks: GHCR Publishing & Deployment Workflow Alignment

**Feature Directory**: `specs/006-publish-ghcr-workflow-update`
**Feature Branch**: `006-publish-ghcr-workflow-update`
**Spec File**: `specs/006-publish-ghcr-workflow-update/spec.md`
**Plan File**: `specs/006-publish-ghcr-workflow-update/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify repository build contexts and prepare workspace for workflow updates.

- [x] T001 Verify `./backend` and `./frontend` directory paths and container contexts in `.github/workflows/publish-ghcr.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Clean up legacy build dependencies that block valid workflow execution.

**⚠️ CRITICAL**: Must complete before updating build and deployment steps.

- [x] T002 Remove legacy Java 25 setup-java action and Maven build step (`mvn clean package`) from `.github/workflows/publish-ghcr.yaml`

---

## Phase 3: User Story 1 - Container Image Build and GHCR Publishing (Priority: P1) 🎯 MVP

**Goal**: Build Docker container images for `./backend` (NestJS) and `./frontend` (Next.js) and publish them to GHCR with branch-appropriate tags (`dev` or `latest`).

**Independent Test**: Parse `.github/workflows/publish-ghcr.yaml` and verify Docker build-push steps target `./backend` and `./frontend` contexts publishing to `ghcr.io/${{ secrets.GH_USER }}/web-book-backend:${{ env.IMAGE_TAG }}` and `ghcr.io/${{ secrets.GH_USER }}/web-book-frontend:${{ env.IMAGE_TAG }}`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Configure Docker build-and-push action for NestJS backend context `./backend` with image tag `ghcr.io/${{ secrets.GH_USER }}/web-book-backend:${{ env.IMAGE_TAG }}` in `.github/workflows/publish-ghcr.yaml`
- [x] T004 [P] [US1] Configure Docker build-and-push action for Next.js frontend context `./frontend` with image tag `ghcr.io/${{ secrets.GH_USER }}/web-book-frontend:${{ env.IMAGE_TAG }}` in `.github/workflows/publish-ghcr.yaml`
- [x] T005 [US1] Verify workflow environment variables and image tagging logic (`dev` for `dev` branch, `latest` for `main` branch) in `.github/workflows/publish-ghcr.yaml`

**Checkpoint**: At this point, User Story 1 is fully functional and publishes the correct application images to GHCR.

---

## Phase 4: User Story 2 - Automated Environment Deployment via SSH and MicroK8s (Priority: P2)

**Goal**: Execute remote SSH MicroK8s deployment rollout restarts for `web-book-backend` and `web-book-frontend` in `app-em-dev` and `app-em-prod` namespaces.

**Independent Test**: Verify SSH step script commands in `.github/workflows/publish-ghcr.yaml` target `deployment/web-book-backend` and `deployment/web-book-frontend` in `app-em-dev` and `app-em-prod` namespaces.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update SSH deployment script for DEV environment (`dev` branch, `app-em-dev` namespace) to issue rollout restarts for `deployment/web-book-backend` and `deployment/web-book-frontend` in `.github/workflows/publish-ghcr.yaml`
- [x] T007 [P] [US2] Update SSH deployment script for PROD environment (`main` branch, `app-em-prod` namespace) to issue rollout restarts for `deployment/web-book-backend` and `deployment/web-book-frontend` in `.github/workflows/publish-ghcr.yaml`

**Checkpoint**: Both User Stories 1 and 2 are complete, aligning container builds and environment restarts.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate workflow syntax and run end-to-end verification.

- [x] T008 [P] Run YAML syntax parser validation on `.github/workflows/publish-ghcr.yaml`
- [x] T009 Execute quickstart validation checks from `specs/006-publish-ghcr-workflow-update/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user story tasks.
- **User Story 1 (Phase 3)**: Depends on Phase 2 Foundational cleanup.
- **User Story 2 (Phase 4)**: Depends on Phase 3 US1 container publishing configuration.
- **Polish (Phase 5)**: Depends on Phase 4 completion.

### Parallel Opportunities

- Tasks marked `[P]` within Phase 3 (T003, T004) can be edited in parallel or sequentially.
- Tasks marked `[P]` within Phase 4 (T006, T007) can be edited in parallel or sequentially.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Clean legacy Java/Maven steps).
2. Complete Phase 3 (Configure `./backend` and `./frontend` Docker build and push actions).
3. Validate YAML syntax and build contexts.

### Incremental Delivery

1. Complete MVP (Build & Push container images to GHCR).
2. Complete User Story 2 (SSH MicroK8s rollout restarts).
3. Validate complete end-to-end workflow file.
