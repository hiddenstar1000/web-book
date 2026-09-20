# Phase 0 Research: GHCR Publishing & Deployment Workflow Alignment

## Executive Summary

Research and architectural decisions for updating `.github/workflows/publish-ghcr.yaml` to align with the `web-book` repository architecture (NestJS backend in `./backend` and Next.js frontend in `./frontend`).

---

## Technical Decisions & Rationale

### 1. Build Contexts and Build Tools

- **Decision**: Remove JDK 25 and Maven build setup steps completely. Configure Docker build contexts using `./backend` for the NestJS REST API and `./frontend` for the Next.js App Router Web UI.
- **Rationale**: The project is a Node.js full-stack application (NestJS 10 + Next.js 14). The existing Java 25 / Maven setup references non-existent directories (`employee-management-api`) and causes CI pipeline failure.
- **Alternatives Considered**:
  - *Separate workflow files for backend and frontend*: Rejected because a unified release workflow ensures both backend and frontend images are built and published atomically with matching version tags (`dev` or `latest`).

### 2. GHCR Container Image Tagging & Naming

- **Decision**: Publish container images using the following naming conventions:
  - Backend: `ghcr.io/${{ secrets.GH_USER }}/web-book-backend:${{ env.IMAGE_TAG }}`
  - Frontend: `ghcr.io/${{ secrets.GH_USER }}/web-book-frontend:${{ env.IMAGE_TAG }}`
  - Tag Strategy: `IMAGE_TAG` resolves to `dev` for pushes on the `dev` branch and `latest` for pushes on the `main` branch.
- **Rationale**: Project-prefixed image names (`web-book-backend`, `web-book-frontend`) prevent registry namespace conflicts and clearly communicate artifact ownership.
- **Alternatives Considered**:
  - *Generic image names (`backend`, `frontend`)*: Rejected due to potential collisions in multi-project registries under the same user namespace.

### 3. Remote SSH Deployment & Kubernetes Namespace Workloads

- **Decision**: Update SSH deployment script executed on the remote host to issue MicroK8s rollout restart commands targeting the `web-book-backend` and `web-book-frontend` deployments:
  - PROD (`main` branch): Target namespace `app-em-prod` (or `web-book-prod`), restarting `deployment/web-book-backend` and `deployment/web-book-frontend`.
  - DEV (`dev` branch): Target namespace `app-em-dev` (or `web-book-dev`), restarting `deployment/web-book-backend` and `deployment/web-book-frontend`.
- **Rationale**: Connects automated release pipeline with live Kubernetes workloads so updated container images are immediately scheduled upon image push.
- **Alternatives Considered**:
  - *Direct kubectl apply of manifests*: Rejected to preserve existing SSH-based MicroK8s rollout pattern while fixing deployment target workload names.
