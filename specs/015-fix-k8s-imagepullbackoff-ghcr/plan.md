# Implementation Plan: Resolve Kubernetes ImagePullBackOff with GHCR Image URIs & Pull Secrets

**Branch**: `015-fix-k8s-imagepullbackoff-ghcr` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/015-fix-k8s-imagepullbackoff-ghcr/spec.md`

## Summary

Update all Deployment manifests (`k8s/dev/` and `k8s/prod/`) to specify fully-qualified GHCR image URIs (`ghcr.io/hiddenstar1000/web-book-backend` and `ghcr.io/hiddenstar1000/web-book-frontend`), configure `imagePullPolicy: Always`, and add `imagePullSecrets: [{ name: ghcr-secret }]`. Align project documentation in `README.md` and `k8s/README.md` to detail `ghcr-secret` creation commands.

## Technical Context

**Language/Version**: YAML (Kubernetes 1.28+, GHCR / Docker Registry API)  
**Primary Dependencies**: Kubernetes Deployments (`apps/v1`), Kustomize (`kustomize.config.k8s.io/v1beta1`)  
**Storage**: Docker Registry Secret (`ghcr-secret`)  
**Testing**: `kubectl apply --dry-run=client`, `kubectl kustomize` image & pullSecret assertions  
**Target Platform**: Kubernetes cluster pulling images from GitHub Container Registry  
**Project Type**: Infrastructure / Image Pull & Secret Fix  
**Performance Goals**: Instant image pull authentication, zero ImagePullBackOff failures  
**Constraints**: Keep dev (`:dev`) and prod (`:latest`) image tags distinct  
**Scale/Scope**: 4 Deployment manifests (`k8s/dev/backend-deployment.yaml`, `k8s/dev/frontend-deployment.yaml`, `k8s/prod/backend-deployment.yaml`, `k8s/prod/frontend-deployment.yaml`), documentation updates in `README.md` and `k8s/README.md`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Test Coverage Mandatory (>90%)**: PASS — Infrastructure manifests validated through automated client dry-run and Kustomize string assertions.
- **II. API & UI Separation of Concerns**: PASS — Backend and frontend container specs remain decoupled across distinct deployment manifests.
- **III. Test-Driven & Continuous Verification**: PASS — Dry-run validation integrated into quickstart scripts.

## Project Structure

### Documentation (this feature)

```text
specs/015-fix-k8s-imagepullbackoff-ghcr/
├── plan.md              # This file
├── research.md          # Technical decisions for GHCR image URIs & pull secrets
├── data-model.md        # Deployment & Secret entity schemas
├── quickstart.md        # Runnable validation guide
├── contracts/           # GHCR deployment contract definitions
│   └── ghcr-deployment-contracts.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Created by /speckit-tasks
```

### Source Code Layout

```text
k8s/
├── dev/
│   ├── backend-deployment.yaml       # image: ghcr.io/hiddenstar1000/web-book-backend:dev, imagePullSecrets: ghcr-secret
│   └── frontend-deployment.yaml      # image: ghcr.io/hiddenstar1000/web-book-frontend:dev, imagePullSecrets: ghcr-secret
└── prod/
    ├── backend-deployment.yaml       # image: ghcr.io/hiddenstar1000/web-book-backend:latest, imagePullSecrets: ghcr-secret
    └── frontend-deployment.yaml      # image: ghcr.io/hiddenstar1000/web-book-frontend:latest, imagePullSecrets: ghcr-secret
```

**Structure Decision**: Update `k8s/dev/` and `k8s/prod/` Deployment files with GHCR container image URIs, `imagePullPolicy: Always`, and `imagePullSecrets: [{ name: ghcr-secret }]`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | Standard GHCR image pull spec | Unqualified local image names fail to pull in remote Kubernetes clusters |
