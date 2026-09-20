# Feature Specification: Ingress Load Balancing & TLS Configuration for Dev and Prod Domains

**Feature Branch**: `013-k8s-ingress-tls-domains`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "I want to setup the same load balance for both envirments. And also TLS need to be setup as well. Domain names dev: spanish-story.dixonai.net prod: tripitaka.dixonai.net"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Environment-Specific Domain Ingress & TLS Termination (Priority: P1) 🎯 MVP

As a system user or administrator, I want HTTP and HTTPS traffic routed to the application through dedicated domain names (`spanish-story.dixonai.net` for dev and `tripitaka.dixonai.net` for prod) with TLS termination so that web access is encrypted and environment-isolated.

**Why this priority**: Enabling HTTPS and environment-specific domain routing is mandatory for securing client communications and providing accessible hostnames.

**Independent Test**: Verify Ingress manifests in `k8s/dev/ingress.yaml` and `k8s/prod/ingress.yaml` specify host rules (`spanish-story.dixonai.net` and `tripitaka.dixonai.net`) and TLS secret definitions.

**Acceptance Scenarios**:

1. **Given** the `k8s/dev/ingress.yaml` manifest, **When** rendered or applied, **Then** host `spanish-story.dixonai.net` is bound to ingress rules and TLS secret `spanish-story-tls` (or cert-manager cluster-issuer annotations) is configured.
2. **Given** the `k8s/prod/ingress.yaml` manifest, **When** rendered or applied, **Then** host `tripitaka.dixonai.net` is bound to ingress rules and TLS secret `tripitaka-tls` (or cert-manager cluster-issuer annotations) is configured.
3. **Given** incoming HTTPS requests, **When** routed through NGINX Ingress, **Then** traffic terminates TLS and proxies to the appropriate UI (`/`) and API (`/api`) backend services.

---

### User Story 2 - Uniform Load Balancer Service Configuration (Priority: P2)

As a DevOps engineer, I want identical Load Balancer and Service configurations across both `k8s/dev` and `k8s/prod` environments so that routing behavior, port assignments, and health probes match between staging and production.

**Why this priority**: Consistency between dev and prod service configurations eliminates environment drift and deployment surprises.

**Independent Test**: Compare Service and Deployment definitions in `k8s/dev/` and `k8s/prod/` to ensure identical Service types, target ports, and Ingress routing blocks.

**Acceptance Scenarios**:

1. **Given** `k8s/dev/frontend-service.yaml` and `k8s/prod/frontend-service.yaml`, **When** inspected, **Then** both define matching Service types (`LoadBalancer` or `ClusterIP` as managed by Ingress) and port mappings.
2. **Given** `k8s/dev/backend-service.yaml` and `k8s/prod/backend-service.yaml`, **When** inspected, **Then** both define matching `ClusterIP` service ports (3001).

---

### User Story 3 - Ingress TLS & Domain Setup Documentation (Priority: P3)

As a developer or administrator, I want clear instructions in `README.md` and `k8s/README.md` explaining how TLS certificates are issued/configured and how domain DNS records map to the load balancer IP.

**Why this priority**: Comprehensive documentation ensures team members can manage DNS records and troubleshoot certificate issuance.

**Independent Test**: Review `README.md` and `k8s/README.md` to confirm domain mappings and cert-manager / TLS setup steps are detailed.

**Acceptance Scenarios**:

1. **Given** updated documentation, **When** an operator follows the TLS guide, **Then** they can verify DNS points to `spanish-story.dixonai.net` (dev) and `tripitaka.dixonai.net` (prod) and issue TLS certificates.

---

### Edge Cases

- What happens if cert-manager ClusterIssuer is not installed on the cluster? (Manifests MUST support standard Kubernetes TLS secret references `tls.crt` / `tls.key` or fallback annotations).
- How does Ingress handle non-matching host header requests? (Default backend or catch-all routing handles unmapped domains without throwing server errors).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST configure dev Ingress in `k8s/dev/ingress.yaml` to route host `spanish-story.dixonai.net` to frontend (`/`) and backend (`/api`) services.
- **FR-002**: System MUST configure prod Ingress in `k8s/prod/ingress.yaml` to route host `tripitaka.dixonai.net` to frontend (`/`) and backend (`/api`) services.
- **FR-003**: System MUST configure TLS termination specs in `k8s/dev/ingress.yaml` for host `spanish-story.dixonai.net` with TLS secret `spanish-story-tls`.
- **FR-004**: System MUST configure TLS termination specs in `k8s/prod/ingress.yaml` for host `tripitaka.dixonai.net` with TLS secret `tripitaka-tls`.
- **FR-005**: System MUST include cert-manager Let's Encrypt annotations (`cert-manager.io/cluster-issuer: letsencrypt-prod`) or documented TLS secret creation steps for both environments.
- **FR-006**: System MUST maintain identical Service load balancer port mappings (port 3000 for UI, port 3001 for API) between `k8s/dev` and `k8s/prod`.

### Key Entities

- **Dev Ingress Domain**: `spanish-story.dixonai.net` in namespace `app-web-book-dev`.
- **Prod Ingress Domain**: `tripitaka.dixonai.net` in namespace `app-web-book-prod`.
- **TLS Secret Spec**: Kubernetes `kubernetes.io/tls` secret containing `tls.crt` and `tls.key`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `kubectl kustomize k8s/dev/` renders Ingress manifest with host `spanish-story.dixonai.net` and TLS secret `spanish-story-tls`.
- **SC-002**: `kubectl kustomize k8s/prod/` renders Ingress manifest with host `tripitaka.dixonai.net` and TLS secret `tripitaka-tls`.
- **SC-003**: `kubectl apply --dry-run=client -k k8s/dev/` and `kubectl apply --dry-run=client -k k8s/prod/` execute cleanly with 100% valid schema.
- **SC-004**: Frontend and Backend service load balancing port definitions match 100% across dev and prod environments.

## Assumptions

- DNS A records for `spanish-story.dixonai.net` and `tripitaka.dixonai.net` point to the ingress controller / load balancer external IP.
- Cert-manager or Let's Encrypt cluster issuer is available on the target cluster or TLS secrets are manually provisioned per environment.
