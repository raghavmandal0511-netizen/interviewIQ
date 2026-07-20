# Module Module

Learning modules inside a category (e.g. Arithmetic Aptitude, Logical Reasoning).

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/modules` | No | List modules |
| GET | `/api/modules/slug/:slug` | No | Get module by slug (`?categoryId=` optional) |
| GET | `/api/modules/:id` | No | Get module by ID |
| POST | `/api/modules` | Yes | Create module |
| PATCH | `/api/modules/:id` | Yes | Update module |
| DELETE | `/api/modules/:id` | Yes | Soft delete (`isActive: false`) |

## Query Parameters (GET list)

- `categoryId` — filter by parent category
- `page`, `limit`, `search`, `sortBy`, `sortOrder`, `isActive`

## Relationships

- References `Category` via `categoryId`
- Parent of `Topic`
