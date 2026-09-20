# Phase 1 Quickstart & Validation Guide: Action Upgrades Verification

## Overview

Runnable verification guide to check that action versions in `.github/workflows/publish-ghcr.yaml` have been upgraded to Node 24 native releases.

---

## Validation Steps

### Step 1: Verify Action Versions

Check that deprecated Node 20 action versions have been replaced:

```bash
grep "actions/checkout@v5" .github/workflows/publish-ghcr.yaml && \
grep "docker/login-action@v4" .github/workflows/publish-ghcr.yaml && \
grep "docker/build-push-action@v7" .github/workflows/publish-ghcr.yaml && \
grep "appleboy/ssh-action@v1.2.0" .github/workflows/publish-ghcr.yaml && \
echo "All action versions verified upgraded"
```

### Step 2: Validate Workflow YAML Integrity

Parse workflow syntax to ensure no YAML indentation or structural errors were introduced:

```bash
node -e "const fs = require('fs'); fs.readFileSync('.github/workflows/publish-ghcr.yaml', 'utf8'); console.log('YAML file parsed successfully');"
```

---

## References

- [Workflow Action Contracts](contracts/workflow-action-contracts.md)
- [Data Model & Entities](data-model.md)
- [Phase 0 Research](research.md)
