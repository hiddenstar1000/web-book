# Implementation Plan: Kubernetes ConfigMaps & Secrets Integration

**Branch**: `011-k8s-configmaps-secrets` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [`specs/011-k8s-configmaps-secrets/spec.md`](spec.md)

## Summary

Decouple backend environment variables into Kubernetes ConfigMap (`k8s/backend-configmap.yaml` for `PORT=3001`) and Secret (`k8s/backend-secret.yaml` / `k8s/backend-secret-example.yaml` for `MONGODB_URI`). Update `k8s/backend-deployment.yaml` to reference these objects using `configMapKeyRef` and `secretKeyRef`. Exclude secrets from `k8s/kustomization.yaml` per security mandate, and update `README.md` files with manual apply instructions.

## Technical Context

**Language/Version**: YAML (Kubernetes API v1, apps/v1, kustomize/v1beta1)
**Primary Dependencies**: `kubectl`, `kustomize`
**Storage**: Kubernetes etcd / Secret store
**Testing**: `kubectl apply --dry-run=client`, `kubectl kustomize k8s/`
**Target Platform**: Kubernetes 1.25+ cluster (MicroK8s, Minikube, GKE, EKS)
**Project Type**: Infrastructure, Configuration & Documentation
**Performance Goals**: Instant secret resolution at pod scheduling, zero plain-text passwords in Kustomize bundles
**Constraints**: Do NOT include `backend-secret.yaml` or `backend-secret-example.yaml` in `k8s/kustomization.yaml`. Add `backend-configmap.yaml` to `k8s/kustomization.yaml`.
**Scale/Scope**: 7 files (`k8s/backend-configmap.yaml`, `k8s/backend-secret.yaml`, `k8s/backend-secret-example.yaml`, `k8s/backend-deployment.yaml`, `k8s/kustomization.yaml`, `README.md`, `backend/README.md`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Compliance Status | Rationale |
| :--- | :--- | :--- |
| **I. Test Coverage Mandatory (>90%)** | **PASS** | Adding ConfigMaps/Secrets and updating documentation does not alter application source code logic or reduce unit test coverage (>90%). |
| **II. API & UI Separation of Concerns** | **PASS** | Keeps backend configuration and secrets strictly scoped to the API backend service. |
| **III. Test-Driven & Continuous Verification** | **PASS** | Standalone secret application and Kustomize dry-runs continuously verify resource schemas. |

## Project Structure

### Documentation (this feature)

```text
specs/011-k8s-configmaps-secrets/
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research & decision log
├── data-model.md        # Phase 1 entities & resource specs
├── quickstart.md        # Phase 1 verification & validation guide
└── contracts/
    └── config-secret-contracts.md # Phase 1 contracts
```

### Source Code (repository root)

```text
k8s/
├── backend-configmap.yaml     # [NEW] ConfigMap for PORT=3001 (included in kustomization.yaml)
├── backend-secret.yaml        # [NEW] Local Secret file with real MONGODB_URI (EXCLUDED from kustomization.yaml)
├── backend-secret-example.yaml# [NEW] Example Secret template for MONGODB_URI (EXCLUDED from kustomization.yaml)
├── backend-deployment.yaml   # [MODIFY] Update env to use configMapKeyRef & secretKeyRef
└── kustomization.yaml        # [MODIFY] Add backend-configmap.yaml; EXCLUDE secret files

README.md                      # [MODIFY] Update Kubernetes deployment section with Secret instructions
backend/
└── README.md                  # [MODIFY] Update backend Kubernetes deployment guide
```

**Structure Decision**: Option 2 (Web application with `backend/` and `frontend/`). Configuration manifests reside in `k8s/` and documentation is updated in root and backend README files.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | N/A | No constitution principles violated. |
