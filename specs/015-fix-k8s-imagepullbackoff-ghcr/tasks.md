# Tasks: Resolve Kubernetes ImagePullBackOff with GHCR Image URIs & Pull Secrets

**Feature Directory**: `specs/015-fix-k8s-imagepullbackoff-ghcr`
**Feature Branch**: `015-fix-k8s-imagepullbackoff-ghcr`
**Spec File**: `specs/015-fix-k8s-imagepullbackoff-ghcr/spec.md`
**Plan File**: `specs/015-fix-k8s-imagepullbackoff-ghcr/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inspect Deployment manifests in dev and prod environments.

- [x] T001 Inspect `k8s/dev/backend-deployment.yaml`, `k8s/dev/frontend-deployment.yaml`, `k8s/prod/backend-deployment.yaml`, and `k8s/prod/frontend-deployment.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish GHCR repository URL standards and image pull secret schema.

- [x] T002 Confirm GHCR image paths (`ghcr.io/hiddenstar1000/web-book-backend` and `ghcr.io/hiddenstar1000/web-book-frontend`) and secret reference `ghcr-secret`

---

## Phase 3: User Story 1 - Resolve ImagePullBackOff via GHCR Image URIs & Pull Secrets (Priority: P1) 🎯 MVP

**Goal**: Update all Deployment specs to reference full GHCR URIs, `imagePullPolicy: Always`, and `imagePullSecrets`.

**Independent Test**: Execute `kubectl kustomize k8s/dev/` and `kubectl kustomize k8s/prod/` to verify GHCR image URLs, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Update `k8s/dev/backend-deployment.yaml` to specify `image: ghcr.io/hiddenstar1000/web-book-backend:dev`, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`
- [x] T004 [P] [US1] Update `k8s/dev/frontend-deployment.yaml` to specify `image: ghcr.io/hiddenstar1000/web-book-frontend:dev`, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`
- [x] T005 [P] [US1] Update `k8s/prod/backend-deployment.yaml` to specify `image: ghcr.io/hiddenstar1000/web-book-backend:latest`, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`
- [x] T006 [P] [US1] Update `k8s/prod/frontend-deployment.yaml` to specify `image: ghcr.io/hiddenstar1000/web-book-frontend:latest`, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`

**Checkpoint**: User Story 1 complete — Deployment specs specify GHCR URLs, `imagePullPolicy: Always`, and `ghcr-secret`.

---

## Phase 4: User Story 2 - CI/CD Release Pipeline Image Alignment (Priority: P2)

**Goal**: Verify `.github/workflows/publish-ghcr.yaml` image tags and build steps match Kubernetes deployment specs.

**Independent Test**: Validate `.github/workflows/publish-ghcr.yaml` with YAML syntax check.

### Implementation for User Story 2

- [x] T007 [US2] Verify `.github/workflows/publish-ghcr.yaml` tag declarations match Kubernetes manifest image fields

**Checkpoint**: User Story 2 complete — CI/CD release workflow and Kubernetes manifests aligned.

---

## Phase 5: User Story 3 - GHCR Secret Creation Documentation & Guide (Priority: P3)

**Goal**: Update `README.md` and `k8s/README.md` with step-by-step `kubectl create secret docker-registry ghcr-secret` instructions.

**Independent Test**: Review `README.md` and `k8s/README.md` for GHCR secret creation CLI commands.

### Implementation for User Story 3

- [x] T008 [P] [US3] Update root `README.md` to document `kubectl create secret docker-registry ghcr-secret` setup steps for dev and prod namespaces
- [x] T009 [P] [US3] Update `k8s/README.md` to document `ghcr-secret` creation and troubleshooting steps for `ImagePullBackOff`

**Checkpoint**: All user stories complete with full documentation alignment.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Execute complete quickstart validation suite across dev and prod bundles.

- [x] T010 Execute quickstart validation checks from `specs/015-fix-k8s-imagepullbackoff-ghcr/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion.
- **User Story 3 (Phase 5)**: Depends on Phase 4 completion.
- **Polish (Phase 6)**: Depends on Phase 5 completion.

### Parallel Opportunities

- `T003`, `T004`, `T005`, and `T006` in Phase 3 can run in parallel.
- `T008` and `T009` in Phase 5 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Update Deployment specs in `k8s/dev/` and `k8s/prod/`.
3. Run `kubectl kustomize k8s/dev/` and `kubectl kustomize k8s/prod/` validation.

### Incremental Delivery

1. Complete MVP (GHCR image URLs, `imagePullPolicy: Always`, and `imagePullSecrets`).
2. Complete User Story 2 (CI/CD pipeline alignment).
3. Complete User Story 3 (Update documentation).
4. Run full quickstart validation suite.
