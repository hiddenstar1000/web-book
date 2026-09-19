# Research: User CRUD Management Architecture & Testing Strategy

## Executive Summary
This document captures research and architectural decisions for building a decoupled User CRUD web application using NestJS (backend REST API), NextJS (frontend UI), MongoDB (database), and Jest (test suites enforcing >90% coverage per project constitution).

---

## 1. Backend Architecture (NestJS + MongoDB / Mongoose)

### Decision
Use **NestJS 10** with `@nestjs/mongoose` and `mongoose` ODM, structured into modular feature components (`UsersModule`, `UsersController`, `UsersService`, `UserSchema`).

### Rationale
- **NestJS**: Provides built-in dependency injection, modular architecture, robust validation pipes (`class-validator`, `class-transformer`), and native TypeScript support.
- **Mongoose / `@nestjs/mongoose`**: Simplifies MongoDB schema definition, indexing (e.g. unique email index), and async document operations with type safety.
- **Controller/Service Layer Separation**: Facilitates unit testing services independently from HTTP controllers using NestJS Testing Utilities (`Test.createTestingModule`).

### Alternatives Considered
- **TypeORM / Prisma with MongoDB**: Prisma MongoDB support has limitations with certain index options and raw MongoDB features; Mongoose is the industry standard for NestJS + MongoDB integrations.
- **Direct MongoDB Node Driver**: Lacks schema validation and requires verbose boilerplate code compared to Mongoose.

---

## 2. Frontend Architecture (Next.js App Router + Component State)

### Decision
Use **Next.js 14+** (App Router) with React Client Components for interactive UI forms/modals, modular CSS / Tailwind for responsive styling, and a clean API Client service wrapper using standard `fetch` / `axios`.

### Rationale
- **Next.js App Router**: Provides modern layout routing, server-rendered page scaffolding, and seamless integration for client-side interactive tables and dialogs.
- **Decoupled API Client Service**: Abstracting HTTP calls into `lib/api/users.ts` allows mocking the API layer easily during Jest UI component unit tests.

### Alternatives Considered
- **Single Page Application (Vite + React)**: Next.js provides superior route organization, SSR capabilities, and built-in optimization.

---

## 3. High Test Coverage Strategy (>90% Mandate)

### Decision
Configure **Jest** independently in both `backend/` and `frontend/` with explicit coverage threshold enforcement (`90%` lines, statements, functions, and branches).

### NestJS API Unit Testing (`backend`)
- **Controllers**: Unit test HTTP route handlers by mocking `UsersService`.
- **Services**: Unit test business logic, email uniqueness checks, and error exceptions by mocking the Mongoose `UserModel` (`getModelToken`).
- **DTOs & Validation Pipes**: Test DTO validation using `ValidationPipe`.

### Next.js UI Unit Testing (`frontend`)
- **React Testing Library (`@testing-library/react`) + Jest**: Test UI components in isolation (UserTable, UserFormModal, DeleteConfirmDialog, UserSearchFilter).
- **API Mocking**: Mock API client methods (`lib/api/users.ts`) to test loading states, success notifications, error alerts, and form validation states without live backend dependencies.

---

## 4. Summary of Tech Stack Choices

| Domain | Technology | Version | Purpose |
|--------|------------|---------|---------|
| Backend Framework | NestJS | ^10.0.0 | Modular REST API server |
| Database | MongoDB | ^6.0 / ^7.0 | Document persistence |
| ODM | Mongoose / `@nestjs/mongoose` | ^10.0.0 | MongoDB schema & model management |
| Frontend Framework | Next.js | ^14.0.0 | Web user interface |
| Testing Runner | Jest | ^29.0.0 | Unit test execution |
| UI Testing Library | React Testing Library | ^14.0.0 | Component rendering & interaction tests |
| Validation | Class Validator / Transformer | ^0.14.0 | Server-side DTO validation |
