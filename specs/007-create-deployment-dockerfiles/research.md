# Phase 0 Research: Production Dockerfile Generation for Deployment

## Executive Summary

Technical decisions and architectural design for creating production multi-stage Dockerfiles for the NestJS REST API (`backend/Dockerfile`) and Next.js 14 App Router UI (`frontend/Dockerfile`).

---

## Technical Decisions & Rationale

### 1. Multi-Stage Build Architecture

- **Decision**: Implement 2-stage/3-stage Docker builds using `node:20-alpine` as base image for both backend and frontend applications.
- **Rationale**: Multi-stage builds separate the build environment (containing TypeScript compiler, devDependencies, source code) from the minimal production runtime environment (containing only compiled JS assets and production dependencies). This reduces image size from ~1GB to <250MB and minimizes security attack surface.
- **Alternatives Considered**:
  - *Single-stage build*: Rejected because it leaves devDependencies, build tools, and full source code in the production image.

### 2. NestJS Backend Containerization (`backend/Dockerfile`)

- **Decision**:
  - Build Stage: `npm ci` -> `npm run build` (compiles TypeScript to `dist/`).
  - Production Stage: `npm ci --only=production` -> copy `dist/` -> `USER node` -> `EXPOSE 3001` -> `CMD ["node", "dist/main.js"]`.
- **Rationale**: `dist/main.js` is the compiled entrypoint for NestJS. Running `node dist/main.js` in production avoids runtime TypeScript compilation overhead and unnecessary tooling.

### 3. Next.js 14 Frontend Containerization (`frontend/Dockerfile`)

- **Decision**:
  - Dependencies Stage: Install node modules (`npm ci`).
  - Builder Stage: Copy source and run `npm run build`.
  - Runner Stage: Copy `.next`, `public`, `package.json`, and production node modules -> `USER node` -> `EXPOSE 3000` -> `CMD ["npm", "start"]`.
- **Rationale**: `npm start` runs the Next.js production server on port 3000 with optimized caching and static asset delivery.

### 4. Container Security & Non-Root Execution

- **Decision**: Enforce non-root execution using `USER node` (uid/gid 1000 included in `node:20-alpine`) in both production runner stages.
- **Rationale**: Prevents potential container escape risks by ensuring application processes run without root privileges inside container environments.
