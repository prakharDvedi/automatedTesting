# Architecture Notes

## Services

| Service      | Port | Responsibility              |
| ------------ | ---- | --------------------------- |
| auth-service | 3001 | Register, Login, JWT verify |
| user-service | 3002 | User profile CRUD           |
| task-service | 3003 | Task CRUD per user          |

## Communication Pattern

- [ ] REST? gRPC? Message queue? ← **Decision needed**

## Database Strategy

- [ ] Shared DB? One DB per service? ← **Decision needed**
- [ ] Which DB? PostgreSQL? MongoDB? ← **Decision needed**

## Auth Strategy

- [ ] JWT? Session? OAuth? ← **Decision needed**

## Testing Strategy

- Unit: Jest per service
- Integration: Supertest per service
- API/E2E: Supertest or Postman/Newman across services
- Load: k6 or Artillery (Phase 7)

## CI/CD

- GitHub Actions
- Run tests on every push/PR
