# Kubernetes Manifests & Multi-Environment Directory Structure

This directory contains declarative Kubernetes manifests for deploying the `web-book` application stack (NestJS API backend and Next.js UI frontend) across isolated development (`app-web-book-dev`) and production (`app-web-book-prod`) namespaces.

---

## Directory Structure

```text
k8s/
├── dev/
│   ├── namespace.yaml                # Namespace app-web-book-dev definition
│   ├── backend-deployment.yaml       # NestJS API deployment (2 replicas)
│   ├── frontend-deployment.yaml      # Next.js UI deployment (2 replicas)
│   ├── backend-service.yaml          # ClusterIP service on port 3001
│   ├── frontend-service.yaml         # LoadBalancer service on port 3000
│   ├── backend-configmap.yaml        # ConfigMap (PORT=3001)
│   ├── secret-example.yaml           # Consolidated template secret (MONGODB_URI & GHCR dockerconfigjson)
│   ├── ingress.yaml                  # Ingress routing spanish-stories.dixonai.net (TLS: spanish-stories-tls)
│   └── kustomization.yaml            # Sets namespace: app-web-book-dev
└── prod/
    ├── namespace.yaml                # Namespace app-web-book-prod definition
    ├── backend-deployment.yaml       # NestJS API deployment (2 replicas)
    ├── frontend-deployment.yaml      # Next.js UI deployment (2 replicas)
    ├── backend-service.yaml          # ClusterIP service on port 3001
    ├── frontend-service.yaml         # LoadBalancer service on port 3000
    ├── backend-configmap.yaml        # ConfigMap (PORT=3001)
    ├── secret-example.yaml           # Consolidated template secret (MONGODB_URI & GHCR dockerconfigjson)
    ├── ingress.yaml                  # Ingress routing tripitaka.dixonai.net (TLS: tripitaka-tls)
    └── kustomization.yaml            # Sets namespace: app-web-book-prod
```

---

## Environment Deployment Procedures

### Development Environment (`app-web-book-dev`)

1. **Provision Environment Secrets (Backend Secret & GHCR Secret)**:
   ```bash
   cp k8s/dev/secret-example.yaml k8s/dev/secret.yaml
   # Update MONGODB_URI and GitHub credentials in k8s/dev/secret.yaml
   kubectl apply -f k8s/dev/secret.yaml -n app-web-book-dev
   ```

2. **Deploy Complete Dev Stack**:
   ```bash
   kubectl apply -k k8s/dev/
   ```

3. **Verify Dev Resources**:
   ```bash
   kubectl get all,ingress,configmap,secret -n app-web-book-dev
   ```

---

### Production Environment (`app-web-book-prod`)

1. **Provision Environment Secrets (Backend Secret & GHCR Secret)**:
   ```bash
   cp k8s/prod/secret-example.yaml k8s/prod/secret.yaml
   # Update MONGODB_URI and GitHub credentials in k8s/prod/secret.yaml
   kubectl apply -f k8s/prod/secret.yaml -n app-web-book-prod
   ```

2. **Deploy Complete Prod Stack**:
   ```bash
   kubectl apply -k k8s/prod/
   ```

3. **Verify Prod Resources**:
   ```bash
   kubectl get all,ingress,configmap,secret -n app-web-book-prod
   ```

---

## Security Policy

- Secret files (`secret.yaml`) are explicitly excluded from version control via `.gitignore`.
- Always use `secret-example.yaml` as a reference template.
- Kustomize configuration (`kustomization.yaml`) in both `dev/` and `prod/` excludes Secret manifests to prevent accidental exposure.

---

## Troubleshooting `ImagePullBackOff`

If pods enter `ImagePullBackOff` or `ErrImagePull` state:

1. **Verify `ghcr-secret` existence in target namespace**:
   ```bash
   kubectl get secret ghcr-secret -n app-web-book-dev   # for Dev
   kubectl get secret ghcr-secret -n app-web-book-prod  # for Prod
   ```

2. **Inspect Pod Events**:
   ```bash
   kubectl describe pod -l app=web-book-backend -n app-web-book-dev
   ```
   Look for `Failed to pull image "ghcr.io/hiddenstar1000/web-book-backend:dev": rpc error: code = Unknown desc = failed to pull and unpack image...: unauthorized`.

3. **Verify GitHub Personal Access Token (PAT) Permissions**:
   The PAT used to create `ghcr-secret` must have `read:packages` (or `write:packages` if building & pushing) permissions enabled.

4. **Re-create Secret if Credentials Expire**:
   ```bash
   kubectl delete secret ghcr-secret -n app-web-book-dev
   kubectl create secret docker-registry ghcr-secret \
     --docker-server=ghcr.io \
     --docker-username=<GITHUB_USER> \
     --docker-password=<NEW_PAT> \
     --docker-email=<GITHUB_EMAIL> \
     -n app-web-book-dev
   kubectl rollout restart deployment/web-book-backend -n app-web-book-dev
   ```

