# Phase 0 Research: Node.js 22 Runtime Upgrade & Documentation Update

## Executive Summary

Research decisions and scope definition for upgrading container runtime environments to Node.js 22 (`node:22-alpine`) and updating developer documentation across all README files (`README.md`, `backend/README.md`, `frontend/README.md`).

---

## Technical Decisions & Rationale

### 1. Node 22 Base Image Migration (`node:22-alpine`)

- **Decision**: Update all `FROM node:20-alpine` instructions in `backend/Dockerfile` and `frontend/Dockerfile` to `node:22-alpine`.
- **Rationale**: Node 22 is the current active LTS release, offering improved V8 execution performance, enhanced security hardening, and native feature capabilities. Both NestJS 10 and Next.js 14 fully support Node 22.
- **Alternatives Considered**:
  - *Staying on Node 20*: Rejected because adopting Node 22 LTS aligns the project with modern runtime standards and ongoing maintenance cycles.

### 2. Root `README.md` Documentation Enhancements

- **Decision**: Update root prerequisites from Node.js `v20.x` to `v22.x`. Add a dedicated **Docker Container Deployment** section documenting local multi-stage Docker commands, environment variables, and the GitHub release pipeline (`.github/workflows/publish-ghcr.yaml`).
- **Rationale**: Keeps developer documentation in exact sync with recent containerization and CI/CD workflow additions.

### 3. Service Sub-Directory Documentation (`backend/README.md` and `frontend/README.md`)

- **Decision**: Update local runtime requirements to Node.js `v22.x` and add service-specific Docker build and run instructions to `backend/README.md` and `frontend/README.md`.
- **Rationale**: Ensures engineers inspecting individual sub-projects have accurate, self-contained run guides for both direct Node execution and Docker container execution.
