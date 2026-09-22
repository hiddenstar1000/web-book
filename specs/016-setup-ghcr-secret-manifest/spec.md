# Feature Specification: Set Up Declarative GHCR Secret Manifests & Example Templates

**Feature Directory**: `specs/016-setup-ghcr-secret-manifest`

**Created**: 2026-09-22

**Status**: Draft

**Input**: User description: "Set up ghcr-secret using @[k8s/dev/backend-secret.yaml]"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Declarative GHCR Secret Manifests & Example Templates (Priority: P1) 🎯 MVP

As a Kubernetes operator or developer, I want declarative secret templates (`ghcr-secret-example.yaml`) and secret file patterns (`ghcr-secret.yaml`) structured in `k8s/dev/` and `k8s/prod/` (matching `backend-secret.yaml` / `backend-secret-example.yaml`), so that `ghcr-secret` credentials can be configured declaratively alongside other environment secrets.

**Why this priority**: Declarative secret example templates streamline multi-environment cluster provisioning and ensure developers can configure docker-registry credentials for private GHCR images consistently across dev and prod environments.

**Independent Test**: Verify existence of `k8s/dev/ghcr-secret-example.yaml` and `k8s/prod/ghcr-secret-example.yaml` with valid `kubernetes.io/dockerconfigjson` Secret specifications, and test applying local secret files using `kubectl apply --dry-run=client`.

**Acceptance Scenarios**:

1. **Given** `k8s/dev/` and `k8s/prod/`, **When** inspecting secret templates, **Then** `ghcr-secret-example.yaml` exists in both directories defining a Secret of type `kubernetes.io/dockerconfigjson` with placeholder credentials for `ghcr.io`.
2. **Given** local `ghcr-secret.yaml` files created from templates in `k8s/dev/` and `k8s/prod/`, **When** validating with `kubectl apply --dry-run=client`, **Then** the manifests validate successfully against Kubernetes schema.
3. **Given** `.gitignore`, **When** checking version control rules, **Then** actual `ghcr-secret.yaml` files are ignored while `ghcr-secret-example.yaml` templates are tracked in git.

---

### User Story 2 - Documentation & Deployment Guide Alignment (Priority: P2)

As a DevOps engineer or contributor, I want the root `README.md` and `k8s/README.md` updated to document the declarative `ghcr-secret-example.yaml` workflow alongside the existing `backend-secret.yaml` workflow.

**Why this priority**: Clear documentation ensures team members follow the established declarative secret pattern without exposing credentials in version control.

**Independent Test**: Review `README.md` and `k8s/README.md` to verify instructions for provisioning `ghcr-secret.yaml` from `ghcr-secret-example.yaml`.

**Acceptance Scenarios**:

1. **Given** `README.md` and `k8s/README.md`, **When** reviewing deployment steps for dev and prod environments, **Then** steps reflect copying `ghcr-secret-example.yaml` to `ghcr-secret.yaml` and applying it via `kubectl`.

---

### Edge Cases

- What happens if `.dockerconfigjson` stringData / data format is improperly formatted? (Templates MUST provide a clear, valid JSON structure template for `stringData` or `.dockerconfigjson` key to prevent decoding failures).
- What happens if a user accidentally commits `ghcr-secret.yaml`? (`.gitignore` rules MUST explicitly exclude `k8s/ghcr-secret.yaml`, `k8s/dev/ghcr-secret.yaml`, and `k8s/prod/ghcr-secret.yaml` while allowing `!k8s/*/ghcr-secret-example.yaml`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create `k8s/dev/ghcr-secret-example.yaml` containing a Kubernetes Secret resource named `ghcr-secret` of type `kubernetes.io/dockerconfigjson` with placeholder credentials.
- **FR-002**: System MUST create `k8s/prod/ghcr-secret-example.yaml` containing a Kubernetes Secret resource named `ghcr-secret` of type `kubernetes.io/dockerconfigjson` with placeholder credentials.
- **FR-003**: System MUST update `.gitignore` to exclude `k8s/ghcr-secret.yaml`, `k8s/dev/ghcr-secret.yaml`, and `k8s/prod/ghcr-secret.yaml` while tracking `!k8s/ghcr-secret-example.yaml`, `!k8s/dev/ghcr-secret-example.yaml`, and `!k8s/prod/ghcr-secret-example.yaml`.
- **FR-004**: System MUST update root `README.md` and `k8s/README.md` to include instructions for provisioning `ghcr-secret` using the declarative manifest approach.

### Key Entities

- **GHCR Secret Template (`ghcr-secret-example.yaml`)**: Declarative Kubernetes Secret template of type `kubernetes.io/dockerconfigjson` containing `.dockerconfigjson` placeholder structure for `ghcr.io`.
- **GHCR Secret Manifest (`ghcr-secret.yaml`)**: Active local Kubernetes Secret file containing user-supplied GHCR credentials (excluded from git).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `k8s/dev/ghcr-secret-example.yaml` and `k8s/prod/ghcr-secret-example.yaml` exist and pass schema validation via `kubectl apply --dry-run=client -f`.
- **SC-002**: `.gitignore` contains rules preventing actual `ghcr-secret.yaml` files from being committed to version control.
- **SC-003**: `README.md` and `k8s/README.md` document the declarative `ghcr-secret` setup workflow.

## Assumptions

- `ghcr-secret` is used by deployments in `app-web-book-dev` and `app-web-book-prod` namespaces to pull private container images from `ghcr.io`.
- Operators populate the `.dockerconfigjson` field or `stringData` key with their GitHub Personal Access Token (PAT) base64-encoded or string JSON.
