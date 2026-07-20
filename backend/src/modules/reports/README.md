# Reports & Analytics Module

Read-only analytics layer for the logged-in user.

## Endpoints

All routes require `verifyToken`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/reports/overview` | Overall progress summary |
| GET | `/api/reports/tests` | Paginated test history |
| GET | `/api/reports/tests/:attemptId` | Full attempt report with answers |
| GET | `/api/reports/topics` | Topic-wise progress |
| GET | `/api/reports/modules` | Module-wise progress |
| GET | `/api/reports/weak-topics` | Lowest accuracy topics (top 10) |
| GET | `/api/reports/strong-topics` | Highest accuracy topics (top 10) |
| GET | `/api/reports/performance` | Recharts-ready chart series |
| GET | `/api/reports/hr` | HR interview answer analytics |

## Query Parameters

### `/tests`

- `page`, `limit`
- `sortBy` — `score`, `percentage`, `accuracy`, `startedAt`, `endedAt`, `createdAt`
- `sortOrder` — `asc` / `desc`
- `status`, `testId`, `minScore`, `maxScore`

### `/topics`

- `page`, `limit`, `moduleId`

### `/hr`

- `page`, `limit`

## Performance Charts Shape

```json
{
  "dailyPractice": [{ "date", "label", "testsTaken", "questionsSolved", "averageScore", "averageAccuracy" }],
  "weeklyPractice": [{ "year", "week", "label", "testsTaken", "questionsSolved", "averageScore", "averageAccuracy" }],
  "monthlyPractice": [{ "month", "label", "testsTaken", "questionsSolved", "averageScore", "averageAccuracy" }],
  "summary": { "averageAccuracy", "averageScore", "questionsSolved", "testsTaken" }
}
```

## Data Sources

Uses existing collections only — no new models.

## Notes

- `currentStreak` is a placeholder (`0`) until streak tracking exists
- Attempt detail report reveals correct answers only for completed/expired attempts
- Scoped strictly to `req.user.id`
