# Research: Multi-Environment Kubernetes Namespaces & Deployment Workflow

**Feature**: `specs/012-k8s-namespaces-environments`

---

## Technical Decisions & Rationale

### 1. Multi-Environment Directory Layout (`k8s/dev/` and `k8s/prod/`)

- **Decision**: Restructure Kubernetes manifests into environment subdirectories (`k8s/dev` and `k8s/prod`), each with dedicated `namespace.yaml` definitions and `kustomization.yaml` configuration.
- **Rationale**: Separating environments into dedicated folders ensures explicit deployment targets. Setting `namespace: app-web-book-dev` in `k8s/dev/kustomization.yaml` and `namespace: app-web-book-prod` in `k8s/prod/kustomization.yaml` enforces uniform namespace scoping across all Deployments, Services, ConfigMaps, and Ingress resources.
- **Alternatives Considered**:
  - *Single directory with Kustomize overlays*: Rejected in favor of direct environment directories (`k8s/dev/` and `k8s/prod/`) to maintain simplicity, transparency, and explicit file boundaries.

---

### 2. Namespace Creation & Management

- **Decision**: Include a explicit `namespace.yaml` resource in both `k8s/dev/` and `k8s/prod/` and reference it in the respective `kustomization.yaml` resources list.
- **Rationale**: Ensures the target namespaces (`app-web-book-dev` and `app-web-book-prod`) exist or are automatically created whenever `kubectl apply -k k8s/dev` or `kubectl apply -k k8s/prod` is executed.

---

### 3. Secret & ConfigMap Isolation

- **Decision**: Include `backend-configmap.yaml` in both `k8s/dev/` and `k8s/prod/`. Include `backend-secret-example.yaml` for reference, while keeping actual local/secret manifests (`backend-secret.yaml`) git-ignored in both environments.
- **Rationale**: Prevents accidental commit of production or dev secrets while allowing development setup via example templates.

---

### 4. GitHub Actions CI/CD Workflow (`.github/workflows/publish-ghcr.yaml`)

- **Decision**: Update `.github/workflows/publish-ghcr.yaml` to build Docker images with version/SHA tags for NestJS backend and Next.js frontend, publish to GHCR, and validate both `k8s/dev` and `k8s/prod` Kustomize overlays with dry-run assertions.
- **Rationale**: Validates that both dev (`app-web-book-dev`) and prod (`app-web-book-prod`) manifests are syntactically sound and correctly namespace-scoped on every build.
