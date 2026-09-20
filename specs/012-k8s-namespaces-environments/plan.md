# Implementation Plan: Multi-Environment Kubernetes Namespaces & Deployment Workflow

**Branch**: `012-k8s-namespaces-environments` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/012-k8s-namespaces-environments/spec.md`

## Summary

Restructure Kubernetes deployment manifests into separate environment folders (`k8s/dev/` and `k8s/prod/`), configuring dev workloads to target namespace `app-web-book-dev` and prod workloads to target namespace `app-web-book-prod`. Include dedicated `namespace.yaml` resources and `kustomization.yaml` configurations in both environments. Update `.github/workflows/publish-ghcr.yaml` to support GHCR container builds and multi-environment manifest validation and deployment steps.

## Technical Context

**Language/Version**: YAML (Kubernetes 1.28+, Kustomize v5+), GitHub Actions Workflow schema  
**Primary Dependencies**: Kubernetes API (`v1`, `apps/v1`, `networking.k8s.io/v1`), Kustomize (`kustomize.config.k8s.io/v1beta1`)  
**Storage**: N/A (Secret and ConfigMap references)  
**Testing**: `kubectl apply --dry-run=client`, `kubectl kustomize`, GitHub Actions workflow syntax validation  
**Target Platform**: Kubernetes cluster (Dev namespace: `app-web-book-dev`, Prod namespace: `app-web-book-prod`)  
**Project Type**: Multi-Environment Infrastructure & CI/CD Pipeline  
**Performance Goals**: Fast manifest rendering (<1s), zero downtime rolling updates per namespace  
**Constraints**: Secret manifests MUST be excluded from version control while example secret templates remain supplied  
**Scale/Scope**: 2 environment folders (`k8s/dev` and `k8s/prod`), 2 namespaces (`app-web-book-dev` and `app-web-book-prod`), 2 replicas each for backend API and frontend UI per environment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Test Coverage Mandatory (>90%)**: PASS — Infrastructure manifests and CI/CD validation steps maintain overall test readiness and deployment stability.
- **II. API & UI Separation of Concerns**: PASS — API (`web-book-backend`) and UI (`web-book-frontend`) remain completely decoupled across distinct pods, services, and routing rules in both dev and prod namespaces.
- **III. Test-Driven & Continuous Verification**: PASS — Automated `kubectl apply --dry-run=client` and `kubectl kustomize` checks integrated into CI workflow.

## Project Structure

### Documentation (this feature)

```text
specs/012-k8s-namespaces-environments/
├── plan.md              # This file
├── research.md          # Technical decisions & directory layout rationale
├── data-model.md        # Kubernetes entities and infrastructure schemas
├── quickstart.md        # Runnable validation guide
├── contracts/           # Kustomization and Namespace contracts
│   └── k8s-multi-env-contracts.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Created by /speckit-tasks
```

### Source Code Layout

```text
.github/
└── workflows/
    └── publish-ghcr.yaml

k8s/
├── dev/
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-service.yaml
│   ├── backend-configmap.yaml
│   ├── backend-secret-example.yaml
│   ├── ingress.yaml
│   └── kustomization.yaml
└── prod/
    ├── namespace.yaml
    ├── backend-deployment.yaml
    ├── frontend-deployment.yaml
    ├── backend-service.yaml
    ├── frontend-service.yaml
    ├── backend-configmap.yaml
    ├── backend-secret-example.yaml
    ├── ingress.yaml
    └── kustomization.yaml
```

**Structure Decision**: Reorganize `k8s/` into explicit `dev/` and `prod/` environment folders. Each environment maintains its own isolated namespace declaration and Kustomize settings.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | Standard Kustomize multi-environment setup | Single folder would combine dev/prod environments improperly |
