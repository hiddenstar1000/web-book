# Tasks: Set Up Declarative Secret Manifests & Example Templates

**Feature Directory**: `specs/016-setup-ghcr-secret-manifest`
**Feature Branch**: `016-setup-ghcr-secret-manifest`
**Spec File**: `specs/016-setup-ghcr-secret-manifest/spec.md`
**Plan File**: `specs/016-setup-ghcr-secret-manifest/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inspect existing secret templates and version control rules.

- [x] T001 Inspect `k8s/dev/backend-secret-example.yaml`, `k8s/prod/backend-secret-example.yaml`, and `.gitignore` file

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish consolidated secret resource schema specification.

- [x] T002 Confirm consolidated Secret schema (`web-book-backend-secret` of type `Opaque` and `ghcr-secret` of type `kubernetes.io/dockerconfigjson` in multi-document YAML)

---

## Phase 3: User Story 1 - Consolidated Declarative Secret Manifests & Example Templates (Priority: P1) 🎯 MVP

**Goal**: Create consolidated declarative secret templates (`secret-example.yaml`) in `k8s/dev/` and `k8s/prod/`, remove separate secret example files, and update `.gitignore`.

**Independent Test**: Execute `kubectl apply --dry-run=client -f k8s/dev/secret-example.yaml` and `kubectl apply --dry-run=client -f k8s/prod/secret-example.yaml` to verify schema validity, and verify `git status` ignores `secret.yaml`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create `k8s/dev/secret-example.yaml` containing consolidated Secret manifests (`web-book-backend-secret` and `ghcr-secret`)
- [x] T004 [P] [US1] Create `k8s/prod/secret-example.yaml` containing consolidated Secret manifests (`web-book-backend-secret` and `ghcr-secret`)
- [x] T005 [US1] Remove deprecated `backend-secret-example.yaml` and `ghcr-secret-example.yaml` files and update `.gitignore` to exclude `k8s/*/secret.yaml` while tracking `!k8s/*/secret-example.yaml`

**Checkpoint**: User Story 1 complete — `secret-example.yaml` templates exist in `k8s/dev/` and `k8s/prod/`, original files removed, and git ignores actual secret files.

---

## Phase 4: User Story 2 - Documentation & Deployment Guide Alignment (Priority: P2)

**Goal**: Update `README.md` and `k8s/README.md` to document setting up `secret.yaml` from `secret-example.yaml`.

**Independent Test**: Review `README.md` and `k8s/README.md` to ensure `secret-example.yaml` setup commands are documented in deployment steps.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update root `README.md` to document copying `secret-example.yaml` to `secret.yaml` and applying via `kubectl apply -f` for dev and prod namespaces
- [x] T007 [P] [US2] Update `k8s/README.md` to document declarative `secret-example.yaml` provisioning flow in environment setup procedures and security section

**Checkpoint**: User Story 2 complete — Deployment documentation updated for consolidated secret setup.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Execute complete quickstart validation suite across dev and prod bundles.

- [x] T008 Execute quickstart validation checks from `specs/016-setup-ghcr-secret-manifest/quickstart.md`
