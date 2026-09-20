# Tasks: Ingress Load Balancing & TLS Configuration for Dev and Prod Domains

**Feature Directory**: `specs/013-k8s-ingress-tls-domains`
**Feature Branch**: `013-k8s-ingress-tls-domains`
**Spec File**: `specs/013-k8s-ingress-tls-domains/spec.md`
**Plan File**: `specs/013-k8s-ingress-tls-domains/plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inspect current Ingress resources and verify target environments.

- [x] T001 Inspect `k8s/dev/ingress.yaml` and `k8s/prod/ingress.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish domain host naming standards and cert-manager annotation guidelines.

- [x] T002 Confirm domain assignments (`spanish-story.dixonai.net` for dev, `tripitaka.dixonai.net` for prod) and TLS secret names (`spanish-story-tls` and `tripitaka-tls`)

---

## Phase 3: User Story 1 - Environment-Specific Domain Ingress & TLS Termination (Priority: P1) 🎯 MVP

**Goal**: Configure host domain routing and TLS termination in `k8s/dev/ingress.yaml` and `k8s/prod/ingress.yaml`.

**Independent Test**: Execute `kubectl kustomize k8s/dev/` and `kubectl kustomize k8s/prod/` and verify hosts and TLS secret names are properly rendered.

### Implementation for User Story 1

- [x] T003 [P] [US1] Update `k8s/dev/ingress.yaml` with host `spanish-story.dixonai.net`, TLS secret `spanish-story-tls`, cert-manager annotation `cert-manager.io/cluster-issuer: letsencrypt-prod`, and SSL redirect annotation
- [x] T004 [P] [US1] Update `k8s/prod/ingress.yaml` with host `tripitaka.dixonai.net`, TLS secret `tripitaka-tls`, cert-manager annotation `cert-manager.io/cluster-issuer: letsencrypt-prod`, and SSL redirect annotation

**Checkpoint**: User Story 1 complete — dev and prod Ingress manifests have domain routing and TLS spec defined.

---

## Phase 4: User Story 2 - Uniform Load Balancer Service Configuration (Priority: P2)

**Goal**: Ensure uniform Service load balancer types and port mappings between `k8s/dev` and `k8s/prod`.

**Independent Test**: Compare `k8s/dev/frontend-service.yaml` with `k8s/prod/frontend-service.yaml` and `k8s/dev/backend-service.yaml` with `k8s/prod/backend-service.yaml`.

### Implementation for User Story 2

- [x] T005 [P] [US2] Verify and align `k8s/dev/frontend-service.yaml` and `k8s/prod/frontend-service.yaml` to use matching LoadBalancer service definitions
- [x] T006 [P] [US2] Verify and align `k8s/dev/backend-service.yaml` and `k8s/prod/backend-service.yaml` to use matching ClusterIP service definitions

**Checkpoint**: User Story 2 complete — dev and prod load balance definitions are identical.

---

## Phase 5: User Story 3 - Ingress TLS & Domain Setup Documentation (Priority: P3)

**Goal**: Document domain names and TLS setup procedures in `README.md` and `k8s/README.md`.

**Independent Test**: Review `README.md` and `k8s/README.md` for domain descriptions and certificate commands.

### Implementation for User Story 3

- [x] T007 [P] [US3] Update root `README.md` to document domain names (`spanish-story.dixonai.net` and `tripitaka.dixonai.net`) and HTTPS access instructions
- [x] T008 [P] [US3] Update `k8s/README.md` to document cert-manager cluster-issuer annotations and TLS secret options for dev and prod

**Checkpoint**: All user stories complete with full documentation alignment.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Execute complete quickstart validation suite across both environment bundles.

- [x] T009 Execute quickstart validation checks from `specs/013-k8s-ingress-tls-domains/quickstart.md`

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

- `T003` and `T004` in Phase 3 can run in parallel.
- `T005` and `T006` in Phase 4 can run in parallel.
- `T007` and `T008` in Phase 5 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2.
2. Update `k8s/dev/ingress.yaml` and `k8s/prod/ingress.yaml`.
3. Validate Kustomize rendering for domain host rules and TLS secret names.

### Incremental Delivery

1. Complete MVP (Ingress domain & TLS configuration).
2. Complete User Story 2 (Uniform Service definitions).
3. Complete User Story 3 (Update documentation).
4. Run full quickstart validation checks.
