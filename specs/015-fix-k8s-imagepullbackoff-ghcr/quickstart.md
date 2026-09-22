# Quickstart & Runnable Validation Guide: GHCR Image & Pull Secret Resolution

**Feature**: `specs/015-fix-k8s-imagepullbackoff-ghcr`

---

## Runnable Validation Commands

### Step 1: Validate Dev Deployment Image URIs & Pull Secrets

Verify `kubectl kustomize k8s/dev/` renders GHCR images, `imagePullPolicy: Always`, and `imagePullSecrets: ghcr-secret`:

```bash
kubectl kustomize k8s/dev/ | grep "ghcr.io/hiddenstar1000/web-book-backend:dev" && \
kubectl kustomize k8s/dev/ | grep "ghcr.io/hiddenstar1000/web-book-frontend:dev" && \
kubectl kustomize k8s/dev/ | grep "imagePullPolicy: Always" && \
kubectl kustomize k8s/dev/ | grep "ghcr-secret" && \
echo "Dev GHCR deployment specs verified"
```

### Step 2: Validate Prod Deployment Image URIs & Pull Secrets

Verify `kubectl kustomize k8s/prod/` renders GHCR images, `imagePullPolicy: Always`, and `imagePullSecrets: ghcr-secret`:

```bash
kubectl kustomize k8s/prod/ | grep "ghcr.io/hiddenstar1000/web-book-backend:latest" && \
kubectl kustomize k8s/prod/ | grep "ghcr.io/hiddenstar1000/web-book-frontend:latest" && \
kubectl kustomize k8s/prod/ | grep "imagePullPolicy: Always" && \
kubectl kustomize k8s/prod/ | grep "ghcr-secret" && \
echo "Prod GHCR deployment specs verified"
```

### Step 3: Validate Client Dry-Run Apply

Validate dry-run schema execution for dev and prod environment bundles:

```bash
kubectl apply --dry-run=client -k k8s/dev/ && \
kubectl apply --dry-run=client -k k8s/prod/
```
