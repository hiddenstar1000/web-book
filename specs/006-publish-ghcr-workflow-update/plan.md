# Implementation Plan: GHCR Publishing & Deployment Workflow Alignment

**Branch**: `006-publish-ghcr-workflow-update` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [`specs/006-publish-ghcr-workflow-update/spec.md`](spec.md)

## Summary

Update `.github/workflows/publish-ghcr.yaml` to match the actual `web-book` repository architecture. Remove legacy Java/Maven build steps targeting non-existent `employee-management-api` directories. Replace Docker build contexts with `./backend` (NestJS REST API) and `./frontend` (Next.js 14 App Router UI), and align container image names (`web-book-backend`, `web-book-frontend`) and remote SSH MicroK8s rollout deployment restart commands (`app-em-dev` and `app-em-prod` namespaces).

## Technical Context

**Language/Version**: YAML (GitHub Actions DSL), Docker / Containerfile specs
**Primary Dependencies**: `actions/checkout@v4`, `docker/login-action@v3`, `docker/build-push-action@v6`, `appleboy/ssh-action@v1.0.3`
**Storage**: GitHub Container Registry (`ghcr.io`)
**Testing**: YAML linter validation (`python3 -c "import yaml..."`), GitHub Actions workflow syntax checks
**Target Platform**: GitHub Actions CI/CD runners (ubuntu-latest), remote SSH host running MicroK8s
**Project Type**: CI/CD Release & Deployment Workflow
**Performance Goals**: Fast container layer caching, complete workflow execution under 5 minutes
**Constraints**: Zero downtime rolling restarts on MicroK8s, secrets protection (`GH_USER`, `GH_PAT`, `SSH_KEY`)
**Scale/Scope**: 1 workflow file (`.github/workflows/publish-ghcr.yaml`), 2 container images (`web-book-backend`, `web-book-frontend`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Compliance Status | Rationale |
| :--- | :--- | :--- |
| **I. Test Coverage Mandatory (>90%)** | **PASS** | Workflow changes do not modify application source code in `backend/` or `frontend/`. Application unit test suites in `backend/` and `frontend/` remain >90% coverage compliant. |
| **II. API & UI Separation of Concerns** | **PASS** | Workflow builds and publishes separate, decoupled container images for backend API (`web-book-backend`) and frontend UI (`web-book-frontend`). |
| **III. Test-Driven & Continuous Verification** | **PASS** | Workflow validation tests and YAML syntax checks verify pipeline correctness. CI continues to run automated workflows. |

## Project Structure

### Documentation (this feature)

```text
specs/006-publish-ghcr-workflow-update/
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research & decision log
├── data-model.md        # Phase 1 entities & configuration data model
├── quickstart.md        # Phase 1 verification & validation guide
└── contracts/
    └── workflow-contract.md  # Phase 1 interface contract specification
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── publish-ghcr.yaml   # GitHub Actions release & deployment workflow

backend/
├── src/                 # NestJS REST API source code
├── package.json
└── jest.config.js

frontend/
├── src/                 # Next.js App Router Web UI source code
├── package.json
└── jest.config.js
```

**Structure Decision**: Option 2 (Web application with `backend/` and `frontend/`). The workflow `.github/workflows/publish-ghcr.yaml` sits at root level to build and publish container artifacts from both sub-directories.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | N/A | No constitution principles violated. |
