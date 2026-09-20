# Phase 1 Data Model: Kubernetes Resource Specifications

## Overview

Data model representing the Kubernetes workload deployments, networking services, ingress routes, and Kustomize bundle configuration.

---

## Kubernetes Entities

### 1. Backend API Deployment Spec (`backend-deployment.yaml`)

| Field / Attribute | Value | Description |
| :--- | :--- | :--- |
| `apiVersion` | `apps/v1` | Deployment API version |
| `kind` | `Deployment` | Kubernetes Deployment kind |
| `metadata.name` | `web-book-backend` | Deployment name |
| `spec.replicas` | `2` | Exactly 2 API backend pods |
| `container.image` | `ghcr.io/${GH_USER}/web-book-backend:latest` | Backend Docker container |
| `container.port` | `3001` | REST API service port |

---

### 2. Frontend UI Deployment Spec (`frontend-deployment.yaml`)

| Field / Attribute | Value | Description |
| :--- | :--- | :--- |
| `apiVersion` | `apps/v1` | Deployment API version |
| `kind` | `Deployment` | Kubernetes Deployment kind |
| `metadata.name` | `web-book-frontend` | Deployment name |
| `spec.replicas` | `2` | Exactly 2 UI frontend pods |
| `container.image` | `ghcr.io/${GH_USER}/web-book-frontend:latest` | Frontend Docker container |
| `container.port` | `3000` | Web UI service port |

---

### 3. Service Specs (`backend-service.yaml` & `frontend-service.yaml`)

| Service Name | Service Type | Port / TargetPort | Target Selector |
| :--- | :--- | :--- | :--- |
| `web-book-backend-service` | `ClusterIP` | `3001:3001` | `app: web-book-backend` |
| `web-book-frontend-service` | `LoadBalancer` | `3000:3000` | `app: web-book-frontend` |

---

### 4. Ingress Routing Spec (`ingress.yaml`)

| Ingress Host / Path | Target Service | Target Service Port |
| :--- | :--- | :--- |
| `/api` | `web-book-backend-service` | `3001` |
| `/` | `web-book-frontend-service` | `3000` |

---

### 5. Kustomize Bundle Spec (`kustomization.yaml`)

- **Resource List**:
  - `backend-deployment.yaml`
  - `frontend-deployment.yaml`
  - `backend-service.yaml`
  - `frontend-service.yaml`
  - `ingress.yaml`
