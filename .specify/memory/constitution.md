<!--
SYNC IMPACT REPORT
- Version: 0.0.0 -> 1.0.0
- Ratified: 2026-09-19
- Last Amended: 2026-09-19
- Modified Principles:
  - Initialized Core Principles:
    - I. Test Coverage Mandatory (>90%)
    - II. API & UI Separation of Concerns
    - III. Test-Driven & Continuous Verification
- Added Sections:
  - Core Principles
  - Quality Gates & Testing Standards
  - Development Workflow
  - Governance
- Removed Sections: None
- Deferred TODOs: None
-->

# web-book Constitution

## Core Principles

### I. Test Coverage Mandatory (>90%)
Unit test coverage MUST be maintained at greater than 90% for both API endpoints/services and UI components/views. Code changes, feature additions, or refactoring that drop unit test coverage below 90% MUST NOT be merged into the main codebase.

*Rationale*: High unit test coverage across both API and UI layers prevents regressions, ensures reliable contract enforcement, and enables rapid refactoring without breaking existing user flows.

### II. API & UI Separation of Concerns
API endpoints and UI rendering logic MUST be strictly decoupled. API endpoints MUST communicate via typed data contracts and JSON schemas, while UI components MUST be testable in isolation through mock data or isolated rendering environments.

*Rationale*: Clean separation ensures API and UI tests can execute independently, quickly, and deterministically without cross-layer side effects.

### III. Test-Driven & Continuous Verification
Unit tests MUST be written alongside or prior to feature implementation. Automated test runs MUST execute unit test suites for both API and UI on every pull request and commit, automatically validating that coverage thresholds are satisfied.

*Rationale*: Continuous automated testing prevents silent degradation of test suites and guarantees compliance with governance quality gates.

## Quality Gates & Testing Standards

### API Testing Standards
- Unit tests MUST validate business logic, error handling, input validation, and boundary conditions for all API routes and services.
- Mocking MUST be used for external third-party dependencies and database access to ensure fast unit test execution.

### UI Testing Standards
- UI component tests MUST cover state transitions, user interaction handlers, conditional rendering paths, and baseline accessibility standards.
- Tests MUST verify UI states independently of live backend services.

### Coverage Enforcement
- Code coverage reports MUST be automatically generated during test runs for both API and UI test suites.
- PR merge checks MUST fail if total line or branch coverage drops below 90% for either domain.

## Development Workflow

### Pull Request Governance
- All pull requests MUST include corresponding unit tests for new or modified functionality.
- Automated CI pipeline results demonstrating >90% coverage for API and UI MUST pass prior to code review approval.

### Review Expectations
- Reviewers MUST verify that test assertions are meaningful, deterministic, and free from fragile implementation coupling.

## Governance

- This constitution supersedes all informal development practices for `web-book`.
- Amendments to this constitution require formal review, documented rationale, and a semantic version update.
- **Versioning Policy**:
  - **MAJOR**: Backward-incompatible governance or principle removals/redefinitions.
  - **MINOR**: Addition of new principles, testing standards, or workflow sections.
  - **PATCH**: Non-semantic clarifications, formatting, or wording improvements.
- All code reviews and CI/CD quality gates MUST enforce compliance with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-09-19 | **Last Amended**: 2026-09-19
