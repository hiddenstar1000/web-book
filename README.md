# User CRUD Management System

[![NestJS](https://img.shields.io/badge/Backend-NestJS_10-E0234E?logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-000000?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Testing-Jest_Coverage_%3E90%25-C21325?logo=jest)](https://jestjs.io/)
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
│   └── 002-project-documentation/
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
