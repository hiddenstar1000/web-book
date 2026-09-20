# Phase 1 Quickstart & Validation Guide: GHCR Workflow Alignment

## Overview

Runnable verification guide to validate the GitHub release workflow syntax, build context paths, and deployment configuration.

---

## Prerequisites

- Local git repository with `specs/006-publish-ghcr-workflow-update` branch active.
- Node.js and YAML linter or python/yq available locally to validate syntax.

---

## Validation Steps

### Step 1: Validate Workflow YAML Syntax

Run YAML syntax validation on the modified workflow file:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/publish-ghcr.yaml'))" && echo "YAML Syntax Valid"
```

### Step 2: Verify Build Context Directories Exist

Confirm backend and frontend build directories match the workflow contexts:

```bash
test -d ./backend && test -d ./frontend && echo "Build context paths verified"
```

### Step 3: Validate Removal of Java/Maven Legacy Step

Verify that no Java or Maven commands remain in `.github/workflows/publish-ghcr.yaml`:

```bash
! grep -i "maven" .github/workflows/publish-ghcr.yaml && ! grep -i "setup-java" .github/workflows/publish-ghcr.yaml && echo "Legacy steps verified removed"
```

### Step 4: Verify Image Tags and MicroK8s Deployment Targets

Check that workflow correctly targets `web-book-backend` and `web-book-frontend`:

```bash
grep "web-book-backend" .github/workflows/publish-ghcr.yaml && grep "web-book-frontend" .github/workflows/publish-ghcr.yaml && echo "Deployment targets verified"
```

---

## References

- [Workflow Contract](contracts/workflow-contract.md)
- [Data Model & Entities](data-model.md)
- [Phase 0 Research](research.md)
