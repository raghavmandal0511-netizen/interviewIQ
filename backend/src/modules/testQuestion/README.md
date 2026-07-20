# TestQuestion Module

Junction management between tests and questions.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/test-questions?testId=` | Yes | List questions in a test |
| GET | `/api/test-questions/:id` | Yes | Get test-question mapping by ID |
| POST | `/api/test-questions` | Yes | Add single question to test |
| POST | `/api/test-questions/bulk` | Yes | Add multiple questions to test |
| PATCH | `/api/test-questions/reorder` | Yes | Reorder questions in test |
| DELETE | `/api/test-questions?testId=&questionId=` | Yes | Remove question from test |

## Add Question Body

```json
{
  "testId": "...",
  "questionId": "...",
  "order": 0,
  "marks": 1
}
```

## Bulk Add Body

```json
{
  "testId": "...",
  "questions": [
    { "questionId": "...", "order": 0, "marks": 1 }
  ]
}
```

## Reorder Body

```json
{
  "testId": "...",
  "questionIds": ["...", "..."]
}
```

## Rules

- Duplicate `(testId, questionId)` pairs are prevented
- Test `totalQuestions` count is synced after add/remove
