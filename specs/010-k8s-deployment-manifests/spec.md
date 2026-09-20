# Feature Specification: Kubernetes Deployment Manifests & Kustomization Setup

**Feature Branch**: `010-k8s-deployment-manifests`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Write k8s files to deploy api and ui on seperated pods. 2 pods for api and 2 pods for ui. ingress and load blancer need to be added as well. Add a kustomization.yaml as well."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Decoupled API and UI Pod Deployments (Priority: P1)

As a Kubernetes operator and system administrator, I want separate Kubernetes deployment manifests for the NestJS API backend (`web-book-backend`) and Next.js Web UI (`web-book-frontend`), each configured with 2 replica pods, so that API and UI workloads scale, auto-heal, and isolate independently.

**Why this priority**: P1 because deploying 2 independent pods for API and 2 independent pods for UI ensures high availability and workload isolation across cluster nodes.

**Independent Test**: Execute `kubectl apply -k k8s/` and verify that 2 backend API pods (`web-book-backend`) and 2 frontend UI pods (`web-book-frontend`) transition to `Running` status.

**Acceptance Scenarios**:

1. **Given** the backend API deployment manifest, **When** applied to the cluster, **Then** 2 API backend replica pods are scheduled and pass container readiness probes on port 3001.
2. **Given** the frontend UI deployment manifest, **When** applied to the cluster, **Then** 2 UI frontend replica pods are scheduled and pass container readiness probes on port 3000.

---

### User Story 2 - Networking, Ingress, and LoadBalancer Setup (Priority: P2)

As a DevOps engineer, I want Kubernetes ClusterIP / LoadBalancer service definitions and an Ingress controller resource routing `/api` paths to backend service pods and `/` root paths to frontend service pods, so that external client traffic is evenly load-balanced across pod replicas.

**Why this priority**: P2 because ingress routing and load balancing expose application services to external users seamlessly.

**Independent Test**: Dispatch HTTP requests to the Ingress host/IP verifying `/api/v1/users` routes to backend API pods and `/` routes to frontend UI pods.

**Acceptance Scenarios**:

1. **Given** the Ingress resource, **When** a client requests `/api/v1/users`, **Then** traffic is routed and load-balanced across the 2 backend API pods.
2. **Given** the Ingress resource, **When** a client requests `/`, **Then** traffic is routed and load-balanced across the 2 frontend UI pods.

---

### User Story 3 - Kustomization Aggregation (Priority: P3)

As a DevOps engineer, I want a `kustomization.yaml` manifest aggregating all deployment, service, ingress, and secret resources in the `k8s/` directory, so that the complete infrastructure stack can be rendered and deployed declaratively with a single `kubectl apply -k k8s/` command.

**Why this priority**: P3 because Kustomize simplifies declarative cluster management and environment-specific overrides.

**Independent Test**: Execute `kubectl kustomize k8s/` and confirm that all deployments, services, ingress, and config maps render into a unified YAML stream without syntax errors.

**Acceptance Scenarios**:

1. **Given** the `k8s/` directory containing `kustomization.yaml`, **When** running `kubectl kustomize k8s/`, **Then** a multi-resource YAML manifest containing backend/frontend deployments, services, and ingress is generated cleanly.

---

### Edge Cases

- How does the backend deployment retrieve database connection credentials (`MONGODB_URI`)?
- How does the Ingress controller handle path prefix rewriting or header propagation for REST API requests?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide backend deployment manifest (`k8s/backend-deployment.yaml`) configuring 2 replica pods of `web-book-backend` listening on port 3001.
- **FR-002**: System MUST provide frontend deployment manifest (`k8s/frontend-deployment.yaml`) configuring 2 replica pods of `web-book-frontend` listening on port 3000.
- **FR-003**: System MUST provide backend Kubernetes service manifest (`k8s/backend-service.yaml`) exposing port 3001 for cluster internal routing.
- **FR-004**: System MUST provide frontend Kubernetes service manifest (`k8s/frontend-service.yaml`) exposing port 3000 with LoadBalancer configuration.
- **FR-005**: System MUST provide Ingress manifest (`k8s/ingress.yaml`) routing `/api` paths to backend service (port 3001) and `/` root paths to frontend service (port 3000).
- **FR-006**: System MUST provide `k8s/kustomization.yaml` aggregating all deployment, service, ingress, and secret resources under `k8s/`.

### Key Entities

- **API Workload Deployment**: Kubernetes Deployment with `replicas: 2` managing NestJS pods (`backend-deployment.yaml`).
- **UI Workload Deployment**: Kubernetes Deployment with `replicas: 2` managing Next.js pods (`frontend-deployment.yaml`).
- **Kubernetes Networking Services**: `backend-service.yaml` (ClusterIP/Internal), `frontend-service.yaml` (LoadBalancer).
- **Ingress Controller Resource**: Ingress routing spec (`ingress.yaml`).
- **Declarative Aggregator**: Kustomize file (`kustomization.yaml`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% valid Kubernetes YAML manifest syntax verified via `kubectl apply --dry-run=client -k k8s/`.
- **SC-002**: Deployment manifests explicitly enforce `replicas: 2` for backend API pods and `replicas: 2` for frontend UI pods.
- **SC-003**: Ingress resource configures valid routing rules for `/api` (port 3001) and `/` (port 3000).

## Assumptions

- Target Kubernetes cluster has an active Ingress Controller (e.g. NGINX Ingress Controller).
- Container images `web-book-backend` and `web-book-frontend` are available in cluster registry or GHCR.
