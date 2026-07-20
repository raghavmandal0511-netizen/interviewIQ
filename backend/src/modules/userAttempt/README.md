# UserAttempt Module

Online test attempt engine with timer, autosave, scoring, and topic progress updates.

## Endpoints

All routes require authentication.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/attempts` | List user's attempts |
| POST | `/api/attempts/start` | Start a new test attempt |
| GET | `/api/attempts/:attemptId/resume` | Resume an active attempt |
| GET | `/api/attempts/:attemptId/result` | Get completed attempt results |
| PATCH | `/api/attempts/:attemptId/answers` | Autosave an answer |
| GET | `/api/attempts/:attemptId/questions/:order` | Navigate to question by order |
| POST | `/api/attempts/:attemptId/submit` | Submit attempt manually |
| POST | `/api/attempts/:attemptId/auto-submit` | Force auto-submit (timer expiry) |

## Start Attempt Body

```json
{
  "testId": "..."
}
```

## Save Answer Body

```json
{
  "questionId": "...",
  "selectedOption": "A",
  "timeTaken": 45
}
```

For `MULTIPLE_CORRECT`, `selectedOption` should be an array.

## Business Rules

- Only one active (`STARTED`) attempt per user per test
- Timer starts when the attempt is created
- Resume, navigate, and save auto-submit if timer expired
- Questions hide `correctAnswer` during attempt
- `correctAnswer` revealed only after submission
- Negative marking applied from question `negativeMarks`
- `TopicProgress` updated after successful submission

## Scoring

- **Score** — sum of earned marks minus negative marks
- **Percentage** — score / total possible marks
- **Accuracy** — correct / total questions
- **Passed** — score >= test passingMarks
