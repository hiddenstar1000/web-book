# Dev Ingress Contract Specs

**Feature**: `specs/014-update-dev-domain-name`

---

## Dev Ingress Contract (`k8s/dev/ingress.yaml`)

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
        - spanish-stories.dixonai.net
      secretName: spanish-stories-tls
  rules:
    - host: spanish-stories.dixonai.net
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
