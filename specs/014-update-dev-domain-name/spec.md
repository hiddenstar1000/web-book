# Feature Specification: Update Development Domain Name to spanish-stories.dixonai.net

**Feature Branch**: `014-update-dev-domain-name`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Change dev domain name to spanish-stories.dixonai.net"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dev Ingress Domain & TLS Host Update (Priority: P1) 🎯 MVP

As a developer or site user in the development environment, I want traffic routed to `spanish-stories.dixonai.net` (with updated TLS secret `spanish-stories-tls`) so that the development ingress manifest matches the updated plural domain name.

**Why this priority**: Correcting the development domain hostname ensures web clients and automated tests access the dev environment via the intended URL `https://spanish-stories.dixonai.net`.

**Independent Test**: Render `k8s/dev/ingress.yaml` via Kustomize and verify host `spanish-stories.dixonai.net` and secret `spanish-stories-tls` are specified.

**Acceptance Scenarios**:

1. **Given** `k8s/dev/ingress.yaml`, **When** Kustomize renders the dev manifest bundle, **Then** all host rules and TLS host arrays specify `spanish-stories.dixonai.net`.
2. **Given** the TLS configuration in `k8s/dev/ingress.yaml`, **When** rendered, **Then** `secretName` is set to `spanish-stories-tls`.

---

### User Story 2 - Documentation Alignment for Development Domain (Priority: P2)

As a developer or administrator, I want updated domain references in `README.md` and `k8s/README.md` reflecting `spanish-stories.dixonai.net`.

**Why this priority**: Documentation must stay synchronized with active manifest hostnames to prevent operator confusion.

**Independent Test**: Search project documentation for `spanish-stories.dixonai.net` to verify full alignment.

**Acceptance Scenarios**:

1. **Given** `README.md` and `k8s/README.md`, **When** inspected, **Then** all development environment domain references specify `spanish-stories.dixonai.net`.

---

### Edge Cases

- What happens if old DNS references still point to `spanish-story.dixonai.net`? (The new Ingress manifest explicitly binds `spanish-stories.dixonai.net`; old domain references can be redirected or deprecated at the DNS level).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update host routing rules in `k8s/dev/ingress.yaml` from `spanish-story.dixonai.net` to `spanish-stories.dixonai.net`.
- **FR-002**: System MUST update TLS host arrays and `secretName` in `k8s/dev/ingress.yaml` to `spanish-stories-tls`.
- **FR-003**: System MUST update root `README.md` development environment domain reference to `spanish-stories.dixonai.net`.
- **FR-004**: System MUST update `k8s/README.md` development environment domain reference and secret label to `spanish-stories-tls`.

### Key Entities

- **Dev Domain**: `spanish-stories.dixonai.net` in namespace `app-web-book-dev`.
- **Dev TLS Secret**: `spanish-stories-tls`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of host references in `k8s/dev/ingress.yaml` specify `spanish-stories.dixonai.net`.
- **SC-002**: `kubectl kustomize k8s/dev/` passes clean validation showing host `spanish-stories.dixonai.net` and secret `spanish-stories-tls`.
- **SC-003**: `kubectl apply --dry-run=client -k k8s/dev/` executes with 0 errors.

## Assumptions

- DNS A record for `spanish-stories.dixonai.net` points to the ingress controller / load balancer IP address.
