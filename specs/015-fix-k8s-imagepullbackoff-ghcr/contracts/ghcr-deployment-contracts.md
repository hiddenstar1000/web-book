# GHCR Deployment Contract Specifications

**Feature**: `specs/015-fix-k8s-imagepullbackoff-ghcr`

---

## 1. Dev Backend Deployment Contract Spec (`k8s/dev/backend-deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-book-backend
  labels:
    app: web-book-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-book-backend
  template:
    metadata:
      labels:
        app: web-book-backend
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
        - name: backend
          image: ghcr.io/hiddenstar1000/web-book-backend:dev
          imagePullPolicy: Always
          ports:
            - containerPort: 3001
              name: http
```

---

## 2. Dev Frontend Deployment Contract Spec (`k8s/dev/frontend-deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-book-frontend
  labels:
    app: web-book-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-book-frontend
  template:
    metadata:
      labels:
        app: web-book-frontend
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
        - name: frontend
          image: ghcr.io/hiddenstar1000/web-book-frontend:dev
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
              name: http
```

---

## 3. Prod Backend Deployment Contract Spec (`k8s/prod/backend-deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-book-backend
  labels:
    app: web-book-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-book-backend
  template:
    metadata:
      labels:
        app: web-book-backend
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
        - name: backend
          image: ghcr.io/hiddenstar1000/web-book-backend:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3001
              name: http
```

---

## 4. Prod Frontend Deployment Contract Spec (`k8s/prod/frontend-deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-book-frontend
  labels:
    app: web-book-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-book-frontend
  template:
    metadata:
      labels:
        app: web-book-frontend
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
        - name: frontend
          image: ghcr.io/hiddenstar1000/web-book-frontend:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
              name: http
```
