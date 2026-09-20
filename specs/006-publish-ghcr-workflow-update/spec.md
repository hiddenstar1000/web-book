# Feature Specification: GHCR Publishing & Deployment Workflow Alignment

**Feature Branch**: `006-publish-ghcr-workflow-update`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Change @[.github/workflows/publish-ghcr.yaml] to match this project deployments"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Container Image Build and GHCR Publishing (Priority: P1)

As a DevOps engineer and project developer, I want the automated GitHub release workflow to build container images for this project's actual NestJS backend and Next.js frontend services and publish them to GitHub Container Registry (GHCR) whenever changes are pushed to `main` or `dev` branches, so that up-to-date container images are continuously generated and stored.

**Why this priority**: P1 because containerizing and publishing the correct project artifacts is mandatory before any target environment deployment can succeed.

**Independent Test**: Trigger workflow execution via git push or manual workflow dispatch and verify that NestJS backend (`./backend`) and Next.js frontend (`./frontend`) images are successfully built and published to GHCR with branch-appropriate tags (`dev` or `latest`).

**Acceptance Scenarios**:

1. **Given** code changes pushed to `dev` branch, **When** the release workflow executes, **Then** container images for backend and frontend are built from `./backend` and `./frontend` contexts and published to GHCR tagged with `dev`.
2. **Given** code changes pushed to `main` branch, **When** the release workflow executes, **Then** container images for backend and frontend are built from `./backend` and `./frontend` contexts and published to GHCR tagged with `latest`.

---

### User Story 2 - Automated Environment Deployment via SSH and MicroK8s (Priority: P2)

As a System Administrator, I want the release workflow to trigger rolling restarts of the corresponding backend and frontend Kubernetes deployments in the appropriate target namespace (`app-em-dev` for `dev` branch, `app-em-prod` for `main` branch), so that deployed environments immediately run the newest container builds.

**Why this priority**: P2 because automated deployment ensures rapid feedback and seamless delivery after container publication.

**Independent Test**: Execute the workflow and inspect remote server execution logs to confirm successful SSH connection and MicroK8s rollout restart commands targeted at backend and frontend workloads.

**Acceptance Scenarios**:

1. **Given** a successful container image push for `dev`, **When** the deployment step executes, **Then** SSH connection issues rollout restart for backend and frontend deployments in the DEV environment (`app-em-dev` namespace).
2. **Given** a successful container image push for `main`, **When** the deployment step executes, **Then** SSH connection issues rollout restart for backend and frontend deployments in the PROD environment (`app-em-prod` namespace).

---

### Edge Cases

- How does system handle build failures in either backend (`./backend`) or frontend (`./frontend`) context during image creation?
- How does system handle SSH connection failure or command execution error on the remote deployment server?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Workflow MUST remove legacy Java/Maven build steps that target non-existent `employee-management-api` directories.
- **FR-002**: Workflow MUST build and push container images using `./backend` as the build context for the NestJS REST API backend service.
- **FR-003**: Workflow MUST build and push container images using `./frontend` as the build context for the Next.js App Router frontend service.
- **FR-004**: Workflow MUST tag published images with `dev` when triggered on the `dev` branch and `latest` when triggered on the `main` branch.
- **FR-005**: Workflow MUST perform automated deployment rollout restarts via SSH for both backend and frontend deployments in the target MicroK8s cluster namespace (`app-em-dev` for DEV, `app-em-prod` for PROD).
- **FR-006**: Workflow MUST retain manual trigger capability (`workflow_dispatch`) alongside automatic branch push triggers (`main`, `dev`).

### Key Entities

- **Backend Service Container Image**: Docker container artifact built from `./backend` representing the NestJS REST API application.
- **Frontend Service Container Image**: Docker container artifact built from `./frontend` representing the Next.js Web UI application.
- **Deployment Targets**: Remote MicroK8s Kubernetes namespaces (`app-em-dev` for development, `app-em-prod` for production) managing application workloads.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% elimination of legacy Java/Maven build steps and non-existent project path references (`employee-management-api`, `employee-management-ui`) from the workflow file.
- **SC-002**: Continuous integration workflow cleanly executes Docker builds against `./backend` and `./frontend` directories without syntax or path resolution errors.
- **SC-003**: Deployment step successfully dispatches Kubernetes rollout restart commands for both backend and frontend workloads upon container image publish completion.

## Assumptions

- Both `backend/` and `frontend/` directories contain or will contain valid Dockerfile specifications.
- Required GitHub secrets (`GH_USER`, `GH_PAT`, `SSH_KEY`) and variables (`SSH_HOST`, `SSH_USER`, `SSH_PORT`) are pre-configured in repository secrets/variables.
- Remote server hosts a MicroK8s cluster running backend and frontend deployment workloads in `app-em-dev` and `app-em-prod` namespaces.
