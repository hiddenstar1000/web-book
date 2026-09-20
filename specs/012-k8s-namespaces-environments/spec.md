# Feature Specification: Multi-Environment Kubernetes Namespaces & Deployment Workflow

**Feature Branch**: `012-k8s-namespaces-environments`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Deploy full app in a namespace called app-web-book-dev for dev and app-web-book-prod for prod. Create k8s files in folders. Update the .github/workflows/publish-ghcr.yaml as well"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Multi-Environment Kubernetes Manifest Organization (Priority: P1) 🎯 MVP

As a DevOps engineer or cluster administrator, I want Kubernetes manifests organized into environment-specific folders (`k8s/dev` and `k8s/prod`) with isolated namespaces (`app-web-book-dev` and `app-web-book-prod`) so that development and production deployments can be managed independently without resource or configuration conflicts.

**Why this priority**: Namespace isolation is essential to prevent staging or development deployments from interfering with production workloads and configurations.

**Independent Test**: Execute `kubectl kustomize k8s/dev` and `kubectl kustomize k8s/prod` to verify all generated resources target `app-web-book-dev` and `app-web-book-prod` respectively.

**Acceptance Scenarios**:

1. **Given** the `k8s/dev` folder, **When** Kustomize renders manifests, **Then** all rendered resources (Deployments, Services, Ingress, ConfigMaps) specify namespace `app-web-book-dev`.
2. **Given** the `k8s/prod` folder, **When** Kustomize renders manifests, **Then** all rendered resources (Deployments, Services, Ingress, ConfigMaps) specify namespace `app-web-book-prod`.
3. **Given** standalone namespace manifests, **When** applied to a cluster (`kubectl apply`), **Then** namespaces `app-web-book-dev` and `app-web-book-prod` are created cleanly.

---

### User Story 2 - CI/CD GitHub Actions Workflow Environment Integration (Priority: P2)

As a developer committing code to the repository, I want the GitHub Actions workflow (`.github/workflows/publish-ghcr.yaml`) updated to support image tagging and multi-environment deployment steps targeting `app-web-book-dev` and `app-web-book-prod` namespaces based on branch or release triggers.

**Why this priority**: Automating builds and deployments per environment reduces manual operational overhead and ensures consistent container deployments.

**Independent Test**: Validate the updated workflow file using YAML linters and dry-run action syntax checks.

**Acceptance Scenarios**:

1. **Given** a commit to `main` or development branches, **When** the GitHub Actions workflow triggers, **Then** container images are built, tagged for GHCR, and deployment manifests apply to `app-web-book-dev` or `app-web-book-prod` appropriately.
2. **Given** secret environment variables, **When** workflow steps run, **Then** Kubernetes deployment commands target the appropriate environment namespace using repository secrets.

---

### User Story 3 - Multi-Environment Documentation & Operator Guide (Priority: P3)

As a developer or site reliability engineer, I want updated documentation in root `README.md` and `k8s/` detailing how to apply dev and prod manifests manually or via CI/CD.

**Why this priority**: Clear documentation ensures onboarding developers and SREs can safely deploy and inspect environments.

**Independent Test**: Review `README.md` to ensure `kubectl apply -k k8s/dev` and `kubectl apply -k k8s/prod` instructions are clearly explained.

**Acceptance Scenarios**:

1. **Given** updated documentation, **When** a user follows the deployment guide, **Then** they can deploy both dev and prod environments with correct namespace parameters.

---

### Edge Cases

- What happens if the target namespace does not exist prior to running Kustomize apply? (The manifest structure MUST include namespace creation resources or documented prerequisites).
- How does the system handle secret injection across dev and prod environments? (Secret manifests in `dev` and `prod` MUST be excluded from version control while example templates remain provided).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST organize Kubernetes manifests into distinct `k8s/dev/` and `k8s/prod/` environment directories.
- **FR-002**: System MUST configure `k8s/dev/` manifests to deploy all API and UI pods, services, ingress, and configmaps into namespace `app-web-book-dev`.
- **FR-003**: System MUST configure `k8s/prod/` manifests to deploy all API and UI pods, services, ingress, and configmaps into namespace `app-web-book-prod`.
- **FR-004**: System MUST include environment-specific `kustomization.yaml` files in `k8s/dev/` and `k8s/prod/` setting `namespace: app-web-book-dev` and `namespace: app-web-book-prod` respectively.
- **FR-005**: System MUST update `.github/workflows/publish-ghcr.yaml` to handle building, tagging, and publishing GHCR images with environment/namespace awareness.
- **FR-006**: Secret manifests (`backend-secret.yaml`) in `k8s/dev/` and `k8s/prod/` MUST be excluded from version control (`.gitignore`), while example templates (`backend-secret-example.yaml`) are provided.

### Key Entities

- **Dev Environment Bundle**: Kubernetes resources scoped to namespace `app-web-book-dev` located under `k8s/dev/`.
- **Prod Environment Bundle**: Kubernetes resources scoped to namespace `app-web-book-prod` located under `k8s/prod/`.
- **GHCR Workflow**: GitHub Actions workflow defined in `.github/workflows/publish-ghcr.yaml` responsible for building, tagging, and deploying images.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of rendered manifests under `k8s/dev/` specify namespace `app-web-book-dev` during `kubectl kustomize k8s/dev`.
- **SC-002**: 100% of rendered manifests under `k8s/prod/` specify namespace `app-web-book-prod` during `kubectl kustomize k8s/prod`.
- **SC-003**: `kubectl apply --dry-run=client -k k8s/dev` and `kubectl apply --dry-run=client -k k8s/prod` execute cleanly without validation errors.
- **SC-004**: `.github/workflows/publish-ghcr.yaml` passes syntax validation and successfully references dev and prod namespaces.

## Assumptions

- Namespace `app-web-book-dev` and `app-web-book-prod` will be created automatically via namespace manifests (`namespace.yaml`) or Kustomize namespace declarations.
- Dev and production environments use separate ConfigMap and Secret values tailored to their respective deployment targets.
- GitHub Actions workflow will use GHCR image registry references corresponding to the project's repository.
