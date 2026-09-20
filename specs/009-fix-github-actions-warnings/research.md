# Phase 0 Research: GitHub Actions Node.js 20 Deprecation Warning Fix

## Executive Summary

Research findings and version upgrade specifications to resolve the Node 20 runner deprecation warning emitted during `.github/workflows/publish-ghcr.yaml` execution.

---

## Technical Decisions & Rationale

### 1. Action Version Upgrades for Native Node 24 Runner Support

- **Decision**: Update action versions in `.github/workflows/publish-ghcr.yaml` as follows:
  - `actions/checkout@v4` -> `actions/checkout@v5`
  - `docker/login-action@v3` -> `docker/login-action@v4`
  - `docker/build-push-action@v6` -> `docker/build-push-action@v7`
  - `appleboy/ssh-action@v1.0.3` -> `appleboy/ssh-action@v1.2.0`
- **Rationale**: GitHub Actions runners enforce Node.js 24 runtime execution. Older action major versions compiled against Node 20 trigger fallback warnings. Upgrading to native Node 24 action releases eliminates deprecation warnings and prevents future runner failures.
- **Alternatives Considered**:
  - *Setting `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` without upgrading*: Rejected because it only forces legacy actions onto Node 24 without updating underlying action dependencies.

### 2. Parameter Compatibility

- **Decision**: Retain existing step input parameters (`context: ./backend`, `tags: ...`, `username`, `password`, `registry`).
- **Rationale**: Inputs across `checkout@v5`, `login-action@v4`, `build-push-action@v7`, and `ssh-action@v1.2.0` maintain 100% backward compatibility.
