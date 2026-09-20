# Feature Specification: Kubernetes ConfigMaps & Secrets Integration for Backend Environment Variables

**Feature Branch**: `011-k8s-configmaps-secrets`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "backend .env file values should added to configmaps and secretes. Create yaml files for it as well. Don't include them to kumstomization.yml. Update the README.md files as well."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Kubernetes ConfigMap and Secret Generation (Priority: P1)

As a DevOps engineer and system administrator, I want separate Kubernetes ConfigMap (`k8s/backend-configmap.yaml`) and Secret (`k8s/backend-secret.yaml` / `k8s/backend-secret-example.yaml`) manifests generated from the backend `.env` configuration, so that non-sensitive runtime settings (`PORT=3001`) and sensitive database connection credentials (`MONGODB_URI`) are managed as first-class Kubernetes objects.

**Why this priority**: P1 because decoupling application configuration and securing database connection credentials in Kubernetes Secrets is required for cluster security compliance.

**Independent Test**: Apply ConfigMap and Secret manifests to a Kubernetes cluster and verify `web-book-backend-config` and `web-book-backend-secret` exist and contain expected key-value pairs.

**Acceptance Scenarios**:

1. **Given** non-sensitive backend environment configuration (`PORT`), **When** `k8s/backend-configmap.yaml` is applied, **Then** ConfigMap `web-book-backend-config` is created with `PORT: "3001"`.
2. **Given** sensitive backend database connection credentials (`MONGODB_URI`), **When** `k8s/backend-secret.yaml` is applied, **Then** Secret `web-book-backend-secret` is created with `MONGODB_URI` stringData/base64 encoded value.

---

### User Story 2 - Deployment Reference Integration & Kustomize Exclusion (Priority: P2)

As a Kubernetes operator, I want `k8s/backend-deployment.yaml` updated to inject `PORT` from `web-book-backend-config` and `MONGODB_URI` from `web-book-backend-secret`, while explicitly excluding Secret files from `k8s/kustomization.yaml`, so that secrets are not committed or automatically deployed via public git bundles.

**Why this priority**: P2 because referencing external secrets prevents hardcoding credentials in deployment manifests or git-tracked Kustomize bundles.

**Independent Test**: Verify `k8s/backend-deployment.yaml` references `configMapKeyRef` and `secretKeyRef`, and confirm `k8s/kustomization.yaml` does NOT list secret files under `resources:`.

**Acceptance Scenarios**:

1. **Given** `k8s/backend-deployment.yaml`, **When** inspected for environment variables, **Then** `PORT` references `web-book-backend-config` and `MONGODB_URI` references `web-book-backend-secret`.
2. **Given** `k8s/kustomization.yaml`, **When** inspected for resource list, **Then** `backend-secret.yaml` and `backend-secret-example.yaml` are NOT present.

---

### User Story 3 - Documentation Updates (Priority: P3)

As a developer and reviewer, I want root `README.md` and `backend/README.md` updated to document the new ConfigMap and Secret manifests and explain how to apply secrets independently of Kustomize, so that developers can set up environment configurations securely.

**Why this priority**: P3 because clear documentation prevents accidental commits of production credentials and clarifies manual secret application steps.

**Independent Test**: Review `README.md` and `backend/README.md` to confirm ConfigMap/Secret usage and pre-deployment application commands are clearly explained.

**Acceptance Scenarios**:

1. **Given** root `README.md` and `backend/README.md`, **When** reading Kubernetes deployment sections, **Then** step-by-step instructions for creating ConfigMaps/Secrets prior to running `kubectl apply -k k8s/` are provided.

---

### Edge Cases

- How does the backend deployment pod behave if `web-book-backend-secret` is missing at pod scheduling time?
- How are example secrets (`backend-secret-example.yaml`) safely committed without exposing real production database connection strings?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide `k8s/backend-configmap.yaml` defining ConfigMap `web-book-backend-config` with `PORT=3001`.
- **FR-002**: System MUST provide `k8s/backend-secret.yaml` and `k8s/backend-secret-example.yaml` defining Secret `web-book-backend-secret` with `MONGODB_URI`.
- **FR-003**: System MUST NOT include `backend-secret.yaml` or `backend-secret-example.yaml` in `k8s/kustomization.yaml`.
- **FR-004**: System MUST update `k8s/backend-deployment.yaml` to inject `PORT` from `web-book-backend-config` via `configMapKeyRef` and `MONGODB_URI` from `web-book-backend-secret` via `secretKeyRef`.
- **FR-005**: System MUST update root `README.md` and `backend/README.md` to document ConfigMap and Secret manifests and provide manual apply instructions.

### Key Entities

- **Backend ConfigMap**: `web-book-backend-config` (`k8s/backend-configmap.yaml`).
- **Backend Secret**: `web-book-backend-secret` (`k8s/backend-secret.yaml`, template in `k8s/backend-secret-example.yaml`).
- **Backend Deployment Integration**: `k8s/backend-deployment.yaml` `valueFrom` references.
- **Documentation Suite**: Root `README.md`, `backend/README.md`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% valid YAML syntax for ConfigMap and Secret manifests verified via `kubectl apply --dry-run=client`.
- **SC-002**: Zero secret file references inside `k8s/kustomization.yaml`.
- **SC-003**: Backend deployment pods successfully resolve `PORT` and `MONGODB_URI` from ConfigMap and Secret objects.

## Assumptions

- Production secrets (`backend-secret.yaml`) containing sensitive database connection strings are git-ignored, while `backend-secret-example.yaml` is committed as a template.
