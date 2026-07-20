# Exercise Module

Exercises within a topic (e.g. Formula, General Questions, Data Sufficiency).

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/exercises` | No | List exercises |
| GET | `/api/exercises/:id` | No | Get exercise by ID |
| POST | `/api/exercises` | Yes | Create exercise |
| PATCH | `/api/exercises/:id` | Yes | Update exercise |
| DELETE | `/api/exercises/:id` | Yes | Soft delete (`isPublished: false`) |

## Query Parameters (GET list)

- `topicId`, `isPublished`, `page`, `limit`, `search`, `sortBy`, `sortOrder`

## Relationships

- References `Topic` via `topicId`
- Parent of `Question`
