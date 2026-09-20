# Research: Update Development Domain Name to spanish-stories.dixonai.net

**Feature**: `specs/014-update-dev-domain-name`

---

## Technical Decisions & Rationale

### 1. Development Domain Name Pluralization

- **Decision**: Change dev Ingress hostname in `k8s/dev/ingress.yaml` from `spanish-story.dixonai.net` to `spanish-stories.dixonai.net`.
- **Rationale**: Aligns dev Ingress routing rules with the plural domain name specified by project stakeholder requirements.
- **Alternatives Considered**: None — explicit domain update requested.

---

### 2. TLS Secret Alignment

- **Decision**: Update TLS secret name in `k8s/dev/ingress.yaml` from `spanish-story-tls` to `spanish-stories-tls`.
- **Rationale**: Keeps TLS secret naming convention consistent with the domain name `spanish-stories.dixonai.net`.
