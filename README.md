# User CRUD Management System

[![NestJS](https://img.shields.io/badge/Backend-NestJS_10-E0234E?logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-000000?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Testing-Jest_Coverage_%3E90%25-C21325?logo=jest)](https://jestjs.io/)
[![Spec Kit](https://img.shields.io/badge/Workflow-Spec--Driven_Development-blueviolet)](https://github.com/github/spec-kit)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A decoupled, modern full-stack User Directory Management application built with a **NestJS REST API** backend, **Next.js 14+ (App Router)** frontend, and **MongoDB** persistence. Enforces **>90% unit test coverage** across both backend and frontend per project constitution rules.

---

## 🏗️ Architecture Overview

```
                      ┌─────────────────────────────────┐
                      │  Next.js App Router UI (3000)   │
                      │  React 18 + Tailwind CSS        │
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
│   │   ├── app/              # App Router pages (/users, /)
│   │   ├── components/       # UserTable, UserFormModal, UserSearchFilter, DeleteConfirmModal
│   │   ├── lib/api/          # API client fetch wrapper & users service calls
│   │   └── types/            # TypeScript User entity interfaces
│   ├── package.json
│   └── jest.config.js        # Frontend Jest config (>90% coverage threshold)
│
├── specs/                    # Spec-driven development feature specifications
│   ├── 001-user-crud-management/
│   ├── 002-project-documentation/
│   └── 003-speckit-development-workflow/
│
└── .specify/                 # Spec Kit governance & memory configuration
    └── memory/
        └── constitution.md   # Project Constitution (>90% test coverage mandate)
```

---

## ✨ Features

- **Full User CRUD Operations**: Create new users, view paginated listing, update profiles, and delete records with modal confirmation.
- **Search & Filter Capabilities**: Real-time text search (name and email regex match), filter by Role (`ADMIN`, `USER`, `GUEST`), and Status (`ACTIVE`, `INACTIVE`).
- **Data Validation & Integrity**: Server-side DTO validation (`class-validator`) and client-side real-time form checks.
- **Duplicate Email Prevention**: Unique MongoDB email index with handled HTTP `409 Conflict` responses.
- **Constitution-Compliant Test Coverage**: Independent Jest test suites in both `backend/` and `frontend/` exceeding 90% statement/line coverage.

---

## ⚡ Quickstart Guide

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
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

## 🛠️ Spec-Driven Development Workflow (GitHub Spec Kit)

This repository follows **Spec-Driven Development** using **GitHub Spec Kit** (`speckit`). All new features, refactoring, and major updates follow a structured phase lifecycle:

```
  ┌───────────────────────┐
  │ /speckit-constitution │ ──▶ Establish or amend project principles & quality rules
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │   /speckit-specify    │ ──▶ Create user journeys, requirements, & success criteria
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
Defines the functional requirements, prioritized user stories (P1, P2, P3), acceptance criteria (Given-When-Then), and edge cases in plain language without low-level implementation details.
```text
/speckit-specify Add user profile avatar upload functionality using AWS S3
```
*Output*: `specs/<NNN-feature-name>/spec.md` & `checklists/requirements.md`

#### 3. Create Implementation Plan & Design Artifacts (`/speckit-plan`)
Resolves technical choices, extracts entities, and generates OpenAPI contracts, data model schemas, and quickstart verification guides.
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

### Optional Quality & Enhancement Commands

- **/speckit-clarify**: Ask structured clarification questions to de-risk ambiguous requirements before planning.
- **/speckit-analyze**: Run cross-artifact consistency analysis across `spec.md`, `plan.md`, and `tasks.md`.
- **/speckit-checklist**: Generate custom quality checklists for specific features.

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
