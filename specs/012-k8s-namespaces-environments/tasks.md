# Tasks: Multi-Environment Kubernetes Namespaces & Deployment Workflow

**Feature Directory**: `specs/012-k8s-namespaces-environments`
**Feature Branch**: `012-k8s-namespaces-environments`
**Spec File**: `specs/012-k8s-namespaces-environments/spec.md`
**Plan File**: `specs/012-k8s-namespaces-environments/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inspect existing Kubernetes files and prepare environment directory structure.

- [x] T001 Inspect current root `k8s/` manifests and `.github/workflows/publish-ghcr.yaml`
- [x] T002 Create target environment subdirectories `k8s/dev/` and `k8s/prod/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create Namespace manifest templates for `app-web-book-dev` and `app-web-book-prod`.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Create namespace manifest in `k8s/dev/namespace.yaml` defining namespace `app-web-book-dev` with label `environment: dev`
- [x] T004 [P] Create namespace manifest in `k8s/prod/namespace.yaml` defining namespace `app-web-book-prod` with label `environment: prod`

**Checkpoint**: Foundation ready — environment namespace declarations created.

---

## Phase 3: User Story 1 - Multi-Environment Kubernetes Manifest Organization (Priority: P1) 🎯 MVP

**Goal**: Create complete Kubernetes manifest bundles for `k8s/dev` (targeting `app-web-book-dev`) and `k8s/prod` (targeting `app-web-book-prod`), updating gitignore rules for runtime secrets.

**Independent Test**: Execute `kubectl kustomize k8s/dev` and `kubectl kustomize k8s/prod` and verify all rendered resources specify `namespace: app-web-book-dev` and `namespace: app-web-book-prod` respectively.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create dev workload manifests in `k8s/dev/backend-deployment.yaml`, `k8s/dev/frontend-deployment.yaml`, `k8s/dev/backend-service.yaml`, `k8s/dev/frontend-service.yaml`, `k8s/dev/backend-configmap.yaml`, `k8s/dev/backend-secret-example.yaml`, and `k8s/dev/ingress.yaml`
- [x] T006 [P] [US1] Create `k8s/dev/kustomization.yaml` declaring `namespace: app-web-book-dev` and referencing all `k8s/dev/` resources except secret files
- [x] T007 [P] [US1] Create prod workload manifests in `k8s/prod/backend-deployment.yaml`, `k8s/prod/frontend-deployment.yaml`, `k8s/prod/backend-service.yaml`, `k8s/prod/frontend-service.yaml`, `k8s/prod/backend-configmap.yaml`, `k8s/prod/backend-secret-example.yaml`, and `k8s/prod/ingress.yaml`
- [x] T008 [P] [US1] Create `k8s/prod/kustomization.yaml` declaring `namespace: app-web-book-prod` and referencing all `k8s/prod/` resources except secret files
- [x] T009 [US1] Update `.gitignore` to explicitly ignore `k8s/dev/backend-secret.yaml` and `k8s/prod/backend-secret.yaml` while tracking example secret templates

**Checkpoint**: User Story 1 is complete, providing standalone, namespace-scoped dev and prod Kubernetes environments.

---

## Phase 4: User Story 2 - CI/CD GitHub Actions Workflow Environment Integration (Priority: P2)

**Goal**: Update `.github/workflows/publish-ghcr.yaml` to handle GHCR container image publishing and Kustomize dry-run validation for dev (`app-web-book-dev`) and prod (`app-web-book-prod`).

**Independent Test**: Run workflow YAML parser check `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/publish-ghcr.yaml'))"` and execute Kustomize dry-run checks.

### Implementation for User Story 2

- [x] T010 [US2] Update `.github/workflows/publish-ghcr.yaml` with GHCR image tagging, multi-environment Kustomize validation, and deployment steps targeting `app-web-book-dev` and `app-web-book-prod`

**Checkpoint**: User Story 2 is complete, automating multi-environment CI/CD deployment checks.

---

## Phase 5: User Story 3 - Multi-Environment Documentation & Operator Guide (Priority: P3)

**Goal**: Update root `README.md` and `k8s/README.md` to document deployment commands and namespace management for dev and prod environments.

**Independent Test**: Review `README.md` and `k8s/README.md` to confirm step-by-step instructions for `kubectl apply -k k8s/dev` and `kubectl apply -k k8s/prod` are clearly documented.

### Implementation for User Story 3

- [x] T011 [P] [US3] Update root `README.md` to document deployment procedures for `k8s/dev` (`app-web-book-dev`) and `k8s/prod` (`app-web-book-prod`)
- [x] T012 [P] [US3] Create/update `k8s/README.md` to document directory structure, namespace definitions, and secret creation for dev and prod environments

**Checkpoint**: All user stories complete with full documentation alignment.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Execute complete quickstart validation suite across both environment bundles.

- [x] T013 Execute quickstart validation checks from `specs/012-k8s-namespaces-environments/quickstart.md`

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

- `T003` and `T004` in Phase 2 can be created in parallel.
- `T005`, `T006`, `T007`, `T008` in Phase 3 can be created in parallel.
- `T011` and `T012` in Phase 5 can be updated in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Complete Phase 3 (Create `k8s/dev/` and `k8s/prod/` manifests).
3. Validate Kustomize rendering for dev (`app-web-book-dev`) and prod (`app-web-book-prod`).

### Incremental Delivery

1. Complete MVP (Multi-environment k8s manifests).
2. Complete User Story 2 (Update `.github/workflows/publish-ghcr.yaml`).
3. Complete User Story 3 (Update documentation).
4. Run complete quickstart validation.
