# Category Module

Top-level dashboard navigation for learning content (e.g. General Aptitude, Interview, Reports).

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/categories` | No | List categories (pagination, search, sort, filter) |
| GET | `/api/categories/slug/:slug` | No | Get category by slug |
| GET | `/api/categories/:id` | No | Get category by ID |
| POST | `/api/categories` | Yes | Create category |
| PATCH | `/api/categories/:id` | Yes | Update category |
| DELETE | `/api/categories/:id` | Yes | Soft delete (`isActive: false`) |

## Query Parameters (GET list)

- `page`, `limit` — pagination
- `search` — searches name, slug, description
- `sortBy` — `name`, `slug`, `order`, `createdAt`, `updatedAt`
- `sortOrder` — `asc` or `desc`
- `isActive` — defaults to `true` for public listings

## Response Format

```json
{
  "success": true,
  "data": {},
  "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
}
```
