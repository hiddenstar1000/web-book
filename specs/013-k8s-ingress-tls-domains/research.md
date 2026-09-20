# Research: Ingress Load Balancing & TLS Configuration for Dev and Prod Domains

**Feature**: `specs/013-k8s-ingress-tls-domains`

---

## Technical Decisions & Rationale

### 1. Ingress Host-Based Routing & Domain Binding

- **Decision**: Configure `k8s/dev/ingress.yaml` with host `spanish-story.dixonai.net` and `k8s/prod/ingress.yaml` with host `tripitaka.dixonai.net`.
- **Rationale**: Direct domain binding in Ingress resources ensures that traffic meant for dev (`app-web-book-dev`) and prod (`app-web-book-prod`) is routed strictly to the corresponding cluster namespace based on the HTTP `Host` header.
- **Alternatives Considered**:
  - *Wildcard DNS / shared host path prefix*: Rejected because explicit subdomains provide isolated SSL/TLS certificate scope and clean separation between environment entrypoints.

---

### 2. TLS Secret Specification & Cert-Manager Integration

- **Decision**: Define standard Kubernetes `tls` block in both Ingress manifests referencing TLS secrets (`spanish-story-tls` in dev, `tripitaka-tls` in prod) and add cert-manager cluster-issuer annotations (`cert-manager.io/cluster-issuer: letsencrypt-prod`).
- **Rationale**: Provides automatic TLS certificate management via Let's Encrypt when cert-manager is present on the cluster while maintaining standard Kubernetes `tls` secret schema fallback for manually provisioned SSL/TLS keys.

---

### 3. Load Balancer Service Port Standardization

- **Decision**: Keep identical Service definitions across dev and prod environments:
  - Frontend Service: Port 3000 (LoadBalancer / ClusterIP) mapping to container port 3000.
  - Backend Service: Port 3001 (ClusterIP) mapping to container port 3001.
- **Rationale**: Uniform Service setup ensures identical load balancing and proxy behavior regardless of environment.

---

### 4. NGINX Ingress Routing Rules

- **Decision**: Route `/api` prefix to `web-book-backend-service:3001` and `/` prefix to `web-book-frontend-service:3000` in both environment Ingress manifests.
- **Rationale**: Decouples API requests from UI asset requests at the ingress controller level while matching the application's runtime API base URL expectations.
