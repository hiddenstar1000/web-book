# Interface Contract: Backend & Frontend Production Dockerfiles

## Contract Specification: `backend/Dockerfile`

```dockerfile
# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies including devDependencies for build
RUN npm ci

# Copy backend source code
COPY . .

# Build NestJS TypeScript code to dist/
RUN npm run build

# Stage 2: Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built dist directory from builder stage
COPY --from=builder /app/dist ./dist

# Use non-root user
USER node

EXPOSE 3001

CMD ["node", "dist/main.js"]
```

---

## Contract Specification: `frontend/Dockerfile`

```dockerfile
# Stage 1: Dependencies stage
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Stage 2: Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy dependencies and build output
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

USER node

EXPOSE 3000

CMD ["npm", "start"]
```
