# Quickstart & Runnable Validation Guide: Dev Domain Update

**Feature**: `specs/014-update-dev-domain-name`

---

## Runnable Validation Steps

### Step 1: Validate Dev Ingress Domain & TLS Secret Render

Verify `kubectl kustomize k8s/dev/` renders host `spanish-stories.dixonai.net` and secret `spanish-stories-tls`:

```bash
kubectl kustomize k8s/dev/ | grep "spanish-stories.dixonai.net" && \
kubectl kustomize k8s/dev/ | grep "spanish-stories-tls" && \
echo "Dev Ingress domain & TLS secret rendering verified"
```

### Step 2: Validate Client Dry-Run Apply

Validate dry-run schema execution for dev environment bundle:

```bash
kubectl apply --dry-run=client -k k8s/dev/
```
