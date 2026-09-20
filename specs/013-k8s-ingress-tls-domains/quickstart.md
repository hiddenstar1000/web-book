# Quickstart & Runnable Validation Guide: Ingress TLS & Domain Setup

**Feature**: `specs/013-k8s-ingress-tls-domains`

---

## Runnable Validation Steps

### Step 1: Validate Dev Ingress Domain & TLS Render

Verify Kustomize renders dev Ingress with host `spanish-story.dixonai.net` and secret `spanish-story-tls`:

```bash
kubectl kustomize k8s/dev/ | grep "spanish-story.dixonai.net" && \
kubectl kustomize k8s/dev/ | grep "spanish-story-tls" && \
echo "Dev Ingress domain & TLS configuration verified"
```

### Step 2: Validate Prod Ingress Domain & TLS Render

Verify Kustomize renders prod Ingress with host `tripitaka.dixonai.net` and secret `tripitaka-tls`:

```bash
kubectl kustomize k8s/prod/ | grep "tripitaka.dixonai.net" && \
kubectl kustomize k8s/prod/ | grep "tripitaka-tls" && \
echo "Prod Ingress domain & TLS configuration verified"
```

### Step 3: Validate Client Dry-Run Apply

Validate dry-run schema execution across both environment bundles:

```bash
kubectl apply --dry-run=client -k k8s/dev/ && \
kubectl apply --dry-run=client -k k8s/prod/
```
