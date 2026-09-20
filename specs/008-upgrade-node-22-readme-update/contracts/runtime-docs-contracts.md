# Interface Contract: Node 22 Runtime & Documentation Standards

## Contract Specification: Dockerfile Base Images

### `backend/Dockerfile`

```dockerfile
# Stage 1: Build stage
FROM node:22-alpine AS builder
...
# Stage 2: Production runner stage
FROM node:22-alpine AS runner
...
```

### `frontend/Dockerfile`

```dockerfile
# Stage 1: Dependencies stage
FROM node:22-alpine AS deps
...
# Stage 2: Builder stage
FROM node:22-alpine AS builder
...
# Stage 3: Production runner stage
FROM node:22-alpine AS runner
...
```

---

## Contract Specification: README Documentation Structure

### Root `README.md` Prerequisites Section

```markdown
### Prerequisites
- **Node.js**: `v22.x` or higher
- **npm**: `v10.x` or higher
- **Docker**: Docker Engine / Docker Desktop (for container deployment)
- **MongoDB**: Local MongoDB instance or Docker container
```

### Root `README.md` Docker Section

```markdown
## 🐳 Docker & Container Deployment

### Building & Running Backend Container
```bash
docker build -t web-book-backend ./backend
docker run -d -p 3001:3001 --name backend --env MONGODB_URI=mongodb://host.docker.internal:27017/user_crud_db web-book-backend
```

### Building & Running Frontend Container
```bash
docker build -t web-book-frontend ./frontend
docker run -d -p 3000:3000 --name frontend web-book-frontend
```
```
