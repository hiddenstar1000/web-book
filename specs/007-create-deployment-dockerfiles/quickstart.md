# Phase 1 Quickstart & Validation Guide: Dockerfile Verification

## Overview

Runnable verification guide to build, validate, and test `backend/Dockerfile` and `frontend/Dockerfile` locally.

---

## Validation Steps

### Step 1: Validate Backend Dockerfile Build

Build the NestJS backend container image locally:

```bash
docker build -t web-book-backend:local ./backend
```

Expected outcome: Image builds successfully and outputs `web-book-backend:local`.

### Step 2: Validate Frontend Dockerfile Build

Build the Next.js frontend container image locally:

```bash
docker build -t web-book-frontend:local ./frontend
```

Expected outcome: Image builds successfully and outputs `web-book-frontend:local`.

### Step 3: Check Container Image Sizes

Verify that container image sizes stay optimized (<300MB):

```bash
docker images | grep web-book
```

---

## References

- [Dockerfile Contracts](contracts/docker-contracts.md)
- [Data Model & Entities](data-model.md)
- [Phase 0 Research](research.md)
