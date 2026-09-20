# Phase 0 Research: Kubernetes ConfigMaps & Secrets Integration

## Executive Summary

Technical research and architectural decisions for decoupling backend environment variables into Kubernetes `ConfigMap` and `Secret` objects, updating `backend-deployment.yaml`, excluding secrets from `k8s/kustomization.yaml`, and updating documentation across `README.md` files.

---

## Technical Decisions & Rationale

### 1. Separation of Non-Sensitive Config and Sensitive Credentials

- **Decision**:
  - Non-sensitive variables (`PORT=3001`) -> ConfigMap `web-book-backend-config` (`k8s/backend-configmap.yaml`).
  - Sensitive database connection strings (`MONGODB_URI`) -> Secret `web-book-backend-secret` (`k8s/backend-secret.yaml`, with git-tracked template `k8s/backend-secret-example.yaml`).
- **Rationale**: Isolating non-sensitive settings in ConfigMaps allows easy configuration edits, while storing database URIs in Secrets ensures sensitive credentials are encrypted and protected at rest in Kubernetes.

### 2. Exclusion of Secrets from `k8s/kustomization.yaml`

- **Decision**: Do NOT list `backend-secret.yaml` or `backend-secret-example.yaml` under `resources:` in `k8s/kustomization.yaml`. Add `backend-configmap.yaml` to `k8s/kustomization.yaml`.
- **Rationale**: Security policy mandates that secret files containing real connection strings must not be automatically bundled into git-tracked Kustomize apply lists. Operators apply secrets out-of-band via `kubectl apply -f k8s/backend-secret.yaml` or SealedSecrets/ExternalSecrets.

### 3. Environment Variable References in Deployment

- **Decision**: Update `k8s/backend-deployment.yaml` to replace inline `value:` declarations with `configMapKeyRef` and `secretKeyRef`:
  ```yaml
  env:
    - name: PORT
      valueFrom:
        configMapKeyRef:
          name: web-book-backend-config
          key: PORT
    - name: MONGODB_URI
      valueFrom:
        secretKeyRef:
          name: web-book-backend-secret
          key: MONGODB_URI
  ```
- **Rationale**: Ensures backend pods pull runtime configuration directly from Kubernetes API objects at pod initialization.

### 4. Documentation Strategy

- **Decision**: Update root `README.md` and `backend/README.md` with explicit instructions to apply `backend-secret.yaml` prior to running `kubectl apply -k k8s/`.
- **Rationale**: Provides step-by-step guidance for developers and deployment pipelines without leaking sensitive passwords.
