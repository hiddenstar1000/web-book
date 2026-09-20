# Interface Contracts: Multi-Environment Kubernetes & CI/CD Workflow

**Feature**: `specs/012-k8s-namespaces-environments`

---

## 1. Dev Environment Kustomization Contract (`k8s/dev/kustomization.yaml`)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: app-web-book-dev

resources:
  - namespace.yaml
  - backend-deployment.yaml
  - frontend-deployment.yaml
  - backend-service.yaml
  - frontend-service.yaml
  - backend-configmap.yaml
  - ingress.yaml
```

---

## 2. Prod Environment Kustomization Contract (`k8s/prod/kustomization.yaml`)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: app-web-book-prod

resources:
  - namespace.yaml
  - backend-deployment.yaml
  - frontend-deployment.yaml
  - backend-service.yaml
  - frontend-service.yaml
  - backend-configmap.yaml
  - ingress.yaml
```

---

## 3. Namespace Contract Specs (`namespace.yaml`)

### Dev Namespace (`k8s/dev/namespace.yaml`)
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app-web-book-dev
  labels:
    environment: dev
```

### Prod Namespace (`k8s/prod/namespace.yaml`)
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app-web-book-prod
  labels:
    environment: prod
```
