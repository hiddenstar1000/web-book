# Research: Resolve Kubernetes ImagePullBackOff with GHCR Image URIs & Pull Secrets

**Feature**: `specs/015-fix-k8s-imagepullbackoff-ghcr`

---

## Technical Decisions & Rationale

### 1. Fully-Qualified GHCR Container Image References

- **Decision**: Update container `image` fields in Deployment specs to use full GHCR repository URLs:
  - Dev Environment (`k8s/dev/`): `ghcr.io/hiddenstar1000/web-book-backend:dev` and `ghcr.io/hiddenstar1000/web-book-frontend:dev`.
  - Prod Environment (`k8s/prod/`): `ghcr.io/hiddenstar1000/web-book-backend:latest` and `ghcr.io/hiddenstar1000/web-book-frontend:latest`.
- **Rationale**: Unqualified image names like `web-book-backend:latest` cause Kubernetes nodes to attempt pulling from Docker Hub or local docker daemon caches, leading directly to `ImagePullBackOff`. Referencing explicit GHCR URLs ensures nodes locate the remote container repository.

---

### 2. Image Pull Policy (`imagePullPolicy: Always`)

- **Decision**: Set `imagePullPolicy: Always` on all backend and frontend container definitions.
- **Rationale**: With rolling deployments using mutable tags (`dev` or `latest`), setting `imagePullPolicy: Always` forces Kubernetes worker nodes to re-check GHCR for updated layer digests on rollout restarts.

---

### 3. Image Pull Secret (`imagePullSecrets`)

- **Decision**: Add `imagePullSecrets: [{ name: ghcr-secret }]` to pod specs in all Deployment manifests.
- **Rationale**: GHCR packages require authenticated Docker registry credentials (`docker-registry` secret). Including `ghcr-secret` allows Kubernetes pods to authenticate with GHCR and pull package images smoothly.

---

### 4. Documentation & Secret Creation CLI

- **Decision**: Document the exact `kubectl create secret docker-registry ghcr-secret` command in `README.md` and `k8s/README.md`.
- **Rationale**: Clear instructions ensure cluster operators can create the secret per namespace (`app-web-book-dev` and `app-web-book-prod`) using GitHub Personal Access Tokens (PAT with `read:packages` scope).
