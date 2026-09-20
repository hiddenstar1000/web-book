# Implementation Plan: Ingress Load Balancing & TLS Configuration for Dev and Prod Domains

**Branch**: `013-k8s-ingress-tls-domains` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/013-k8s-ingress-tls-domains/spec.md`

## Summary

Configure domain host rules and TLS termination on Kubernetes Ingress resources for dev (`spanish-story.dixonai.net` in namespace `app-web-book-dev`) and prod (`tripitaka.dixonai.net` in namespace `app-web-book-prod`). Ensure uniform Load Balancer Service rules across both environment folders, and update operator documentation in `README.md` and `k8s/README.md`.

## Technical Context

**Language/Version**: YAML (Kubernetes 1.28+, NGINX Ingress Controller, cert-manager / Let's Encrypt)  
**Primary Dependencies**: Kubernetes Ingress (`networking.k8s.io/v1`), Kustomize (`kustomize.config.k8s.io/v1beta1`)  
**Storage**: Kubernetes TLS secrets (`spanish-story-tls` and `tripitaka-tls`)  
**Testing**: `kubectl apply --dry-run=client`, `kubectl kustomize` host & TLS string assertions  
**Target Platform**: Kubernetes cluster with NGINX Ingress controller  
**Project Type**: Infrastructure / Ingress TLS Configuration  
**Performance Goals**: Fast HTTPS handshake (<50ms), automatic SSL redirect  
**Constraints**: Uniform Load Balancer port definitions across dev and prod environments  
**Scale/Scope**: 2 Ingress manifests (`k8s/dev/ingress.yaml` and `k8s/prod/ingress.yaml`), 2 domains (`spanish-story.dixonai.net` and `tripitaka.dixonai.net`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Test Coverage Mandatory (>90%)**: PASS — Infrastructure manifests validated through automated client dry-run and Kustomize string assertions.
- **II. API & UI Separation of Concerns**: PASS — `/api` and `/` ingress path routing decoupled to backend and frontend services respectively.
- **III. Test-Driven & Continuous Verification**: PASS — Dry-run validation integrated into quickstart and workflow scripts.

## Project Structure

### Documentation (this feature)

```text
specs/013-k8s-ingress-tls-domains/
├── plan.md              # This file
├── research.md          # Technical choices and NGINX TLS decisions
├── data-model.md        # Ingress and Service entity schemas
├── quickstart.md        # Runnable validation guide
├── contracts/           # Ingress TLS contract definitions
│   └── ingress-tls-contracts.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Created by /speckit-tasks
```

### Source Code Layout

```text
k8s/
├── dev/
│   ├── ingress.yaml                  # Host: spanish-story.dixonai.net, TLS: spanish-story-tls
│   ├── frontend-service.yaml         # LoadBalancer service on port 3000
│   ├── backend-service.yaml          # ClusterIP service on port 3001
│   └── kustomization.yaml            # namespace: app-web-book-dev
└── prod/
    ├── ingress.yaml                  # Host: tripitaka.dixonai.net, TLS: tripitaka-tls
    ├── frontend-service.yaml         # LoadBalancer service on port 3000
    ├── backend-service.yaml          # ClusterIP service on port 3001
    └── kustomization.yaml            # namespace: app-web-book-prod
```

**Structure Decision**: Update `k8s/dev/ingress.yaml` and `k8s/prod/ingress.yaml` to declare domain host rules and cert-manager / TLS secret definitions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | Standard Ingress TLS host rules | Shared single domain without SSL would expose staging and production to security risks |
