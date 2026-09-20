# Tasks: Kubernetes ConfigMaps & Secrets Integration

**Feature Directory**: `specs/011-k8s-configmaps-secrets`
**Feature Branch**: `011-k8s-configmaps-secrets`
**Spec File**: `specs/011-k8s-configmaps-secrets/spec.md`
**Plan File**: `specs/011-k8s-configmaps-secrets/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inspect backend environment variables and current Kubernetes manifests.

- [x] T001 Inspect `backend/.env`, `k8s/backend-deployment.yaml`, and `k8s/kustomization.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm key-value mappings for ConfigMap and Secret manifests.

- [x] T002 Verify `PORT` ConfigMap mapping and `MONGODB_URI` Secret mapping

---

## Phase 3: User Story 1 - Kubernetes ConfigMap and Secret Generation (Priority: P1) 🎯 MVP

**Goal**: Create ConfigMap manifest (`k8s/backend-configmap.yaml`) and Secret manifests (`k8s/backend-secret.yaml` and `k8s/backend-secret-example.yaml`).

**Independent Test**: Validate ConfigMap and Secret schema via `kubectl apply --dry-run=client -f k8s/backend-secret-example.yaml`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create ConfigMap manifest in `k8s/backend-configmap.yaml` with `PORT: "3001"`
- [x] T004 [P] [US1] Create template Secret manifest in `k8s/backend-secret-example.yaml` with example `MONGODB_URI`
- [x] T005 [P] [US1] Create local Secret manifest in `k8s/backend-secret.yaml` with production/local `MONGODB_URI` connection string

**Checkpoint**: At this point, User Story 1 is complete, providing ConfigMap and Secret manifests.

---

## Phase 4: User Story 2 - Deployment Reference Integration & Kustomize Exclusion (Priority: P2)

**Goal**: Update `k8s/backend-deployment.yaml` to reference `configMapKeyRef` and `secretKeyRef`, and add `backend-configmap.yaml` to `k8s/kustomization.yaml` while explicitly excluding secrets.

**Independent Test**: Verify deployment `env` section references and confirm `k8s/kustomization.yaml` does not list secret manifests.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update `k8s/backend-deployment.yaml` to source `PORT` from `web-book-backend-config` via `configMapKeyRef` and `MONGODB_URI` from `web-book-backend-secret` via `secretKeyRef`
- [x] T007 [P] [US2] Add `backend-configmap.yaml` to `k8s/kustomization.yaml` resources list while explicitly EXCLUDING `backend-secret.yaml` and `backend-secret-example.yaml`

**Checkpoint**: User Stories 1 and 2 are complete, integrating ConfigMaps and Secrets securely.

---

## Phase 5: User Story 3 - Documentation Updates (Priority: P3)

**Goal**: Update `README.md` and `backend/README.md` to document the new ConfigMap and Secret manifests and explain manual secret application.

**Independent Test**: Review `README.md` and `backend/README.md` to verify ConfigMap and Secret setup steps are clearly documented.

### Implementation for User Story 3

- [x] T008 [P] [US3] Update root `README.md` to document `backend-configmap.yaml` and `backend-secret.yaml` with manual `kubectl apply` commands
- [x] T009 [P] [US3] Update `backend/README.md` to document `backend-configmap.yaml` and `backend-secret.yaml` with manual `kubectl apply` commands

**Checkpoint**: All user stories are complete, aligning infrastructure and documentation.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Execute dry-run and Kustomize validation checks.

- [x] T010 Execute quickstart validation checks from `specs/011-k8s-configmaps-secrets/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS user story tasks.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion.
- **User Story 3 (Phase 5)**: Depends on Phase 4 completion.
- **Polish (Phase 6)**: Depends on Phase 5 completion.

### Parallel Opportunities

- `T003`, `T004`, and `T005` in Phase 3 can be created in parallel.
- `T006` and `T007` in Phase 4 can be created in parallel.
- `T008` and `T009` in Phase 5 can be updated in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Complete Phase 3 (Create ConfigMap and Secret manifests).
3. Validate Secret schema dry-run.

### Incremental Delivery

1. Complete MVP (ConfigMap & Secret manifests).
2. Complete User Story 2 (Deployment references & Kustomize update).
3. Complete User Story 3 (Update README documentation).
4. Run complete quickstart validation.
