# Phase 1 Data Model: Workflow Pipeline Entities & Configuration

## Overview

Entities and data definitions representing the GitHub Actions workflow environment, container build contexts, and deployment specifications for `web-book`.

---

## Entities

### 1. Release Pipeline Environment (`WorkflowRun`)

| Attribute | Type | Description / Validation |
| :--- | :--- | :--- |
| `trigger_branch` | String | Git branch triggering the run (`main` or `dev`). |
| `environment_name` | String | Target GitHub Environment (`DEV` if `github.ref_name == 'dev'`, else `PROD`). |
| `image_tag` | String | Container tag (`dev` for `dev` branch, `latest` for `main` branch). |
| `concurrency_group` | String | Ensures sequential execution per environment. |

---

### 2. Container Build & Registry Specs (`ContainerArtifact`)

#### Backend Container Image

- **Component**: NestJS REST API Server
- **Build Context**: `./backend`
- **Registry Target**: `ghcr.io/${{ secrets.GH_USER }}/web-book-backend:${{ env.IMAGE_TAG }}`
- **Permissions**: `packages: write`

#### Frontend Container Image

- **Component**: Next.js App Router Web UI
- **Build Context**: `./frontend`
- **Registry Target**: `ghcr.io/${{ secrets.GH_USER }}/web-book-frontend:${{ env.IMAGE_TAG }}`
- **Permissions**: `packages: write`

---

### 3. Remote SSH Deployment Contract (`DeploymentTarget`)

| Target Environment | Namespace | Workload Deployments | SSH Script Commands |
| :--- | :--- | :--- | :--- |
| **DEV** (`dev` branch) | `app-em-dev` | `web-book-backend`, `web-book-frontend` | `microk8s kubectl rollout restart deployment/web-book-backend -n app-em-dev`<br>`microk8s kubectl rollout restart deployment/web-book-frontend -n app-em-dev` |
| **PROD** (`main` branch) | `app-em-prod` | `web-book-backend`, `web-book-frontend` | `microk8s kubectl rollout restart deployment/web-book-backend -n app-em-prod`<br>`microk8s kubectl rollout restart deployment/web-book-frontend -n app-em-prod` |
