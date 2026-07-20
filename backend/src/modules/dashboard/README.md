# Dashboard Module

Read-only aggregation layer for the Dashboard Home page.

## Endpoint

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/dashboard` | Yes (`verifyToken`) | Full dashboard payload |

## Response Shape

```json
{
  "success": true,
  "data": {
    "welcome": {},
    "dailyStreak": {},
    "overallProgress": {},
    "learningProgress": [],
    "continueLearning": {},
    "recentActivity": [],
    "quickActions": [],
    "weakTopics": [],
    "strongTopics": [],
    "testStatistics": {},
    "hrStatistics": {},
    "recommendations": [],
    "notifications": {},
    "dashboardSummary": {}
  }
}
```

## Data Sources

| Section | Collections |
|---------|-------------|
| Welcome | `User` |
| Overall / Learning Progress | `Topic`, `Module`, `TopicProgress` |
| Continue Learning | `TopicProgress`, `Topic`, `Module`, `Category` |
| Recent Activity | `TopicProgress`, `UserAttempt`, `UserHRAnswer` |
| Weak / Strong Topics | `TopicProgress` |
| Test Statistics | `UserAttempt` |
| HR Statistics | `UserHRAnswer` |
| Recommendations | `TopicProgress`, `Topic` |
| Dashboard Summary | `TopicProgress`, `UserAttempt` |

## Placeholders / TODOs

- **Daily Streak** — returns `0` until streak tracking exists
- **Notifications** — `unreadNotifications: 0` until Notification module exists
- **Hours Practiced** — estimated from `averageTime * totalAttempts`

## Notes

- No new models are created
- Uses `Promise.all` and Mongo aggregations for performance
- Does not modify existing modules
