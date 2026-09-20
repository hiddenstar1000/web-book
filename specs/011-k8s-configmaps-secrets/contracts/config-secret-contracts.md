# Interface Contract: ConfigMap, Secret & Deployment Specs

## Contract Specification: `k8s/backend-configmap.yaml`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: web-book-backend-config
  labels:
    app: web-book-backend
data:
  PORT: "3001"
```

---

## Contract Specification: `k8s/backend-secret-example.yaml`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: web-book-backend-secret
  labels:
    app: web-book-backend
type: Opaque
stringData:
  MONGODB_URI: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/web-book"
```

---

## Contract Specification: `k8s/backend-secret.yaml`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: web-book-backend-secret
  labels:
    app: web-book-backend
type: Opaque
stringData:
  MONGODB_URI: "mongodb+srv://dixongunasekara_db_user:DsCzipNtUwzHryWZ@cluster0.nmbmlbt.mongodb.net/web-book"
```

---

## Contract Specification: `k8s/backend-deployment.yaml` Environment Section

```yaml
          env:
            - name: PORT
              valueFrom:
                configMapKeyRef:
                  name: web-book-backend-config
                  key: PORT
            - name: MONGODB_URI
              valueFrom:
                secretKeyRef:
                  name: web-book-backend-secret
                  key: MONGODB_URI
```

---

## Contract Specification: `k8s/kustomization.yaml`

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - backend-deployment.yaml
  - frontend-deployment.yaml
  - backend-service.yaml
  - frontend-service.yaml
  - ingress.yaml
  - backend-configmap.yaml
```
