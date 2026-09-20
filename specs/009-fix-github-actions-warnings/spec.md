# Feature Specification: GitHub Actions Node.js 20 Deprecation Warning Fix

**Feature Branch**: `009-fix-github-actions-warnings`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Fix warning - Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4, docker/build-push-action@v6, docker/login-action@v3"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upgrade GitHub Action Major Versions (Priority: P1)

As a DevOps engineer and project developer, I want the GitHub Actions release workflow (`.github/workflows/publish-ghcr.yaml`) to reference current major versions of checkout, docker login, and docker build-push actions (`actions/checkout@v5`, `docker/login-action@v4`, `docker/build-push-action@v7`), so that workflow executions run natively on the Node.js 24 runner environment without emitting deprecation warnings or forced runtime annotations.

**Why this priority**: P1 because removing action deprecation warnings guarantees long-term pipeline stability and prevents workflow breakage when GitHub completely disables Node 20 runner execution.

**Independent Test**: Inspect `.github/workflows/publish-ghcr.yaml` action versions and parse YAML structure to verify clean action version specifications.

**Acceptance Scenarios**:

1. **Given** `.github/workflows/publish-ghcr.yaml`, **When** checking action `uses` lines, **Then** `actions/checkout@v5` (or higher), `docker/login-action@v4`, and `docker/build-push-action@v7` are specified.
2. **Given** automated release pipeline execution, **When** the workflow runs on GitHub Actions runners, **Then** build-and-push jobs execute without Node 20 deprecation annotations.

---

### Edge Cases

- How does updating action major versions affect existing step parameters like `context`, `tags`, `push`, `username`, and `password`?
- How is backward compatibility preserved for manual `workflow_dispatch` and branch push triggers?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update `actions/checkout@v4` to `actions/checkout@v5` (or latest Node 24 compliant version) in `.github/workflows/publish-ghcr.yaml`.
- **FR-002**: System MUST update `docker/login-action@v3` to `docker/login-action@v4` in `.github/workflows/publish-ghcr.yaml`.
- **FR-003**: System MUST update `docker/build-push-action@v6` to `docker/build-push-action@v7` for both backend and frontend image build steps in `.github/workflows/publish-ghcr.yaml`.
- **FR-004**: System MUST verify SSH deployment action compatibility (`appleboy/ssh-action@v1.2.0` or higher).

### Key Entities

- **Release Workflow Action Specifications**: Action references (`uses: ...`) in `.github/workflows/publish-ghcr.yaml`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% elimination of deprecated action versions (`actions/checkout@v4`, `docker/login-action@v3`, `docker/build-push-action@v6`) from `.github/workflows/publish-ghcr.yaml`.
- **SC-002**: Release pipeline runs without emitting Node 20 deprecation warnings on GitHub Actions runners.

## Assumptions

- Updated action major versions (`actions/checkout@v5`, `docker/login-action@v4`, `docker/build-push-action@v7`) are fully compatible with existing step parameter schemas.
