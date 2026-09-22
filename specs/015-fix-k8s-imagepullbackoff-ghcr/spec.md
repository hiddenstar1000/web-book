# Feature Specification: Resolve Kubernetes ImagePullBackOff with GHCR Image URIs & Pull Secrets

**Feature Branch**: `015-fix-k8s-imagepullbackoff-ghcr`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Fix issues - pod ImagePullBackOff errors in Kubernetes deployment output"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Resolve ImagePullBackOff via GHCR Image URIs & Pull Secrets (Priority: P1) 🎯 MVP

As a Kubernetes operator or developer, I want all Deployment manifests in `k8s/dev` and `k8s/prod` updated to reference full GHCR container image URIs (`ghcr.io/hiddenstar1000/web-book-backend` and `ghcr.io/hiddenstar1000/web-book-frontend`), `imagePullPolicy: Always`, and `imagePullSecrets` so that Kubernetes pods pull images successfully without `ImagePullBackOff` errors.

**Why this priority**: Resolving `ImagePullBackOff` is essential for application pods to launch and reach `Running` / `1/1 Ready` status in cluster deployments.

**Independent Test**: Execute `kubectl kustomize k8s/dev/` and `kubectl kustomize k8s/prod/` to verify image fields specify full `ghcr.io/hiddenstar1000/...` URIs, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`.

**Acceptance Scenarios**:

1. **Given** `k8s/dev/backend-deployment.yaml` and `k8s/dev/frontend-deployment.yaml`, **When** rendered, **Then** backend container image is `ghcr.io/hiddenstar1000/web-book-backend:dev`, frontend container image is `ghcr.io/hiddenstar1000/web-book-frontend:dev`, `imagePullPolicy` is set to `Always`, and `imagePullSecrets` references `ghcr-secret`.
2. **Given** `k8s/prod/backend-deployment.yaml` and `k8s/prod/frontend-deployment.yaml`, **When** rendered, **Then** backend container image is `ghcr.io/hiddenstar1000/web-book-backend:latest`, frontend container image is `ghcr.io/hiddenstar1000/web-book-frontend:latest`, `imagePullPolicy` is set to `Always`, and `imagePullSecrets` references `ghcr-secret`.
3. **Given** `kubectl apply -k k8s/dev/` or `k8s/prod/`, **When** pods start up, **Then** container images pull cleanly without throwing `ImagePullBackOff`.

---

### User Story 2 - CI/CD Release Pipeline Image Alignment (Priority: P2)

As a DevOps engineer, I want `.github/workflows/publish-ghcr.yaml` verified to ensure pushed image tags (`dev` for dev branch, `latest` for main branch) align exactly with the Deployment manifest image specifications.

**Why this priority**: Aligning CI/CD push tags with Kubernetes manifest specifications guarantees that automated deployments pull the exact built artifacts.

**Independent Test**: Inspect `.github/workflows/publish-ghcr.yaml` and run YAML validation checks.

**Acceptance Scenarios**:

1. **Given** GitHub Actions workflow runs on `dev` or `main`, **When** images build and push to GHCR, **Then** tags (`:dev` or `:latest`) match the Kubernetes deployment image fields.

---

### User Story 3 - GHCR Secret Creation Documentation & Guide (Priority: P3)

As a cluster administrator, I want step-by-step instructions in `README.md` and `k8s/README.md` detailing how to create the `ghcr-secret` image pull secret (`kubectl create secret docker-registry ghcr-secret ...`) prior to deploying manifests.

**Why this priority**: Clear documentation enables operators to easily set up repository credentials on fresh cluster nodes.

**Independent Test**: Review `README.md` and `k8s/README.md` to ensure `kubectl create secret docker-registry ghcr-secret` instructions are clearly explained.

**Acceptance Scenarios**:

1. **Given** a new cluster environment, **When** an operator follows the setup documentation, **Then** they can create `ghcr-secret` with personal access token credentials and deploy the application.

---

### Edge Cases

- What happens if `ghcr-secret` is missing in the target namespace? (Documented setup instructions and client dry-run validation ensure operators create `ghcr-secret` in `app-web-book-dev` and `app-web-book-prod` before applying manifests).
- What happens when a container tag is updated on GHCR without changing the tag name? (`imagePullPolicy: Always` ensures Kubernetes fetches the newest container image digest on every pod restart).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update `image` fields in `k8s/dev/backend-deployment.yaml` and `k8s/dev/frontend-deployment.yaml` to `ghcr.io/hiddenstar1000/web-book-backend:dev` and `ghcr.io/hiddenstar1000/web-book-frontend:dev`.
- **FR-002**: System MUST update `image` fields in `k8s/prod/backend-deployment.yaml` and `k8s/prod/frontend-deployment.yaml` to `ghcr.io/hiddenstar1000/web-book-backend:latest` and `ghcr.io/hiddenstar1000/web-book-frontend:latest`.
- **FR-003**: System MUST set `imagePullPolicy: Always` across all backend and frontend Deployment specs in both `k8s/dev/` and `k8s/prod/`.
- **FR-004**: System MUST add `imagePullSecrets: [{ name: ghcr-secret }]` to all Deployment pod specs in both `k8s/dev/` and `k8s/prod/`.
- **FR-005**: System MUST update root `README.md` and `k8s/README.md` with instructions for creating `ghcr-secret` using `kubectl create secret docker-registry ghcr-secret`.

### Key Entities

- **Dev Image Spec**: `ghcr.io/hiddenstar1000/web-book-backend:dev` and `ghcr.io/hiddenstar1000/web-book-frontend:dev`.
- **Prod Image Spec**: `ghcr.io/hiddenstar1000/web-book-backend:latest` and `ghcr.io/hiddenstar1000/web-book-frontend:latest`.
- **Image Pull Secret**: `ghcr-secret` (`kubernetes.io/dockerconfigjson`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `kubectl kustomize k8s/dev/` renders backend and frontend images with `ghcr.io/hiddenstar1000/...:dev`, `imagePullPolicy: Always`, and `imagePullSecrets: ghcr-secret`.
- **SC-002**: `kubectl kustomize k8s/prod/` renders backend and frontend images with `ghcr.io/hiddenstar1000/...:latest`, `imagePullPolicy: Always`, and `imagePullSecrets: ghcr-secret`.
- **SC-003**: `kubectl apply --dry-run=client -k k8s/dev/` and `kubectl apply --dry-run=client -k k8s/prod/` execute cleanly with 100% valid schema.
- **SC-004**: Deployment documentation clearly includes `ghcr-secret` creation commands for dev and prod namespaces.

## Assumptions

- GitHub Container Registry (GHCR) images are hosted under `ghcr.io/hiddenstar1000/web-book-backend` and `ghcr.io/hiddenstar1000/web-book-frontend`.
- Cluster administrators will create `ghcr-secret` in `app-web-book-dev` and `app-web-book-prod` using a GitHub Personal Access Token (read:packages permission).
