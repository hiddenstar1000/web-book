# Data Model & Infrastructure Schemas: GHCR Image & Pull Secret Alignment

**Feature**: `specs/015-fix-k8s-imagepullbackoff-ghcr`

---

## Infrastructure Entities

### 1. Dev Deployment Pod Schema (`k8s/dev/backend-deployment.yaml` & `frontend-deployment.yaml`)

- **Resource Kind**: `Deployment` (`apps/v1`)
- **Container Specs**:
  - `backend`:
    - `image`: `ghcr.io/hiddenstar1000/web-book-backend:dev`
    - `imagePullPolicy`: `Always`
  - `frontend`:
    - `image`: `ghcr.io/hiddenstar1000/web-book-frontend:dev`
    - `imagePullPolicy`: `Always`
- **Pod Spec**:
  - `imagePullSecrets`:
    - `name`: `ghcr-secret`

---

### 2. Prod Deployment Pod Schema (`k8s/prod/backend-deployment.yaml` & `frontend-deployment.yaml`)

- **Resource Kind**: `Deployment` (`apps/v1`)
- **Container Specs**:
  - `backend`:
    - `image`: `ghcr.io/hiddenstar1000/web-book-backend:latest`
    - `imagePullPolicy`: `Always`
  - `frontend`:
    - `image`: `ghcr.io/hiddenstar1000/web-book-frontend:latest`
    - `imagePullPolicy`: `Always`
- **Pod Spec**:
  - `imagePullSecrets`:
    - `name`: `ghcr-secret`

---

### 3. Image Pull Secret Schema (`ghcr-secret`)

- **Resource Kind**: `Secret` (`v1`)
- **Type**: `kubernetes.io/dockerconfigjson`
- **Metadata**:
  - `name`: `ghcr-secret`
  - `namespace`: `app-web-book-dev` | `app-web-book-prod`
- **Data**: Base64 encoded Docker config JSON with server `ghcr.io`.
