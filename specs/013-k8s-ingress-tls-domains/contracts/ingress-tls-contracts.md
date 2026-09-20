# Ingress & TLS Interface Contracts

**Feature**: `specs/013-k8s-ingress-tls-domains`

---

## 1. Dev Ingress Contract (`k8s/dev/ingress.yaml`)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-book-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - spanish-story.dixonai.net
      secretName: spanish-story-tls
  rules:
    - host: spanish-story.dixonai.net
      http:
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

## 2. Prod Ingress Contract (`k8s/prod/ingress.yaml`)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-book-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - tripitaka.dixonai.net
      secretName: tripitaka-tls
  rules:
    - host: tripitaka.dixonai.net
      http:
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
