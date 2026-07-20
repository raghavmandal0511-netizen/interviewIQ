# HR Category Module

HR interview categories — **Freshers** and **Experienced** only.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/hr/categories` | No | List published categories |
| GET | `/api/hr/categories/:id` | No | Get category by ID |
| POST | `/api/hr/categories` | Admin | Create category |
| PATCH | `/api/hr/categories/:id` | Admin | Update category |
| DELETE | `/api/hr/categories/:id` | Admin | Delete category |

## Fields

- `title`, `slug`, `description`, `isPublished`

## Admin Access

Set `ADMIN_USER_IDS` in `.env` (comma-separated user MongoDB IDs).

## Indexes

- Unique `slug`
- `isPublished`
