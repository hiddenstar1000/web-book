# Data Model & Infrastructure Schemas: Multi-Environment Kubernetes Namespaces

**Feature**: `specs/012-k8s-namespaces-environments`

---

## Kubernetes Infrastructure Entities

### 1. Namespace Entity

- **Resource Kind**: `Namespace` (`v1`)
- **Dev Instance**: `app-web-book-dev`
- **Prod Instance**: `app-web-book-prod`
- **Attributes**:
  - `metadata.name`: `app-web-book-dev` | `app-web-book-prod`
  - `metadata.labels.environment`: `dev` | `prod`

---

### 2. Environment Bundle Entity (`k8s/dev` & `k8s/prod`)

- **Dev Directory (`k8s/dev/`)**:
  - `namespace.yaml`: Creates `app-web-book-dev`
  - `backend-deployment.yaml`: NestJS API deployment (2 replicas, namespace `app-web-book-dev`)
  - `frontend-deployment.yaml`: Next.js UI deployment (2 replicas, namespace `app-web-book-dev`)
  - `backend-service.yaml`: ClusterIP service on port 3001
  - `frontend-service.yaml`: LoadBalancer service on port 3000
  - `backend-configmap.yaml`: `PORT: "3001"`
  - `backend-secret-example.yaml`: Example secret template
  - `backend-secret.yaml`: Git-ignored runtime secret
  - `ingress.yaml`: Ingress routes (`/api` -> backend:3001, `/` -> frontend:3000)
  - `kustomization.yaml`: Kustomize config setting `namespace: app-web-book-dev`

- **Prod Directory (`k8s/prod/`)**:
  - `namespace.yaml`: Creates `app-web-book-prod`
  - `backend-deployment.yaml`: NestJS API deployment (2 replicas, namespace `app-web-book-prod`)
  - `frontend-deployment.yaml`: Next.js UI deployment (2 replicas, namespace `app-web-book-prod`)
  - `backend-service.yaml`: ClusterIP service on port 3001
  - `frontend-service.yaml`: LoadBalancer service on port 3000
  - `backend-configmap.yaml`: `PORT: "3001"`
  - `backend-secret-example.yaml`: Example secret template
  - `backend-secret.yaml`: Git-ignored runtime secret
  - `ingress.yaml`: Ingress routes (`/api` -> backend:3001, `/` -> frontend:3000)
  - `kustomization.yaml`: Kustomize config setting `namespace: app-web-book-prod`

---

### 3. CI/CD Pipeline Entity (`.github/workflows/publish-ghcr.yaml`)

- **Triggers**: Pushes to `main` branch or manual `workflow_dispatch`
- **Jobs**:
  - `build-and-push-backend`: Build and push `./backend` container to `ghcr.io/${{ github.repository_owner }}/web-book-backend`
  - `build-and-push-frontend`: Build and push `./frontend` container to `ghcr.io/${{ github.repository_owner }}/web-book-frontend`
  - `validate-k8s-manifests`: Run dry-run validation checks on `k8s/dev` and `k8s/prod` bundles
