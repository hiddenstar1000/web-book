# Phase 1 Data Model: ConfigMap, Secret & Deployment Specifications

## Overview

Data model defining the key-value mappings for Kubernetes ConfigMaps, Secrets, deployment environment variable references, and Kustomization resource exclusions.

---

## Entities & Configuration Mappings

### 1. ConfigMap Specification (`k8s/backend-configmap.yaml`)

| Attribute | Value | Description |
| :--- | :--- | :--- |
| `apiVersion` | `v1` | Core API version |
| `kind` | `ConfigMap` | Kubernetes ConfigMap resource |
| `metadata.name` | `web-book-backend-config` | ConfigMap name |
| `data.PORT` | `"3001"` | Non-sensitive backend port configuration |

---

### 2. Secret Specification (`k8s/backend-secret.yaml` & `k8s/backend-secret-example.yaml`)

| Attribute | Value | Description |
| :--- | :--- | :--- |
| `apiVersion` | `v1` | Core API version |
| `kind` | `Secret` | Kubernetes Secret resource |
| `metadata.name` | `web-book-backend-secret` | Secret name |
| `type` | `Opaque` | Generic key-value secret |
| `stringData.MONGODB_URI` | `mongodb+srv://.../web-book` | Encrypted/protected database connection string |

---

### 3. Backend Deployment Env References (`k8s/backend-deployment.yaml`)

| Variable | Ref Type | Ref Object Name | Ref Key |
| :--- | :--- | :--- | :--- |
| `PORT` | `configMapKeyRef` | `web-book-backend-config` | `PORT` |
| `MONGODB_URI` | `secretKeyRef` | `web-book-backend-secret` | `MONGODB_URI` |

---

### 4. Kustomize Resources Spec (`k8s/kustomization.yaml`)

- **Included Resources**:
  - `backend-deployment.yaml`
  - `frontend-deployment.yaml`
  - `backend-service.yaml`
  - `frontend-service.yaml`
  - `ingress.yaml`
  - `backend-configmap.yaml`
- **EXCLUDED Resources** (per security mandate):
  - `backend-secret.yaml`
  - `backend-secret-example.yaml`
