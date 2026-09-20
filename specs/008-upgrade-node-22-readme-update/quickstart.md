# Phase 1 Quickstart & Validation Guide: Node 22 & README Verification

## Overview

Runnable verification guide to validate the Node 22 Dockerfile base images and documentation updates.

---

## Validation Steps

### Step 1: Verify Dockerfile Base Images

Check that `backend/Dockerfile` and `frontend/Dockerfile` use `node:22-alpine`:

```bash
grep "node:22-alpine" backend/Dockerfile && grep "node:22-alpine" frontend/Dockerfile && echo "Node 22 base images verified"
```

### Step 2: Test Node 22 Docker Builds

Verify that Docker images build cleanly on `node:22-alpine`:

```bash
docker build -t web-book-backend:node22 ./backend
docker build -t web-book-frontend:node22 ./frontend
```

### Step 3: Validate Documentation Files

Verify that Node 22 references and Docker sections exist in all README files:

```bash
grep -i "v22.x" README.md && grep -i "v22.x" backend/README.md && grep -i "v22.x" frontend/README.md && echo "Node 22 docs verified"
```

---

## References

- [Runtime & Docs Contracts](contracts/runtime-docs-contracts.md)
- [Data Model & Entities](data-model.md)
- [Phase 0 Research](research.md)
