# Implementation Plan: GitHub Actions Node.js 20 Deprecation Warning Fix

**Branch**: `009-fix-github-actions-warnings` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [`specs/009-fix-github-actions-warnings/spec.md`](spec.md)

## Summary

Upgrade action major versions in `.github/workflows/publish-ghcr.yaml` from legacy Node 20 releases to current Node 24 native releases (`actions/checkout@v5`, `docker/login-action@v4`, `docker/build-push-action@v7`, `appleboy/ssh-action@v1.2.0`). This eliminates runner deprecation warnings and prevents workflow execution failures when GitHub Actions runners phase out Node 20 support.

## Technical Context

**Language/Version**: YAML (GitHub Actions DSL)
**Primary Dependencies**: `actions/checkout@v5`, `docker/login-action@v4`, `docker/build-push-action@v7`, `appleboy/ssh-action@v1.2.0`
**Storage**: N/A
**Testing**: Workflow action version greps, YAML parser checks
**Target Platform**: GitHub Actions CI/CD runners (ubuntu-latest running Node.js 24 execution engine)
**Project Type**: CI/CD Release & Deployment Workflow
**Performance Goals**: Clean, warning-free pipeline execution under 5 minutes
**Constraints**: Zero changes to step execution logic, secrets handling, or deployment script commands
**Scale/Scope**: 1 file (`.github/workflows/publish-ghcr.yaml`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Compliance Status | Rationale |
| :--- | :--- | :--- |
| **I. Test Coverage Mandatory (>90%)** | **PASS** | Upgrading workflow action versions does not modify application code in `backend/` or `frontend/`. Test coverage (>90%) is unaffected. |
| **II. API & UI Separation of Concerns** | **PASS** | Maintains separate Docker build steps for backend API and frontend Web UI. |
| **III. Test-Driven & Continuous Verification** | **PASS** | Continuous integration pipeline executes reliably without action runtime deprecation warnings. |

## Project Structure

### Documentation (this feature)

```text
specs/009-fix-github-actions-warnings/
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research & decision log
├── data-model.md        # Phase 1 entities & action mapping
├── quickstart.md        # Phase 1 verification & validation guide
└── contracts/
    └── workflow-action-contracts.md # Phase 1 contracts
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── publish-ghcr.yaml   # [MODIFY] Upgrade action major versions to Node 24 native releases
```

**Structure Decision**: Option 2 (Web application with `backend/` and `frontend/`). Updates apply to root workflow configuration.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | N/A | No constitution principles violated. |
