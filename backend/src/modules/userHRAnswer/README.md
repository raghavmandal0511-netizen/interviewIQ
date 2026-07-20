# User HR Answer Module

User-submitted answers to HR interview questions.

## Endpoints

All routes require authentication. Users can only access their own answers.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/hr/answers` | List user's answers |
| GET | `/api/hr/answers/:id` | Get answer by ID |
| POST | `/api/hr/answers` | Create answer |
| PATCH | `/api/hr/answers/:id` | Update answer |
| DELETE | `/api/hr/answers/:id` | Delete answer |

## Create Answer Body

```json
{
  "questionId": "...",
  "answer": "My answer text..."
}
```

## Query Parameters (GET list)

- `page`, `limit`, `questionId`

## Rules

- One answer per user per question (unique index)
- Users can only CRUD their own answers
- No AI feedback, score, or rating (handled by external AI Interview app)

## Indexes

- Unique `(userId, questionId)`
- `(userId, submittedAt)`
