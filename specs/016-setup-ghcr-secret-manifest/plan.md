# Implementation Plan: Set Up Declarative GHCR Secret Manifests & Example Templates

**Branch**: `016-setup-ghcr-secret-manifest` | **Date**: 2026-09-22 | **Spec**: [specs/016-setup-ghcr-secret-manifest/spec.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/specs/016-setup-ghcr-secret-manifest/spec.md)

**Input**: Feature specification from `/specs/016-setup-ghcr-secret-manifest/spec.md`

## Summary

Set up declarative Kubernetes Secret example templates (`ghcr-secret-example.yaml`) in `k8s/dev/` and `k8s/prod/` matching the pattern of `backend-secret-example.yaml`, configure `.gitignore` to prevent committing actual `ghcr-secret.yaml` files, and update `README.md` / `k8s/README.md` documentation.

## Technical Context

**Language/Version**: YAML (Kubernetes 1.28+ manifest format)

**Primary Dependencies**: Kubernetes API (`apiVersion: v1`, `kind: Secret`, `type: kubernetes.io/dockerconfigjson`)

**Storage**: Local secret files (`k8s/dev/ghcr-secret.yaml` and `k8s/prod/ghcr-secret.yaml` excluded from git)

**Testing**: `kubectl apply --dry-run=client` schema verification, `git status` ignore checks

**Target Platform**: Kubernetes / MicroK8s cluster deployments (`app-web-book-dev` and `app-web-book-prod` namespaces)

**Project Type**: Infrastructure & Configuration / Kubernetes Manifests

**Performance Goals**: N/A (configuration static files)

**Constraints**: `ghcr-secret.yaml` containing real tokens MUST NOT be tracked in version control. `ghcr-secret-example.yaml` templates MUST be tracked in git.

**Scale/Scope**: 2 environments (`k8s/dev/` and `k8s/prod/`), 2 documentation files (`README.md` and `k8s/README.md`), 1 `.gitignore` file.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: Test Coverage Mandatory (>90%)**: PASS. Infrastructure manifest updates do not alter backend API or frontend UI code. Existing backend/frontend test coverage (>90%) remains untouched and satisfied.
- **Principle II: API & UI Separation of Concerns**: PASS. Secret manifests decouple cluster credential provisioning from API/UI runtime code.
- **Principle III: Test-Driven & Continuous Verification**: PASS. Runnable validation checks (`kubectl apply --dry-run=client`) verify manifest validity.

## Project Structure

### Documentation (this feature)

```text
specs/016-setup-ghcr-secret-manifest/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Technical research decisions
├── data-model.md        # Secret schema & entity specifications
├── quickstart.md        # Runnable validation guide
└── contracts/           # Declarative manifest contracts
    └── ghcr-secret-contracts.md
```

### Source Code (repository root)

```text
.gitignore
README.md
k8s/
├── README.md
├── dev/
│   ├── ghcr-secret-example.yaml [NEW]
│   └── ...
└── prod/
    ├── ghcr-secret-example.yaml [NEW]
    └── ...
```

**Structure Decision**: Infrastructure declarative configuration matching established `backend-secret-example.yaml` multi-environment directory layout under `k8s/dev/` and `k8s/prod/`.

## Complexity Tracking

*No constitution violations. Section left empty.*
