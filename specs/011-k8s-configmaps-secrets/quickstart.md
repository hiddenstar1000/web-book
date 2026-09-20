# Phase 1 Quickstart & Validation Guide: ConfigMaps & Secrets Verification

## Overview

Runnable verification guide to test ConfigMap and Secret manifests, verify deployment environment references, and confirm Secret exclusion from Kustomize.

---

## Validation Steps

### Step 1: Validate Standalone Secret Application Syntax

Test client dry-run for backend Secret manifests:

```bash
kubectl apply --dry-run=client -f k8s/backend-secret-example.yaml && \
kubectl apply --dry-run=client -f k8s/backend-secret.yaml
```

### Step 2: Validate Kustomize Bundle Render

Render aggregated Kustomize resources and verify `backend-configmap.yaml` is included while Secret manifests are excluded:

```bash
kubectl kustomize k8s/ | grep "web-book-backend-config" && \
! kubectl kustomize k8s/ | grep "kind: Secret" && \
echo "ConfigMap included and Secret excluded from Kustomize bundle verified"
```

### Step 3: Validate Deployment Dry-Run

Validate updated `backend-deployment.yaml` schema:

```bash
kubectl apply --dry-run=client -k k8s/
```

---

## References

- [Config & Secret Contracts](contracts/config-secret-contracts.md)
- [Data Model & Entities](data-model.md)
- [Phase 0 Research](research.md)
