# Automated Test Infrastructure for Microservices

A project demonstrating automated testing and CI/CD for containerized microservices.

## Services

- **auth-service** – Handles authentication (register, login, JWT)
- **user-service** – Manages user profiles
- **task-service** – Manages tasks per user

## Testing Layers

- Unit Tests (per service)
- Integration Tests (per service)
- API / E2E Tests (cross-service)
- Load Tests (optional)

## Infrastructure

- Docker + Docker Compose
- GitHub Actions CI Pipeline

## Getting Started

```bash
# Install dependencies for all services
npm install

# Run all services locally
docker-compose up

# Run all tests
npm test
```

## Project Structure

See `docs/architecture.md` for full architecture notes.
