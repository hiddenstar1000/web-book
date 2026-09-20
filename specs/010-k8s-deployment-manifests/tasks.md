# Tasks: Kubernetes Deployment Manifests & Kustomization Setup

**Feature Directory**: `specs/010-k8s-deployment-manifests`
**Feature Branch**: `010-k8s-deployment-manifests`
**Spec File**: `specs/010-k8s-deployment-manifests/spec.md`
**Plan File**: `specs/010-k8s-deployment-manifests/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare workspace and target directory for Kubernetes manifests.

- [x] T001 Create `k8s/` directory structure for Kubernetes manifests

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm service port specifications and cluster selector conventions.

- [x] T002 Verify selector labels (`app: web-book-backend`, `app: web-book-frontend`) and port configurations (3001 for backend, 3000 for frontend)

---

## Phase 3: User Story 1 - Decoupled API and UI Pod Deployments (Priority: P1) 🎯 MVP

**Goal**: Create separate Kubernetes Deployment manifests for NestJS API backend (`replicas: 2`) and Next.js Web UI (`replicas: 2`).

**Independent Test**: Validate Deployment manifest specs and verify `replicas: 2` configuration.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create NestJS API backend Deployment manifest in `k8s/backend-deployment.yaml` with `replicas: 2`, `containerPort: 3001`, and resource limits
- [x] T004 [P] [US1] Create Next.js Web UI frontend Deployment manifest in `k8s/frontend-deployment.yaml` with `replicas: 2`, `containerPort: 3000`, and resource limits

**Checkpoint**: At this point, User Story 1 is complete, providing 2-replica deployment specs for backend and frontend workloads.

---

## Phase 4: User Story 2 - Networking, Ingress, and LoadBalancer Setup (Priority: P2)

**Goal**: Create Kubernetes ClusterIP service for API backend, LoadBalancer service for Web UI frontend, and an NGINX Ingress controller resource routing `/api` and `/` paths.

**Independent Test**: Verify service selector labels and ingress path routing specs (`/api` -> `web-book-backend-service:3001`, `/` -> `web-book-frontend-service:3000`).

### Implementation for User Story 2

- [x] T005 [P] [US2] Create backend ClusterIP Service manifest in `k8s/backend-service.yaml` exposing port 3001 for `web-book-backend` pods
- [x] T006 [P] [US2] Create frontend LoadBalancer Service manifest in `k8s/frontend-service.yaml` exposing port 3000 for `web-book-frontend` pods
- [x] T007 [P] [US2] Create Ingress routing manifest in `k8s/ingress.yaml` routing `/api` to `web-book-backend-service:3001` and `/` to `web-book-frontend-service:3000`

**Checkpoint**: User Stories 1 and 2 are complete, covering workloads and cluster networking.

---

## Phase 5: User Story 3 - Kustomization Aggregation (Priority: P3)

**Goal**: Create `k8s/kustomization.yaml` aggregating all deployments, services, and ingress manifests for single-command `kubectl apply -k k8s/` execution.

**Independent Test**: Render complete manifest stream using `kubectl kustomize k8s/`.

### Implementation for User Story 3

- [x] T008 [US3] Create Kustomize aggregator manifest in `k8s/kustomization.yaml` listing all deployment, service, and ingress resources

**Checkpoint**: All user stories are complete, forming a unified Kustomize bundle.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Run schema and dry-run validation checks.

- [x] T009 [P] Validate manifests using `kubectl kustomize k8s/` and `kubectl apply --dry-run=client -k k8s/` per `specs/010-k8s-deployment-manifests/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS user story tasks.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (can run in parallel with US1).
- **User Story 3 (Phase 5)**: Depends on Phase 3 and Phase 4 completion.
- **Polish (Phase 6)**: Depends on Phase 5 completion.

### Parallel Opportunities

- `T003` (`backend-deployment.yaml`) and `T004` (`frontend-deployment.yaml`) can be created in parallel.
- `T005` (`backend-service.yaml`), `T006` (`frontend-service.yaml`), and `T007` (`ingress.yaml`) can be created in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Complete Phase 3 (`backend-deployment.yaml` and `frontend-deployment.yaml`).
3. Validate deployment manifest syntax.

### Incremental Delivery

1. Complete MVP (Decoupled pod deployments).
2. Complete User Story 2 (Networking services & Ingress).
3. Complete User Story 3 (`kustomization.yaml` aggregator).
4. Run complete quickstart validation.
