# Data Model & Infrastructure Schemas: Ingress & TLS Configuration

**Feature**: `specs/013-k8s-ingress-tls-domains`

---

## Infrastructure Entities

### 1. Dev Ingress Entity (`k8s/dev/ingress.yaml`)

- **Resource Kind**: `Ingress` (`networking.k8s.io/v1`)
- **Metadata**:
  - `name`: `web-book-ingress`
  - `namespace`: `app-web-book-dev` (injected via Kustomize)
  - `annotations`:
    - `cert-manager.io/cluster-issuer`: `letsencrypt-prod`
    - `nginx.ingress.kubernetes.io/ssl-redirect`: `"true"`
- **Spec**:
  - `ingressClassName`: `nginx`
  - `tls`:
    - `hosts`: `["spanish-story.dixonai.net"]`
    - `secretName`: `spanish-story-tls`
  - `rules`:
    - `host`: `spanish-story.dixonai.net`
    - `http.paths`:
      - `path`: `/api`, `backend`: `web-book-backend-service:3001`
      - `path`: `/`, `backend`: `web-book-frontend-service:3000`

---

### 2. Prod Ingress Entity (`k8s/prod/ingress.yaml`)

- **Resource Kind**: `Ingress` (`networking.k8s.io/v1`)
- **Metadata**:
  - `name`: `web-book-ingress`
  - `namespace`: `app-web-book-prod` (injected via Kustomize)
  - `annotations`:
    - `cert-manager.io/cluster-issuer`: `letsencrypt-prod`
    - `nginx.ingress.kubernetes.io/ssl-redirect`: `"true"`
- **Spec**:
  - `ingressClassName`: `nginx`
  - `tls`:
    - `hosts`: `["tripitaka.dixonai.net"]`
    - `secretName`: `tripitaka-tls`
  - `rules`:
    - `host`: `tripitaka.dixonai.net`
    - `http.paths`:
      - `path`: `/api`, `backend`: `web-book-backend-service:3001`
      - `path`: `/`, `backend`: `web-book-frontend-service:3000`

---

### 3. Load Balancer Service Schemas

- **Frontend Service**:
  - `metadata.name`: `web-book-frontend-service`
  - `spec.type`: `LoadBalancer`
  - `ports`: port `3000` -> targetPort `3000`
- **Backend Service**:
  - `metadata.name`: `web-book-backend-service`
  - `spec.type`: `ClusterIP`
  - `ports`: port `3001` -> targetPort `3001`
