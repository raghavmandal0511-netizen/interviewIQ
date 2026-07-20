# UserAnswer Module

Manages per-question answers during and after test attempts.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/user-answers/attempt/:attemptId` | Yes | Get all answers for an attempt |
| GET | `/api/user-answers/:id` | Yes | Get single answer by ID |
| POST | `/api/user-answers` | Yes | Save (autosave) an answer |
| PATCH | `/api/user-answers/:id` | Yes | Update an answer |

## Save Answer Body

```json
{
  "attemptId": "...",
  "questionId": "...",
  "selectedOption": "A",
  "timeTaken": 30
}
```

## Security

- `correctAnswer` is hidden while attempt status is `STARTED`
- `correctAnswer` is included only after submission (`COMPLETED` or `EXPIRED`)

## Rules

- Answers can only be saved/updated on active attempts
- One answer document per `(attemptId, questionId)`
