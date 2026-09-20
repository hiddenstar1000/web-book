# Interface Contract: GitHub Actions Release & Deployment Workflow

## Contract Specification

**Target File**: `.github/workflows/publish-ghcr.yaml`

---

## Workflow Triggers & Execution Constraints

```yaml
name: Release

on:
  push:
    branches: ["main", "dev"]
  workflow_dispatch:

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    environment: ${{ github.ref_name == 'dev' && 'DEV' || 'PROD' }}
    permissions:
      contents: read
      packages: write
    env:
      IMAGE_TAG: ${{ github.ref_name == 'dev' && 'dev' || 'latest' }}
```

---

## Build Steps Contract

1. **Checkout Repository**: `actions/checkout@v4`
2. **GHCR Login**: `docker/login-action@v3` with registry `ghcr.io`
3. **Backend Image Build & Push**: `docker/build-push-action@v6`
   - Context: `./backend`
   - Push: `true`
   - Tags: `ghcr.io/${{ secrets.GH_USER }}/web-book-backend:${{ env.IMAGE_TAG }}`
4. **Frontend Image Build & Push**: `docker/build-push-action@v6`
   - Context: `./frontend`
   - Push: `true`
   - Tags: `ghcr.io/${{ secrets.GH_USER }}/web-book-frontend:${{ env.IMAGE_TAG }}`

---

## Deployment Steps Contract

- **SSH Action**: `appleboy/ssh-action@v1.0.3`
- **Authentication**: `secrets.SSH_KEY`, `vars.SSH_USER`, `vars.SSH_HOST`, `vars.SSH_PORT`
- **Execution Script**:
  - Main Branch (`PROD`):
    - `microk8s kubectl rollout restart deployment/web-book-backend -n app-em-prod`
    - `microk8s kubectl rollout restart deployment/web-book-frontend -n app-em-prod`
  - Dev Branch (`DEV`):
    - `microk8s kubectl rollout restart deployment/web-book-backend -n app-em-dev`
    - `microk8s kubectl rollout restart deployment/web-book-frontend -n app-em-dev`
