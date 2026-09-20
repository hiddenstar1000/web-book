# Phase 1 Data Model: Workflow Action Upgrades

## Overview

Data model mapping current and target major versions for all GitHub Actions used in `.github/workflows/publish-ghcr.yaml`.

---

## Action Version Mapping Entity (`WorkflowActionUpgrade`)

| Action Name | Current Version | Upgraded Version | Target Runner Runtime |
| :--- | :--- | :--- | :--- |
| Checkout Repository | `actions/checkout@v4` | `actions/checkout@v5` | Node.js 24 |
| GHCR Login | `docker/login-action@v3` | `docker/login-action@v4` | Node.js 24 |
| Build & Push Backend Image | `docker/build-push-action@v6` | `docker/build-push-action@v7` | Node.js 24 |
| Build & Push Frontend Image | `docker/build-push-action@v6` | `docker/build-push-action@v7` | Node.js 24 |
| Remote SSH Deployment | `appleboy/ssh-action@v1.0.3` | `appleboy/ssh-action@v1.2.0` | Node.js 24 |
