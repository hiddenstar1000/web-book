# Quickstart & Runnable Validation Guide: Multi-Environment Deployments

**Feature**: `specs/012-k8s-namespaces-environments`

---

## Runnable Validation Commands

### Step 1: Validate Standalone Namespace Manifest Syntax

Validate `namespace.yaml` dry-runs for dev and prod environments:

```bash
kubectl apply --dry-run=client -f k8s/dev/namespace.yaml && \
kubectl apply --dry-run=client -f k8s/prod/namespace.yaml
```

### Step 2: Validate Kustomize Dev Bundle Render

Verify Kustomize renders dev bundle into namespace `app-web-book-dev`:

```bash
kubectl kustomize k8s/dev/ | grep "namespace: app-web-book-dev" && \
! kubectl kustomize k8s/dev/ | grep "kind: Secret" && \
echo "Dev bundle rendering verified targeting app-web-book-dev"
```

### Step 3: Validate Kustomize Prod Bundle Render

Verify Kustomize renders prod bundle into namespace `app-web-book-prod`:

```bash
kubectl kustomize k8s/prod/ | grep "namespace: app-web-book-prod" && \
! kubectl kustomize k8s/prod/ | grep "kind: Secret" && \
echo "Prod bundle rendering verified targeting app-web-book-prod"
```

### Step 4: Validate Dry-Run Apply for Dev and Prod Bundles

Validate Kubernetes dry-run apply for both environment bundles:

```bash
kubectl apply --dry-run=client -k k8s/dev/ && \
kubectl apply --dry-run=client -k k8s/prod/
```

### Step 5: Validate GitHub Actions Workflow YAML Syntax

Validate `.github/workflows/publish-ghcr.yaml` workflow file syntax:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/publish-ghcr.yaml'))" && \
echo "Workflow YAML syntax valid"
```
