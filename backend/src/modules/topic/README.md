# Topic Module

Learning topics under a module (e.g. Problems on Trains, Profit and Loss).

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/topics` | No | List topics |
| GET | `/api/topics/slug/:slug` | No | Get topic by slug (`?moduleId=` optional) |
| GET | `/api/topics/:id` | No | Get topic by ID |
| POST | `/api/topics` | Yes | Create topic |
| PATCH | `/api/topics/:id` | Yes | Update topic |
| DELETE | `/api/topics/:id` | Yes | Soft delete (`isPublished: false`) |

## Query Parameters (GET list)

- `moduleId`, `difficulty`, `isPublished`, `page`, `limit`, `search`, `sortBy`, `sortOrder`

## Relationships

- References `Module` via `moduleId`
- Parent of `Theory` and `Exercise`
