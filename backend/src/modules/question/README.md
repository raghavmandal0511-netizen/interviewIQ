# Question Module

MCQ and other question types within an exercise.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/questions` | No | List questions (correctAnswer hidden) |
| GET | `/api/questions/:id` | No | Get question by ID (correctAnswer hidden) |
| POST | `/api/questions` | Yes | Create question |
| PATCH | `/api/questions/:id` | Yes | Update question |
| DELETE | `/api/questions/:id` | Yes | Hard delete |

## Query Parameters (GET list)

- `exerciseId`, `difficulty`, `questionType`, `tag`, `page`, `limit`, `search`, `sortBy`, `sortOrder`

## Question Types

- `MCQ`
- `TRUE_FALSE`
- `MULTIPLE_CORRECT`

## Security

Public GET responses exclude `correctAnswer` to prevent answer leakage during practice.

## Relationships

- References `Exercise` via `exerciseId`
