# Tasks: Professional Tailwind CSS UI Styling

**Feature Branch**: `004-professional-tailwind-styling` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This document contains actionable, dependency-ordered tasks for implementing professional Tailwind CSS styling across the frontend web application (`frontend/`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify Tailwind CSS configuration and establish global styling rules, keyframes, and theme variables.

- [x] T001 Verify Tailwind CSS 3.4+ configuration in [frontend/tailwind.config.js](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/tailwind.config.js) and [frontend/postcss.config.js](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/postcss.config.js)
- [x] T002 [P] Configure custom CSS keyframe animations, glassmorphism utility rules, and dark theme variables in [frontend/src/app/globals.css](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/app/globals.css)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Base layout structure and test baseline verification before component refactoring.

**⚠️ CRITICAL**: Verify baseline unit test coverage before modifying presentational components.

- [x] T003 Update root layout dark mode class, viewport background, and typography baseline in [frontend/src/app/layout.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/app/layout.tsx)
- [x] T004 Run baseline frontend unit test suite in `frontend/` (`npm run test:cov`) to verify initial test state

**Checkpoint**: Foundation ready - component styling refactoring can now proceed.

---

## Phase 3: User Story 1 - Premium Dark Mode Dashboard & Layout (Priority: P1) 🎯 MVP

**Goal**: Transform the main dashboard layout into a rich dark-mode interface with slate/indigo gradients, metallic title text, glassmorphic card containers, letter avatar bubbles, color-coded role badges, and pulsating status dots.

**Independent Test**: Navigate to `/users`, verify slate background (`bg-slate-950`), metallic title gradient text, glass table overlay, status dots, and ensure unit tests pass.

### Implementation for User Story 1

- [x] T005 [P] [US1] Update [frontend/src/app/users/page.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/app/users/page.tsx) with deep slate background (`bg-slate-950`), metallic header gradient (`from-slate-100 via-slate-300 to-indigo-400`), action button glow effects, and responsive padding
- [x] T006 [P] [US1] Refactor [frontend/src/components/UserTable.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/components/UserTable.tsx) to render elevated glassmorphic table container (`bg-slate-900/40 border border-slate-800 backdrop-blur-md`), initial letter avatar bubbles, color-coded role badges (`ADMIN`, `USER`, `GUEST`), and pulsating status dots (`ACTIVE`, `INACTIVE`), preserving all `data-testid` attributes
- [x] T007 [US1] Run frontend unit tests in `frontend/` (`npm run test`) to verify User Story 1 styling updates maintain component contracts and test suite integrity

**Checkpoint**: User Story 1 fully styled and independently functional.

---

## Phase 4: User Story 2 - Polished Form Modals and Inputs (Priority: P2)

**Goal**: Creation, edit, and deletion modals with backdrop blur overlays, slate card depth, indigo focus rings, clear error alerts, and keyframe fade-in entry animations.

**Independent Test**: Open "Add New User" and "Edit" modals to test input focus rings, backdrop overlays, error alert banners, and delete confirmation warning modal.

### Implementation for User Story 2

- [x] T008 [P] [US2] Refactor [frontend/src/components/UserFormModal.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/components/UserFormModal.tsx) to apply backdrop blur overlay (`backdrop-blur-md`), elevated slate modal card (`bg-slate-900 border border-slate-800`), styled form controls with focus ring glows (`focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`), and styled error alert banners, preserving all `data-testid` attributes
- [x] T009 [P] [US2] Refactor [frontend/src/components/DeleteConfirmModal.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/components/DeleteConfirmModal.tsx) to render styled red alert warning modal dialog (`border-rose-900/50 bg-slate-900`), warning icon, and rose action buttons with hover animations, preserving all `data-testid` attributes
- [x] T010 [US2] Run frontend unit tests in `frontend/` (`npm run test`) to verify User Story 2 modal component tests pass

**Checkpoint**: User Stories 1 and 2 are independently functional and fully styled.

---

## Phase 5: User Story 3 - Interactive Search & Filter Toolbar (Priority: P3)

**Goal**: Integrated toolbar container with styled search input, magnifying glass icon, dropdown selects, active filter badge, and animated "Reset Filters" pill button.

**Independent Test**: Interact with search bar and filter selects, verify hover state transitions on reset pill button and instant directory filter updates.

### Implementation for User Story 3

- [x] T011 [P] [US3] Refactor [frontend/src/components/UserSearchFilter.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/components/UserSearchFilter.tsx) to implement integrated glassmorphic toolbar container (`bg-slate-900/60 border border-slate-800 rounded-2xl`), styled search input with magnifying glass icon, styled dropdown select controls, active filter count badge, and animated "Reset Filters" pill button (`hover:scale-105 transition-all`), preserving all `data-testid` attributes
- [x] T012 [US3] Run frontend unit tests in `frontend/` (`npm run test`) to verify User Story 3 toolbar component tests pass

**Checkpoint**: All user stories complete and independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Layout responsiveness, accessibility verification, and test coverage validation across sub-projects.

- [x] T013 Verify responsive layout adaptability across mobile, tablet, and desktop viewports in [frontend/src/app/users/page.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/app/users/page.tsx) and [frontend/src/components/UserTable.tsx](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/frontend/src/components/UserTable.tsx)
- [x] T014 Execute full unit test suite with coverage report (`npm run test:cov`) in `frontend/` to ensure constitution coverage threshold (>90%) is met
- [x] T015 Run quickstart visual and automated verification guide in [specs/004-professional-tailwind-styling/quickstart.md](file:///Users/dixon/Projects/Personal/Dixon%20AI/web-book/specs/004-professional-tailwind-styling/quickstart.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user story refactoring
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
  - Can proceed sequentially in priority order (US1 → US2 → US3) or in parallel
- **Polish (Phase 6)**: Depends on completion of all user story styling tasks

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational (Phase 2). No dependencies on US2/US3.
- **User Story 2 (P2)**: Starts after Foundational (Phase 2). Independent of US1/US3.
- **User Story 3 (P3)**: Starts after Foundational (Phase 2). Independent of US1/US2.

### Parallel Opportunities

- T001 and T002 can run in parallel during Setup.
- T005 (`UsersPage`) and T006 (`UserTable`) can run in parallel during US1.
- T008 (`UserFormModal`) and T009 (`DeleteConfirmModal`) can run in parallel during US2.
- After Foundational phase, US1, US2, and US3 component refactorings can proceed in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup & Phase 2: Foundational.
2. Complete Phase 3: User Story 1 (Dashboard Layout & Table Styling).
3. **Validate**: Test User Story 1 independently via web browser and unit test suite.

### Incremental Delivery

1. Complete Setup + Foundational -> Foundation ready.
2. Complete US1 -> Dark mode dashboard & table live (MVP).
3. Complete US2 -> Form and deletion modals styled.
4. Complete US3 -> Search & filter toolbar styled.
5. Complete Polish -> Final test coverage verification (>90%).
