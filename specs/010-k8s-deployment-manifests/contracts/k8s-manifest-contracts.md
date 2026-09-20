# Interface Contract: Kubernetes Manifest Specifications

## Contract Specification: `k8s/backend-deployment.yaml`

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
      containers:
        - name: backend
          image: web-book-backend:latest
          ports:
            - containerPort: 3001
          env:
            - name: PORT
              value: "3001"
            - name: MONGODB_URI
              value: "mongodb://mongodb-service:27017/user_crud_db"
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
```

---

## Contract Specification: `k8s/frontend-deployment.yaml`

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
      containers:
        - name: frontend
          image: web-book-frontend:latest
          ports:
            - containerPort: 3000
          env:
            - name: PORT
              value: "3000"
            - name: NEXT_PUBLIC_API_URL
              value: "http://web-book-backend-service:3001/api/v1"
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
```

---

## Contract Specification: `k8s/backend-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-book-backend-service
  labels:
    app: web-book-backend
spec:
  type: ClusterIP
  ports:
    - port: 3001
      targetPort: 3001
      protocol: TCP
      name: http
  selector:
    app: web-book-backend
```

---

## Contract Specification: `k8s/frontend-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-book-frontend-service
  labels:
    app: web-book-frontend
spec:
  type: LoadBalancer
  ports:
    - port: 3000
      targetPort: 3000
      protocol: TCP
      name: http
  selector:
    app: web-book-frontend
```

---

## Contract Specification: `k8s/ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-book-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  ingressClassName: nginx
  rules:
    - http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: web-book-backend-service
                port:
                  number: 3001
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-book-frontend-service
                port:
                  number: 3000
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
```
