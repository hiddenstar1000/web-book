# Implementation Plan: Kubernetes Deployment Manifests & Kustomization Setup

**Branch**: `010-k8s-deployment-manifests` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [`specs/010-k8s-deployment-manifests/spec.md`](spec.md)

## Summary

Create production Kubernetes manifests in `k8s/` to deploy the NestJS API backend (`web-book-backend`) and Next.js Web UI (`web-book-frontend`) on separated pods (2 replicas each). Includes internal ClusterIP backend service, external LoadBalancer frontend service, path-based Ingress routing (`/api` to backend, `/` to frontend), and a `k8s/kustomization.yaml` bundle aggregator.

## Technical Context

**Language/Version**: YAML (Kubernetes API v1, apps/v1, networking.k8s.io/v1, kustomize/v1beta1)
**Primary Dependencies**: `kubectl`, `kustomize`, NGINX Ingress Controller
**Storage**: MongoDB (via external cluster service or container)
**Testing**: `kubectl apply --dry-run=client -k k8s/`, `kubectl kustomize k8s/`
**Target Platform**: MicroK8s, Minikube, GKE, EKS, or standard Kubernetes 1.25+ cluster
**Project Type**: Infrastructure & Deployment Manifests
**Performance Goals**: High availability with 2 backend and 2 frontend pods, rapid path-based routing
**Constraints**: Decoupled pod deployment, exact `replicas: 2` configuration per deployment, valid Kustomization bundle
**Scale/Scope**: 6 files (`k8s/backend-deployment.yaml`, `k8s/frontend-deployment.yaml`, `k8s/backend-service.yaml`, `k8s/frontend-service.yaml`, `k8s/ingress.yaml`, `k8s/kustomization.yaml`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Compliance Status | Rationale |
| :--- | :--- | :--- |
| **I. Test Coverage Mandatory (>90%)** | **PASS** | Adding Kubernetes deployment manifests does not touch application source code or alter existing unit test coverage (>90%). |
| **II. API & UI Separation of Concerns** | **PASS** | Fully decouples API backend pods (2 replicas) and UI frontend pods (2 replicas) into separate deployments and services. |
| **III. Test-Driven & Continuous Verification** | **PASS** | Declarative manifests enable automated deployment and validation via `kubectl` and CI/CD pipelines. |

## Project Structure

### Documentation (this feature)

```text
specs/010-k8s-deployment-manifests/
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research & decision log
├── data-model.md        # Phase 1 entities & resource specs
├── quickstart.md        # Phase 1 verification & validation guide
└── contracts/
    └── k8s-manifest-contracts.md # Phase 1 contracts
```

### Source Code (repository root)

```text
k8s/
├── backend-deployment.yaml   # [NEW] API backend Deployment (replicas: 2, port 3001)
├── frontend-deployment.yaml  # [NEW] UI frontend Deployment (replicas: 2, port 3000)
├── backend-service.yaml      # [NEW] API backend Service (ClusterIP, port 3001)
├── frontend-service.yaml     # [NEW] UI frontend Service (LoadBalancer, port 3000)
├── ingress.yaml              # [NEW] Ingress routing (/api -> backend, / -> frontend)
└── kustomization.yaml        # [NEW] Kustomize bundle aggregator
```

**Structure Decision**: Option 2 (Web application with `backend/` and `frontend/`). All Kubernetes deployment manifests are isolated in the root `k8s/` directory.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | N/A | No constitution principles violated. |
