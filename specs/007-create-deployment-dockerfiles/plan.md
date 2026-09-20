# Implementation Plan: Production Dockerfile Generation for Deployment

**Branch**: `007-create-deployment-dockerfiles` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [`specs/007-create-deployment-dockerfiles/spec.md`](spec.md)

## Summary

Create production multi-stage Dockerfiles for the NestJS REST API server (`backend/Dockerfile`) and Next.js 14 App Router UI (`frontend/Dockerfile`). Both Dockerfiles utilize lightweight `node:20-alpine` base images, enforce layer caching for node dependencies, run as non-root `node` user in production, and expose service ports 3001 (backend) and 3000 (frontend).

## Technical Context

**Language/Version**: Dockerfile (Docker Engine 20+ / BuildKit), Node.js v20.x
**Primary Dependencies**: `node:20-alpine`, `npm`, NestJS 10 CLI / TypeScript, Next.js 14 App Router
**Storage**: N/A
**Testing**: `docker build` validation tests, image size inspection
**Target Platform**: GitHub Container Registry (GHCR), Kubernetes / MicroK8s cluster, local Docker runtime
**Project Type**: Full-Stack Web Application (NestJS REST API + Next.js App Router)
**Performance Goals**: Fast multi-stage Docker build under 2 minutes with layer caching, small container image footprint (<300MB)
**Constraints**: Non-root execution (`USER node`), isolated production dependencies, zero devDependencies in final image
**Scale/Scope**: 2 files (`backend/Dockerfile`, `frontend/Dockerfile`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Compliance Status | Rationale |
| :--- | :--- | :--- |
| **I. Test Coverage Mandatory (>90%)** | **PASS** | Dockerfile creation does not touch application source code logic; existing unit test coverage in `backend/` and `frontend/` (>90%) is fully preserved. |
| **II. API & UI Separation of Concerns** | **PASS** | `backend/Dockerfile` and `frontend/Dockerfile` isolate backend REST API and frontend Web UI into separate, independent container images. |
| **III. Test-Driven & Continuous Verification** | **PASS** | Local `docker build` commands and CI/CD GitHub release workflows continuously verify image build health. |

## Project Structure

### Documentation (this feature)

```text
specs/007-create-deployment-dockerfiles/
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research & decision log
├── data-model.md        # Phase 1 entities & container specs
├── quickstart.md        # Phase 1 verification & validation guide
└── contracts/
    └── docker-contracts.md # Phase 1 Dockerfile contracts
```

### Source Code (repository root)

```text
backend/
├── Dockerfile           # [NEW] Multi-stage Dockerfile for NestJS API (port 3001)
├── .dockerignore        # Existing backend ignore rules
├── src/
└── package.json

frontend/
├── Dockerfile           # [NEW] Multi-stage Dockerfile for Next.js UI (port 3000)
├── .dockerignore        # Existing frontend ignore rules
├── src/
└── package.json
```

**Structure Decision**: Option 2 (Web application with `backend/` and `frontend/`). Dockerfiles are placed directly within `backend/` and `frontend/` project roots.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | N/A | No constitution principles violated. |
