# Tasks: README Documentation Updates for Tailwind CSS & Spec Kit Workflow

**Feature Branch**: `005-readme-documentation-update` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This document contains actionable, dependency-ordered tasks for updating project documentation files (`README.md`, `frontend/README.md`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Audit existing documentation structure and prepare markdown file targets.

- [x] T001 Audit root [README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/README.md) and [frontend/README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/README.md) for existing styling and workflow sections

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish documentation layout guidelines before updating individual sections.

- [x] T002 Verify markdown section headers and table of contents alignment across documentation files

**Checkpoint**: Foundation ready - documentation section updates can now proceed.

---

## Phase 3: User Story 1 - Comprehensive Tailwind CSS Documentation in README Files (Priority: P1) 🎯 MVP

**Goal**: Document Tailwind CSS 3.4+ configuration, custom glassmorphism utilities, dark theme variables, and animation keyframes in root `README.md` and `frontend/README.md`.

**Independent Test**: Review `README.md` and `frontend/README.md` to verify all Tailwind CSS setup options, custom CSS classes (`.glass-card`, `.glass-input`), and color guidelines are clearly documented.

### Implementation for User Story 1

- [x] T003 [P] [US1] Add a dedicated "🎨 Tailwind CSS Design System & Styling" section to root [README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/README.md) detailing Tailwind 3.4+ configuration, custom glassmorphism classes (`.glass-card`, `.glass-input`, `.glass-button-primary`), dark mode theme variables (`globals.css`), keyframe animations (`animate-fade-in`), and status badge color rules
- [x] T004 [P] [US1] Expand [frontend/README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/README.md) with detailed Tailwind CSS configuration file locations (`tailwind.config.js`, `postcss.config.js`), custom utilities usage, and component styling conventions

**Checkpoint**: User Story 1 fully documented and independently verifiable.

---

## Phase 4: User Story 2 - Complete Spec Kit Command Reference & `/speckit-specify` Integration (Priority: P2)

**Goal**: Update the Spec-Driven Development Workflow section in root `README.md` to explicitly include `/speckit-specify` in the workflow ASCII flowchart, step-by-step command guide, and slash command reference list.

**Independent Test**: Review the workflow section in root `README.md` to confirm `/speckit-specify` is highlighted as Step 2 with invocation syntax and expected outputs.

### Implementation for User Story 2

- [x] T005 [P] [US2] Update the Spec-Driven Development Workflow ASCII flowchart in root [README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/README.md) to include `/speckit-specify` as Step 2
- [x] T006 [P] [US2] Add `/speckit-specify` to the step-by-step command guide in root [README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/README.md) detailing its purpose (defining functional requirements, user stories P1/P2/P3, acceptance scenarios), example invocation syntax, and generated file outputs (`spec.md` & `checklists/requirements.md`)
- [x] T007 [P] [US2] Update the optional enhancement tools list and slash command reference table in root [README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/README.md) to explicitly describe `/speckit-specify`

**Checkpoint**: User Stories 1 and 2 complete and independently verifiable.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Documentation linting, link verification, and unit test execution across sub-projects.

- [x] T008 Verify markdown linting, link validity, and badge rendering across [README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/README.md), [frontend/README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/README.md), and [backend/README.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/backend/README.md)
- [x] T009 Execute quickstart validation guide in [specs/005-readme-documentation-update/quickstart.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/specs/005-readme-documentation-update/quickstart.md) and run frontend (`npm run test:cov`) and backend (`npm run test:cov`) test suites to confirm zero regressions
