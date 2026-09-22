# Kubernetes Declarative Contract Specification: Environment Secret Manifests

**Feature**: `specs/016-setup-ghcr-secret-manifest`

---

## 1. Development Consolidated Secret Template (`k8s/dev/secret-example.yaml`)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: web-book-backend-secret
  namespace: app-web-book-dev
  labels:
    app: web-book-backend
type: Opaque
stringData:
  MONGODB_URI: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/web-book-dev"
---
apiVersion: v1
kind: Secret
metadata:
  name: ghcr-secret
  namespace: app-web-book-dev
  labels:
    app: web-book
type: kubernetes.io/dockerconfigjson
stringData:
  .dockerconfigjson: |
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

---

## 2. Production Consolidated Secret Template (`k8s/prod/secret-example.yaml`)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: web-book-backend-secret
  namespace: app-web-book-prod
  labels:
    app: web-book-backend
type: Opaque
stringData:
  MONGODB_URI: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/web-book-prod"
---
apiVersion: v1
kind: Secret
metadata:
  name: ghcr-secret
  namespace: app-web-book-prod
  labels:
    app: web-book
type: kubernetes.io/dockerconfigjson
stringData:
  .dockerconfigjson: |
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

---

## 3. Gitignore Contract Rules (`.gitignore`)

```gitignore
# Kubernetes secret files
k8s/secret.yaml
k8s/dev/secret.yaml
k8s/prod/secret.yaml
!k8s/secret-example.yaml
!k8s/dev/secret-example.yaml
!k8s/prod/secret-example.yaml
```
