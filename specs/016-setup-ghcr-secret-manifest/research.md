# Research & Technical Decisions: Set Up Declarative GHCR Secret Manifests & Example Templates

**Feature**: `specs/016-setup-ghcr-secret-manifest`

---

## 1. Kubernetes Secret Resource Type & Format

### Decision: `kubernetes.io/dockerconfigjson` with `stringData` Template

**Rationale**:
Kubernetes natively parses `type: kubernetes.io/dockerconfigjson` when referenced in pod `imagePullSecrets: [{ name: ghcr-secret }]`. By leveraging `stringData` in `ghcr-secret-example.yaml`, developers can edit text JSON directly in `ghcr-secret.yaml` without needing to manually generate base64 strings beforehand.

**Alternatives Considered**:
- *Manual `kubectl create secret docker-registry` only*: Imperative command requiring terminal execution on every cluster bootstrap without a declarative template file.
- *Base64 `data` key*: Harder for developers to visually review or safely edit without manual base64 encoding/decoding errors.

---

## 2. Version Control Exclusion Rules

### Decision: Pattern-based `.gitignore` Exclusion

**Rationale**:
`ghcr-secret-example.yaml` is tracked in git as a template, while actual credential files (`ghcr-secret.yaml`) in `k8s/dev/` and `k8s/prod/` are explicitly ignored via `.gitignore` to prevent credential leaks.

**Rules**:
```gitignore
# Kubernetes secret files
k8s/backend-secret.yaml
k8s/dev/backend-secret.yaml
k8s/prod/backend-secret.yaml
!k8s/backend-secret-example.yaml
!k8s/dev/backend-secret-example.yaml
!k8s/prod/backend-secret-example.yaml

k8s/ghcr-secret.yaml
k8s/dev/ghcr-secret.yaml
k8s/prod/ghcr-secret.yaml
!k8s/ghcr-secret-example.yaml
!k8s/dev/ghcr-secret-example.yaml
!k8s/prod/ghcr-secret-example.yaml
```

---

## 3. Documentation Alignment

### Decision: Declarative & Imperative Workflow Support

**Rationale**:
Provide clear documentation in `README.md` and `k8s/README.md` showing how to instantiate `ghcr-secret` either declaratively (`cp k8s/dev/ghcr-secret-example.yaml k8s/dev/ghcr-secret.yaml && kubectl apply -f k8s/dev/ghcr-secret.yaml -n app-web-book-dev`) or imperatively via `kubectl create secret docker-registry`.
