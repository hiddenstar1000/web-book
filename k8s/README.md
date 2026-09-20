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
│   ├── backend-secret-example.yaml   # Template secret (MONGODB_URI)
│   ├── ingress.yaml                  # Ingress routing spanish-stories.dixonai.net (TLS: spanish-stories-tls)
│   └── kustomization.yaml            # Sets namespace: app-web-book-dev
└── prod/
    ├── namespace.yaml                # Namespace app-web-book-prod definition
    ├── backend-deployment.yaml       # NestJS API deployment (2 replicas)
    ├── frontend-deployment.yaml      # Next.js UI deployment (2 replicas)
    ├── backend-service.yaml          # ClusterIP service on port 3001
    ├── frontend-service.yaml         # LoadBalancer service on port 3000
    ├── backend-configmap.yaml        # ConfigMap (PORT=3001)
    ├── backend-secret-example.yaml   # Template secret (MONGODB_URI)
    ├── ingress.yaml                  # Ingress routing tripitaka.dixonai.net (TLS: tripitaka-tls)
    └── kustomization.yaml            # Sets namespace: app-web-book-prod
```

---

## Environment Deployment Procedures

### Development Environment (`app-web-book-dev`)

1. **Provision Development Secret**:
   ```bash
   cp k8s/dev/backend-secret-example.yaml k8s/dev/backend-secret.yaml
   # Update MONGODB_URI in k8s/dev/backend-secret.yaml with dev database connection string
   kubectl apply -f k8s/dev/backend-secret.yaml -n app-web-book-dev
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

1. **Provision Production Secret**:
   ```bash
   cp k8s/prod/backend-secret-example.yaml k8s/prod/backend-secret.yaml
   # Update MONGODB_URI in k8s/prod/backend-secret.yaml with prod database connection string
   kubectl apply -f k8s/prod/backend-secret.yaml -n app-web-book-prod
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

- Secret files (`backend-secret.yaml`) are explicitly excluded from version control via `.gitignore`.
- Always use `backend-secret-example.yaml` as a reference template.
- Kustomize configuration (`kustomization.yaml`) in both `dev/` and `prod/` excludes Secret manifests to prevent accidental exposure.
