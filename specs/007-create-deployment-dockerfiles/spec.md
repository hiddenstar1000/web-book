# Feature Specification: Production Dockerfile Generation for Deployment

**Feature Branch**: `007-create-deployment-dockerfiles`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Create dockerfiles needed for deployment"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - NestJS Backend Containerization (Priority: P1)

As a DevOps engineer and developer, I want a multi-stage production `Dockerfile` in the `backend/` directory so that the NestJS REST API can be compiled into a lightweight, secure container image running on port 3001.

**Why this priority**: P1 because containerizing the backend REST API is a mandatory prerequisite for publishing images to GHCR and deploying to target environments.

**Independent Test**: Execute `docker build -t web-book-backend:test ./backend` and run the container locally to verify HTTP server readiness on port 3001.

**Acceptance Scenarios**:

1. **Given** the `backend/` application source code, **When** `docker build` is executed, **Then** a multi-stage build cleanly compiles NestJS TypeScript source files into `dist/` without dev dependencies in the final image.
2. **Given** a running backend container on port 3001 with database configuration, **When** sending an HTTP GET request to `/api/v1/users`, **Then** the container responds with valid JSON status.

---

### User Story 2 - Next.js Frontend Containerization (Priority: P2)

As a DevOps engineer and developer, I want a multi-stage production `Dockerfile` in the `frontend/` directory so that the Next.js 14 App Router Web UI can be compiled into an optimized container image running on port 3000.

**Why this priority**: P2 because containerizing the Web UI is required to complete full-stack application packaging and deployment.

**Independent Test**: Execute `docker build -t web-book-frontend:test ./frontend` and run the container locally to verify Web UI server readiness on port 3000.

**Acceptance Scenarios**:

1. **Given** the `frontend/` application source code, **When** `docker build` is executed, **Then** a multi-stage build compiles Next.js App Router assets into an optimized production bundle.
2. **Given** a running frontend container on port 3000, **When** requesting `http://localhost:3000`, **Then** the React 18 user interface renders successfully.

---

### Edge Cases

- How does the backend container handle missing or unreachable MongoDB host connections at startup?
- How does the frontend container receive dynamic environment settings (e.g. `NEXT_PUBLIC_API_URL`) during container execution?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide `backend/Dockerfile` using multi-stage builds (`node:20-alpine`) for compiling TypeScript source and running the NestJS REST API.
- **FR-002**: Backend Dockerfile MUST expose port 3001 and execute production server entrypoint `node dist/main.js` using non-root user permissions (`node`).
- **FR-003**: System MUST provide `frontend/Dockerfile` using multi-stage builds (`node:20-alpine`) for compiling and running the Next.js 14 App Router application.
- **FR-004**: Frontend Dockerfile MUST expose port 3000 and run production server (`npm start` or standalone output) using non-root user permissions (`node`).
- **FR-005**: Both Dockerfiles MUST leverage layer caching for `package.json` / `package-lock.json` to optimize build times.

### Key Entities

- **Backend Container Image**: Docker image definition for NestJS REST API (`backend/Dockerfile`).
- **Frontend Container Image**: Docker image definition for Next.js App Router (`frontend/Dockerfile`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% successful Docker build execution for both `backend/` and `frontend/` contexts without build errors.
- **SC-002**: Production container image size remains under 300MB for both backend and frontend images.
- **SC-003**: Both container services start cleanly and listen on their designated ports (backend: 3001, frontend: 3000).

## Assumptions

- Node.js runtime `v20.x` Alpine base images are used for consistency across services.
- Container environment variables (`MONGODB_URI`, `PORT`, `NEXT_PUBLIC_API_URL`) are injected at runtime via Docker runtime environment or Kubernetes pod specs.
