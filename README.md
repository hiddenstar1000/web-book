# User CRUD Management System

[![NestJS](https://img.shields.io/badge/Backend-NestJS_10-E0234E?logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-000000?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Testing-Jest_Coverage_%3E90%25-C21325?logo=jest)](https://jestjs.io/)
[![Spec Kit](https://img.shields.io/badge/Workflow-Spec--Driven_Development-blueviolet)](https://github.com/github/spec-kit)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A decoupled, modern full-stack User Directory Management application built with a **NestJS REST API** backend, **Next.js 14+ (App Router)** frontend, **Tailwind CSS** styling, and **MongoDB** persistence. Enforces **>90% unit test coverage** across both backend and frontend per project constitution rules.

---

## 🏗️ Architecture Overview

```
                      ┌─────────────────────────────────┐
                      │  Next.js App Router UI (3000)   │
                      │  React 18 + Tailwind CSS 3.4    │
                      └────────────────┬────────────────┘
                                       │ REST API (HTTP/JSON)
                                       ▼
                      ┌─────────────────────────────────┐
                      │    NestJS REST API (3001)       │
                      │    Modules, DTOs, Pipes        │
                      └────────────────┬────────────────┘
                                       │ Mongoose ODM
                                       ▼
                      ┌─────────────────────────────────┐
                      │       MongoDB Persistence       │
                      │  user_crud_db Collection        │
                      └─────────────────────────────────┘
```

---

## 📁 Repository Structure

```text
.
├── backend/                  # NestJS REST API Server
│   ├── src/
│   │   ├── common/filters/   # Global HTTP exception filters
│   │   ├── modules/users/    # User CRUD module (Schemas, DTOs, Controllers, Services)
│   │   ├── app.module.ts     # AppModule with Config & Mongoose setup
│   │   └── main.ts           # Server entrypoint with global validation pipes
│   ├── package.json
│   └── jest.config.js        # Backend Jest config (>90% coverage threshold)
│
├── frontend/                 # Next.js App Router Web UI
│   ├── src/
│   │   ├── app/              # App Router pages (/users, /), globals.css & layout.tsx
│   │   ├── components/       # UserTable, UserFormModal, UserSearchFilter, DeleteConfirmModal
│   │   ├── lib/api/          # API client fetch wrapper & users service calls
│   │   └── types/            # TypeScript User entity interfaces
│   ├── tailwind.config.js    # Tailwind CSS 3.4 theme & keyframes config
│   ├── postcss.config.js     # PostCSS Tailwind & Autoprefixer plugins
│   ├── package.json
│   └── jest.config.js        # Frontend Jest config (>90% coverage threshold)
│
├── specs/                    # Spec-driven development feature specifications
│   ├── 001-user-crud-management/
│   ├── 002-project-documentation/
│   ├── 003-speckit-development-workflow/
│   ├── 004-professional-tailwind-styling/
│   └── 005-readme-documentation-update/
│
└── .specify/                 # Spec Kit governance & memory configuration
    └── memory/
        └── constitution.md   # Project Constitution (>90% test coverage mandate)
```

---

## ✨ Features

- **Full User CRUD Operations**: Create new users, view paginated listing, update profiles, and delete records with modal confirmation.
- **Search & Filter Capabilities**: Real-time text search (name and email regex match), filter by Role (`ADMIN`, `USER`, `GUEST`), and Status (`ACTIVE`, `INACTIVE`).
- **Professional Tailwind CSS Interface**: Dark-mode palette (`slate-950`), elevated glassmorphic cards (`backdrop-blur-md`), glowing focus rings, pulsating status dots, and smooth keyframe entry animations.
- **Data Validation & Integrity**: Server-side DTO validation (`class-validator`) and client-side real-time form checks.
- **Duplicate Email Prevention**: Unique MongoDB email index with handled HTTP `409 Conflict` responses.
- **Constitution-Compliant Test Coverage**: Independent Jest test suites in both `backend/` and `frontend/` exceeding 90% statement/line coverage.

---

## 🎨 Tailwind CSS Design System & Styling

The frontend web interface (`frontend/`) utilizes **Tailwind CSS 3.4+** with custom theme extensions, utility classes, and dark-mode HSL color palettes.

### 1. Configuration & Directives
- **Config File**: [frontend/tailwind.config.js](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/tailwind.config.js)
- **PostCSS File**: [frontend/postcss.config.js](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/postcss.config.js)
- **Global Directives**: [frontend/src/app/globals.css](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #020617;
  --foreground: #f8fafc;
}
```

### 2. Custom Glassmorphism & Input Utilities
Common design tokens are defined in `globals.css` using `@layer utilities`:

| Utility Class | Purpose | Tailwind Tokens |
|---------------|---------|-----------------|
| `.glass-card` | Glassmorphic card overlays | `bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-2xl` |
| `.glass-input` | Accessible form controls | `bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500` |
| `.glass-button-primary` | Primary action button | `bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium shadow-lg shadow-indigo-600/25 active:scale-[0.98]` |
| `.animate-fade-in` | Keyframe modal entry animation | `animation: fadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards` |

### 3. Color Standards & Status Indicators
- **Main Background**: `bg-slate-950` with subtle ambient radial glow mesh overlays (`from-indigo-600/10` to `violet-600/10`).
- **Header Text**: Metallic gradient (`bg-gradient-to-r from-slate-100 via-slate-200 to-indigo-400 bg-clip-text text-transparent`).
- **Role Badges**:
  - `ADMIN`: `bg-amber-500/10 text-amber-400 border-amber-500/20`
  - `USER`: `bg-indigo-500/10 text-indigo-400 border-indigo-500/20`
  - `GUEST`: `bg-slate-500/10 text-slate-400 border-slate-500/20`
- **Status Badges**:
  - `ACTIVE`: `bg-emerald-500/10 text-emerald-400 border-emerald-500/20` with pulsating dot (`animate-pulse`).
  - `INACTIVE`: `bg-rose-500/10 text-rose-400 border-rose-500/20`.

---

## ⚡ Quickstart Guide

### Prerequisites
- **Node.js**: `v22.x` or higher
- **npm**: `v10.x` or higher
- **Docker**: Docker Engine / Docker Desktop (for container deployment)
- **MongoDB**: Local MongoDB instance running on `mongodb://localhost:27017/user_crud_db` or via Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

### Running the Backend REST API

```bash
cd backend

# Install dependencies
npm install

# Run NestJS dev server (Port 3001)
npm run start:dev
```
The REST API server runs at `http://localhost:3001/api/v1`.

---

### Running the Frontend Web UI

```bash
cd frontend

# Install dependencies
npm install

# Run Next.js dev server (Port 3000)
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🐳 Docker & Container Deployment

### 1. Multi-Stage Production Dockerfiles
The application includes multi-stage production `Dockerfile` configurations targeting `node:22-alpine` for minimal footprint (<300MB) and non-root execution (`USER node`):
- **Backend Dockerfile**: [`backend/Dockerfile`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/backend/Dockerfile) (Port 3001)
- **Frontend Dockerfile**: [`frontend/Dockerfile`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/Dockerfile) (Port 3000)

### 2. Building & Running Container Images Locally

#### Backend Container (Port 3001)
```bash
# Build backend image
docker build -t web-book-backend ./backend

# Run backend container with MongoDB connection
docker run -d -p 3001:3001 --name backend \
  -e MONGODB_URI="mongodb://host.docker.internal:27017/user_crud_db" \
  web-book-backend
```

#### Frontend Container (Port 3000)
```bash
# Build frontend image
docker build -t web-book-frontend ./frontend

# Run frontend container
docker run -d -p 3000:3000 --name frontend web-book-frontend
```

### 3. Kubernetes Deployment & Multi-Environment Namespaces
The repository includes declarative Kubernetes manifests separated by environment in [`k8s/dev/`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/k8s/dev) and [`k8s/prod/`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/k8s/prod):
- **Development Environment (`k8s/dev`)**: Targets namespace **`app-web-book-dev`** via [`k8s/dev/kustomization.yaml`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/k8s/dev/kustomization.yaml) mapped to domain **`spanish-story.dixonai.net`** with TLS secret `spanish-story-tls`.
- **Production Environment (`k8s/prod`)**: Targets namespace **`app-web-book-prod`** via [`k8s/prod/kustomization.yaml`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/k8s/prod/kustomization.yaml) mapped to domain **`tripitaka.dixonai.net`** with TLS secret `tripitaka-tls`.
- **ConfigMap & Secrets**: Store `PORT=3001` in `backend-configmap.yaml` and reference runtime secrets via `backend-secret-example.yaml` templates (`backend-secret.yaml` excluded from git).

#### Development Environment Deployment:
```bash
# 1. Create dev backend Secret independently
cp k8s/dev/backend-secret-example.yaml k8s/dev/backend-secret.yaml
# Edit MONGODB_URI in k8s/dev/backend-secret.yaml
kubectl apply -f k8s/dev/backend-secret.yaml -n app-web-book-dev

# 2. Deploy dev infrastructure stack (namespace app-web-book-dev)
kubectl apply -k k8s/dev/
```

#### Production Environment Deployment:
```bash
# 1. Create prod backend Secret independently
cp k8s/prod/backend-secret-example.yaml k8s/prod/backend-secret.yaml
# Edit MONGODB_URI in k8s/prod/backend-secret.yaml
kubectl apply -f k8s/prod/backend-secret.yaml -n app-web-book-prod

# 2. Deploy prod infrastructure stack (namespace app-web-book-prod)
kubectl apply -k k8s/prod/
```

### 4. CI/CD Release Pipeline (GitHub Actions & GHCR)
Automated container publishing and deployment is configured in [`.github/workflows/publish-ghcr.yaml`](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/.github/workflows/publish-ghcr.yaml):
- **Triggers**: Pushes to `main` and `dev` branches or manual `workflow_dispatch`.
- **GHCR Image Artifacts**:
  - `ghcr.io/${{ secrets.GH_USER }}/web-book-backend:${{ env.IMAGE_TAG }}`
  - `ghcr.io/${{ secrets.GH_USER }}/web-book-frontend:${{ env.IMAGE_TAG }}`
- **Automated Deployment**: SSH connection to remote host issuing MicroK8s Kustomize apply and rolling restarts targeting `app-web-book-dev` (DEV) or `app-web-book-prod` (PROD) namespaces.

---

## 🛠️ Spec-Driven Development Workflow (GitHub Spec Kit)

This repository follows **Spec-Driven Development** using **GitHub Spec Kit** (`speckit`). All new features, refactoring, and documentation updates follow a structured phase lifecycle:

```
  ┌───────────────────────┐
  │ /speckit-constitution │ ──▶ Establish or amend project principles & quality rules
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │   /speckit-specify    │ ──▶ Create user stories, requirements, & success criteria
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │    /speckit-plan      │ ──▶ Design technical contracts, schemas, & research decisions
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │    /speckit-tasks     │ ──▶ Generate dependency-ordered, testable task breakdown
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │   /speckit-implement  │ ──▶ Execute tasks, write code/tests, & verify >90% coverage
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │   /speckit-converge   │ ──▶ Assess implementation against spec & append remaining work
  └───────────────────────┘
```

---

### Step-by-Step Command Guide for Future Development

#### 1. Establish/Update Principles (`/speckit-constitution`)
Amends or establishes core project principles (e.g. test coverage requirements, API decoupling).
```text
/speckit-constitution Maintain a >90% unit test coverage for both API and UI
```
*Output*: [.specify/memory/constitution.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/.specify/memory/constitution.md)

#### 2. Create Feature Specification (`/speckit-specify`)
Creates the feature specification file (`spec.md`) and requirements quality checklist (`checklists/requirements.md`). Defines functional requirements, prioritized user stories (P1, P2, P3), acceptance criteria (Given-When-Then), and edge cases in plain language without low-level implementation details.
```text
/speckit-specify Update README.md on using tailwind-css and document speckit-specify
```
*Output*: `specs/<NNN-feature-name>/spec.md` & `specs/<NNN-feature-name>/checklists/requirements.md`

#### 3. Create Implementation Plan & Design Artifacts (`/speckit-plan`)
Resolves technical choices, extracts entities, and generates technical design plan, data model schemas, research decisions, and quickstart verification guides.
```text
/speckit-plan
```
*Output*: `specs/<NNN-feature-name>/plan.md`, `data-model.md`, `research.md`, `quickstart.md`, `contracts/`

#### 4. Generate Executable Task Breakdown (`/speckit-tasks`)
Generates an actionable, dependency-ordered task checklist grouped by user story (P1 MVP first).
```text
/speckit-tasks
```
*Output*: `specs/<NNN-feature-name>/tasks.md`

#### 5. Execute Implementation (`/speckit-implement`)
Executes tasks phase-by-phase, writing tests alongside code, and ensuring all quality gates pass.
```text
/speckit-implement
```
*Output*: Codebase updates & completed `tasks.md`

#### 6. Assess Codebase Convergence (`/speckit-converge`)
Audits current codebase against feature spec and tasks to detect missing requirements or unbuilt work.
```text
/speckit-converge
```

---

### Spec Kit Command Reference Table

| Slash Command | Stage / Phase | Description & Outputs |
|---------------|---------------|-----------------------|
| `/speckit-specify` | Specification | Creates feature directory, `spec.md`, and `checklists/requirements.md`. |
| `/speckit-constitution` | Governance | Defines or updates ratifiable project constitution & quality gates. |
| `/speckit-clarify` | Requirements | Asks up to 3 targeted clarification questions to resolve ambiguous spec items. |
| `/speckit-plan` | Technical Design | Creates `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`. |
| `/speckit-tasks` | Execution Planning | Creates dependency-ordered `tasks.md` checklist formatted by user story. |
| `/speckit-implement` | Implementation | Executes tasks in `tasks.md` phase-by-phase, running unit tests and updating checklist. |
| `/speckit-converge` | Audit & Delivery | Evaluates codebase completion against spec, plan, and tasks. |
| `/speckit-analyze` | Quality Control | Non-destructive cross-artifact consistency analysis across `spec.md`, `plan.md`, and `tasks.md`. |
| `/speckit-checklist` | Custom Review | Generates custom domain quality checklists (e.g. security, UX, performance). |

---

## 🧪 Unit Testing & Coverage Report

Per the project constitution mandate, both sub-projects enforce >90% coverage thresholds.

### Execute Backend Tests & Coverage
```bash
cd backend
npm run test:cov
```

### Execute Frontend Tests & Coverage
```bash
cd frontend
npm run test:cov
```

---

## 📑 Detailed Documentation

- 📘 [Backend API Documentation](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/backend/README.md)
- 🎨 [Frontend UI Documentation](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/README.md)
- 📜 [Project Constitution](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/.specify/memory/constitution.md)
