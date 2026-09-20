# Phase 1 Quickstart & Validation Guide: Kubernetes Manifest Verification

## Overview

Runnable verification guide to validate the Kubernetes manifests and Kustomize build.

---

## Validation Steps

### Step 1: Validate Kustomize Render

Render all aggregated manifests from `k8s/kustomization.yaml`:

```bash
kubectl kustomize k8s/
```

Expected outcome: Multi-resource YAML output containing backend deployment (2 replicas), frontend deployment (2 replicas), backend service, frontend LoadBalancer service, and ingress.

### Step 2: Validate Manifest Syntax via Client Dry-Run

Validate manifest schema and formatting against cluster client syntax:

```bash
kubectl apply --dry-run=client -k k8s/
```

Expected outcome: Returns `deployment.apps/web-book-backend created (dry run)`, `deployment.apps/web-book-frontend created (dry run)`, `service/web-book-backend-service created (dry run)`, `service/web-book-frontend-service created (dry run)`, `ingress.networking.k8s.io/web-book-ingress created (dry run)`.

---

## References

- [Manifest Contracts](contracts/k8s-manifest-contracts.md)
- [Data Model & Entities](data-model.md)
- [Phase 0 Research](research.md)
