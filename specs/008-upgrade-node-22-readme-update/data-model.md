# Phase 1 Data Model: Runtime Configurations & Documentation Assets

## Overview

Data model representing the target Node 22 base images and documentation specifications across root and sub-project README files.

---

## Entities

### 1. Node 22 Base Image Specification (`DockerfileUpgrade`)

| File | Target Base Image | Stages Updated |
| :--- | :--- | :--- |
| `backend/Dockerfile` | `node:22-alpine` | `builder`, `runner` |
| `frontend/Dockerfile` | `node:22-alpine` | `deps`, `builder`, `runner` |

---

### 2. Documentation Suite Specification (`ReadmeDocs`)

#### Root Documentation (`README.md`)

- **Prerequisites**: Node.js `v22.x` or higher, npm `v10.x` or higher, MongoDB, Docker.
- **Docker Section**: `docker build` commands for backend (`web-book-backend`) and frontend (`web-book-frontend`), container runtime environment flags, and GHCR deployment workflow overview.

#### Backend Documentation (`backend/README.md`)

- **Prerequisites**: Node.js `v22.x` or higher.
- **Containerization**: `docker build -t backend ./backend` and `docker run -p 3001:3001 backend`.

#### Frontend Documentation (`frontend/README.md`)

- **Prerequisites**: Node.js `v22.x` or higher.
- **Containerization**: `docker build -t frontend ./frontend` and `docker run -p 3000:3000 frontend`.
