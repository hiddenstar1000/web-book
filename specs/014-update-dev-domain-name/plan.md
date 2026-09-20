# Implementation Plan: Update Development Domain Name to spanish-stories.dixonai.net

**Branch**: `014-update-dev-domain-name` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/014-update-dev-domain-name/spec.md`

## Summary

Update development environment Ingress manifest (`k8s/dev/ingress.yaml`) to use the pluralized domain name `spanish-stories.dixonai.net` and TLS secret `spanish-stories-tls`. Align project documentation in `README.md` and `k8s/README.md`.

## Technical Context

**Language/Version**: YAML (Kubernetes 1.28+, NGINX Ingress Controller, cert-manager / Let's Encrypt)  
**Primary Dependencies**: Kubernetes Ingress (`networking.k8s.io/v1`), Kustomize (`kustomize.config.k8s.io/v1beta1`)  
**Storage**: Kubernetes TLS secret (`spanish-stories-tls`)  
**Testing**: `kubectl apply --dry-run=client`, `kubectl kustomize` host & TLS string assertions  
**Target Platform**: Kubernetes cluster with NGINX Ingress controller  
**Project Type**: Infrastructure / Ingress Host Name Update  
**Performance Goals**: Fast HTTPS handshake (<50ms), automatic SSL redirect  
**Constraints**: Keep prod domain `tripitaka.dixonai.net` untouched  
**Scale/Scope**: 1 Ingress manifest (`k8s/dev/ingress.yaml`), documentation updates in `README.md` and `k8s/README.md`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Test Coverage Mandatory (>90%)**: PASS — Infrastructure manifests validated through automated client dry-run and Kustomize string assertions.
- **II. API & UI Separation of Concerns**: PASS — `/api` and `/` ingress path routing decoupled to backend and frontend services respectively.
- **III. Test-Driven & Continuous Verification**: PASS — Dry-run validation integrated into quickstart scripts.

## Project Structure

### Documentation (this feature)

```text
specs/014-update-dev-domain-name/
├── plan.md              # This file
├── research.md          # Technical decisions for dev domain update
├── data-model.md        # Dev Ingress entity schema
├── quickstart.md        # Runnable validation guide
├── contracts/           # Dev Ingress contract definitions
│   └── dev-ingress-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Created by /speckit-tasks
```

### Source Code Layout

```text
k8s/
└── dev/
    └── ingress.yaml                  # Host: spanish-stories.dixonai.net, TLS: spanish-stories-tls
```

**Structure Decision**: Update `k8s/dev/ingress.yaml` host rules and TLS secret definitions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | Standard Ingress host update | N/A |
