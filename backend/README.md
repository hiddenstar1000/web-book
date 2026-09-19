# Backend REST API Service (NestJS + MongoDB)

The backend service for the User CRUD Management application, built with **NestJS 10**, **Mongoose ODM**, and **MongoDB**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: NestJS 10 (`@nestjs/core`, `@nestjs/common`, `@nestjs/mongoose`)
- **Database**: MongoDB 6+ / 7+ via Mongoose ODM (`mongoose`)
- **Validation**: `class-validator`, `class-transformer`
- **Testing Framework**: Jest & `@nestjs/testing`

---

## 📁 Directory Layout

```text
backend/
├── src/
│   ├── common/
│   │   └── filters/
│   │       ├── http-exception.filter.ts      # Global exception filter & MongoDB 11000 conflict handler
│   │       └── http-exception.filter.spec.ts # Exception filter unit tests
│   ├── modules/
│   │   └── users/
│   │       ├── dto/
│   │       │   ├── create-user.dto.ts        # Validation DTO for user creation
│   │       │   └── update-user.dto.ts        # Validation DTO for user updates
│   │       ├── schemas/
│   │       │   └── user.schema.ts            # Mongoose Schema & Document definition
│   │       ├── users.controller.ts           # REST API Route Controller
│   │       ├── users.controller.spec.ts      # Controller unit tests
│   │       ├── users.service.ts              # Business logic & Database queries
│   │       ├── users.service.spec.ts         # Service unit tests
│   │       └── users.module.ts               # NestJS Feature Module
│   ├── app.module.ts                         # Root Module (Config & Mongoose connection)
│   └── main.ts                               # Application Entrypoint
├── jest.config.js                            # Jest configuration with >90% coverage threshold
└── package.json
```

---

## 🌐 Environment Configuration

Configuration is managed via `@nestjs/config`. Create a `.env` file in the `backend/` directory or rely on default fallback values:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `PORT` | `3001` | HTTP server port |
| `MONGODB_URI` | `mongodb://localhost:27017/user_crud_db` | MongoDB connection URI |

---

## 🚀 Available Scripts

```bash
# Install dependencies
npm install

# Start development server with auto-reload (Port 3001)
npm run start:dev

# Build production bundle
npm run build

# Start production server
npm run start:prod

# Run unit tests
npm run test

# Run unit tests with coverage report
npm run test:cov
```

---

## 📡 REST API Endpoint Specification

Base URL: `http://localhost:3001/api/v1`

### 1. Create User
- **Method**: `POST`
- **Path**: `/users`
- **Request Body**:
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": "ADMIN",
  "status": "ACTIVE"
}
```
- **Response**: `201 Created`
- **Errors**: `400 Bad Request` (validation failure), `409 Conflict` (email already exists)

---

### 2. List & Search Users
- **Method**: `GET`
- **Path**: `/users`
- **Query Parameters**:
  - `search`: String (regex match on `fullName` or `email`)
  - `role`: Enum (`ADMIN`, `USER`, `GUEST`)
  - `status`: Enum (`ACTIVE`, `INACTIVE`)
  - `page`: Integer (default: 1)
  - `limit`: Integer (default: 10)
- **Response**: `200 OK`
```json
{
  "data": [
    {
      "id": "65f2a1b3c4e5f67890123456",
      "fullName": "Jane Doe",
      "email": "jane.doe@example.com",
      "role": "ADMIN",
      "status": "ACTIVE",
      "createdAt": "2026-09-19T21:00:00.000Z",
      "updatedAt": "2026-09-19T21:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

---

### 3. Get User By ID
- **Method**: `GET`
- **Path**: `/users/:id`
- **Response**: `200 OK`
- **Errors**: `404 Not Found`

---

### 4. Update User
- **Method**: `PATCH`
- **Path**: `/users/:id`
- **Request Body**: Partial User Fields
```json
{
  "role": "USER",
  "status": "INACTIVE"
}
```
- **Response**: `200 OK`
- **Errors**: `400 Bad Request`, `404 Not Found`, `409 Conflict`

---

### 5. Delete User
- **Method**: `DELETE`
- **Path**: `/users/:id`
- **Response**: `200 OK`
```json
{
  "message": "User deleted successfully"
}
```
- **Errors**: `404 Not Found`

---

## 🧪 Testing & Coverage

Backend tests use **Jest** and NestJS testing module utilities:
- **`users.service.spec.ts`**: Tests service creation, filtering, pagination, updates, deletion, and conflict errors.
- **`users.controller.spec.ts`**: Tests controller route handlers and parameters mapping.
- **`http-exception.filter.spec.ts`**: Tests standard HTTP exceptions and MongoDB duplicate key exception handling.

Run coverage report:
```bash
npm run test:cov
```
Target thresholds: **>90%** Statements, Lines, Functions, and Branches.
