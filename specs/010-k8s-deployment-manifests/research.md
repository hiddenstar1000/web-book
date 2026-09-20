# Phase 0 Research: Kubernetes Deployment Manifests & Kustomization Setup

## Executive Summary

Research findings and design decisions for creating production-ready Kubernetes deployment manifests, services, ingress routing, and Kustomization configuration in the `k8s/` directory.

---

## Technical Decisions & Rationale

### 1. Workload Separation & Replica Counts

- **Decision**: Define separate Kubernetes Deployments for the NestJS API backend (`web-book-backend`) and Next.js Web UI (`web-book-frontend`), each configured with `replicas: 2`.
- **Rationale**: Isolates backend API logic from frontend UI rendering. Running 2 pod replicas per service provides high availability, fault tolerance, and zero-downtime rolling updates.
- **Alternatives Considered**:
  - *Single Pod with sidecar containers*: Rejected because backend and frontend have different scaling dynamics and resource requirements.

### 2. Service Architecture & Load Balancing

- **Decision**:
  - `web-book-backend-service`: `Type: ClusterIP` exposing port 3001 for internal cluster communication.
  - `web-book-frontend-service`: `Type: LoadBalancer` exposing port 3000 for direct external access when LoadBalancer is available.
- **Rationale**: ClusterIP secures the backend API inside the cluster network, while LoadBalancer allows external access to the frontend UI directly or via Ingress.

### 3. Ingress Path Routing

- **Decision**: Create NGINX-compatible `Ingress` resource (`k8s/ingress.yaml`) configured with path routing:
  - `/api` -> `web-book-backend-service:3001`
  - `/` -> `web-book-frontend-service:3000`
- **Rationale**: Provides a single public entrypoint for client browsers, transparently routing REST API calls to the backend and page requests to the frontend.

### 4. Declarative Kustomize Aggregation (`k8s/kustomization.yaml`)

- **Decision**: Place all manifests in `k8s/` and aggregate them using `k8s/kustomization.yaml`.
- **Rationale**: Allows single-command deployment via `kubectl apply -k k8s/` and enables environment overlays (e.g. `dev`, `prod`) without duplicating base manifests.
