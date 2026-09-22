# Data Model & Schema Specification: Set Up Declarative GHCR Secret Manifests & Example Templates

**Feature**: `specs/016-setup-ghcr-secret-manifest`

---

## Entities & Schemas

### 1. GHCR Secret Template (`ghcr-secret-example.yaml`)

- **Resource Kind**: `Secret` (`apiVersion: v1`)
- **Metadata**:
  - `name`: `ghcr-secret`
  - `labels`: `app: web-book`
- **Secret Type**: `kubernetes.io/dockerconfigjson`
- **Data Key**: `stringData.dockerconfigjson`
- **JSON Structure**:
  ```json
  {
    "auths": {
      "ghcr.io": {
        "username": "<GITHUB_USER>",
        "password": "<GITHUB_PAT>",
        "email": "<GITHUB_EMAIL>",
        "auth": "<BASE64_USER_COLON_PAT>"
      }
    }
  }
  ```

### 2. Gitignore Exclusions (`.gitignore`)

- **Tracked Template Pattern**: `!k8s/*/ghcr-secret-example.yaml`
- **Ignored Secret Pattern**: `k8s/*/ghcr-secret.yaml`
