# Data Model & Infrastructure Schemas: Dev Domain Update

**Feature**: `specs/014-update-dev-domain-name`

---

## Infrastructure Entities

### Dev Ingress Entity (`k8s/dev/ingress.yaml`)

- **Resource Kind**: `Ingress` (`networking.k8s.io/v1`)
- **Metadata**:
  - `name`: `web-book-ingress`
  - `annotations`:
    - `cert-manager.io/cluster-issuer`: `letsencrypt-prod`
    - `nginx.ingress.kubernetes.io/ssl-redirect`: `"true"`
- **Spec**:
  - `ingressClassName`: `nginx`
  - `tls`:
    - `hosts`: `["spanish-stories.dixonai.net"]`
    - `secretName`: `spanish-stories-tls`
  - `rules`:
    - `host`: `spanish-stories.dixonai.net`
    - `http.paths`:
      - `path`: `/api`, `backend`: `web-book-backend-service:3001`
      - `path`: `/`, `backend`: `web-book-frontend-service:3000`
