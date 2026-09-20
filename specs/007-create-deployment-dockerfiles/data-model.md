# Phase 1 Data Model: Container Specifications & Build Entities

## Overview

Data model and entity definitions representing the multi-stage Docker build specifications for `backend/Dockerfile` and `frontend/Dockerfile`.

---

## Container Specifications

### 1. NestJS Backend Container Specification (`BackendDockerfile`)

| Field / Attribute | Value | Description |
| :--- | :--- | :--- |
| `target_path` | `backend/Dockerfile` | Path to backend containerfile |
| `base_image` | `node:20-alpine` | Lightweight official Node 20 base |
| `build_stage` | `builder` | Stage compiling TypeScript to `dist/` |
| `production_stage` | `runner` | Stage serving production NestJS app |
| `exposed_port` | `3001` | REST API service port |
| `user_context` | `node` | Non-root runtime user |
| `entrypoint` | `["node", "dist/main.js"]` | Production server execution command |
| `environment_vars` | `PORT=3001`, `NODE_ENV=production` | Runtime configuration defaults |

---

### 2. Next.js Frontend Container Specification (`FrontendDockerfile`)

| Field / Attribute | Value | Description |
| :--- | :--- | :--- |
| `target_path` | `frontend/Dockerfile` | Path to frontend containerfile |
| `base_image` | `node:20-alpine` | Lightweight official Node 20 base |
| `dependencies_stage` | `deps` | Stage caching npm package installation |
| `build_stage` | `builder` | Stage compiling Next.js 14 App Router |
| `production_stage` | `runner` | Stage serving Next.js web application |
| `exposed_port` | `3000` | Web UI service port |
| `user_context` | `node` | Non-root runtime user |
| `entrypoint` | `["npm", "start"]` | Production Next.js server command |
| `environment_vars` | `PORT=3000`, `NODE_ENV=production` | Runtime configuration defaults |
