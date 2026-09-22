# Quickstart & Runnable Validation Guide: Consolidated Declarative Secret Setup

**Feature**: `specs/016-setup-ghcr-secret-manifest`

---

## Runnable Validation Commands

### Step 1: Validate Dev & Prod Consolidated Secret Example Templates

Verify that `k8s/dev/secret-example.yaml` and `k8s/prod/secret-example.yaml` exist and pass schema dry-run:

```bash
kubectl apply --dry-run=client -f k8s/dev/secret-example.yaml && \
kubectl apply --dry-run=client -f k8s/prod/secret-example.yaml && \
echo "Dev and Prod Consolidated Secret templates valid"
```

### Step 2: Validate Gitignore Secret Exclusion Rules

Verify git status ignores `secret.yaml` files while tracking `secret-example.yaml`:

```bash
touch k8s/dev/secret.yaml k8s/prod/secret.yaml && \
git status --porcelain | grep -v "secret-example.yaml" | grep "secret.yaml" || echo "secret.yaml correctly ignored by git" && \
rm -f k8s/dev/secret.yaml k8s/prod/secret.yaml
```

### Step 3: Validate Complete Manifest Dry-Run Apply

Validate overall k8s dev and prod stack apply:

```bash
kubectl apply --dry-run=client -k k8s/dev/ && \
kubectl apply --dry-run=client -k k8s/prod/
```
