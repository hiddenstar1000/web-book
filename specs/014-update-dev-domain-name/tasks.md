# Tasks: Update Development Domain Name to spanish-stories.dixonai.net

**Feature Directory**: `specs/014-update-dev-domain-name`
**Feature Branch**: `014-update-dev-domain-name`
**Spec File**: `specs/014-update-dev-domain-name/spec.md`
**Plan File**: `specs/014-update-dev-domain-name/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inspect current dev Ingress resource.

- [x] T001 Inspect `k8s/dev/ingress.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm dev domain pluralization and TLS secret schema.

- [x] T002 Confirm target domain `spanish-stories.dixonai.net` and secret name `spanish-stories-tls`

---

## Phase 3: User Story 1 - Dev Ingress Domain & TLS Host Update (Priority: P1) 🎯 MVP

**Goal**: Update `k8s/dev/ingress.yaml` host and TLS secret configuration.

**Independent Test**: Run `kubectl kustomize k8s/dev/` and verify host `spanish-stories.dixonai.net` and secret `spanish-stories-tls`.

### Implementation for User Story 1

- [x] T003 [US1] Update `k8s/dev/ingress.yaml` to specify host `spanish-stories.dixonai.net` and secret `spanish-stories-tls`

**Checkpoint**: User Story 1 complete — dev Ingress updated to target `spanish-stories.dixonai.net`.

---

## Phase 4: User Story 2 - Documentation Alignment for Development Domain (Priority: P2)

**Goal**: Update project documentation references to `spanish-stories.dixonai.net`.

**Independent Test**: Search `README.md` and `k8s/README.md` for `spanish-stories.dixonai.net`.

### Implementation for User Story 2

- [x] T004 [P] [US2] Update root `README.md` dev environment domain to `spanish-stories.dixonai.net` and TLS secret to `spanish-stories-tls`
- [x] T005 [P] [US2] Update `k8s/README.md` dev environment domain to `spanish-stories.dixonai.net` and TLS secret to `spanish-stories-tls`

**Checkpoint**: User Story 2 complete — documentation fully aligned.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Execute quickstart validation checks.

- [x] T006 Execute quickstart validation checks from `specs/014-update-dev-domain-name/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion.
- **Polish (Phase 5)**: Depends on Phase 4 completion.

### Parallel Opportunities

- `T004` and `T005` in Phase 4 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Update `k8s/dev/ingress.yaml`.
3. Run `kubectl kustomize k8s/dev/` validation.

### Incremental Delivery

1. Complete MVP (Ingress manifest update).
2. Complete User Story 2 (Documentation updates).
3. Run full quickstart validation suite.
