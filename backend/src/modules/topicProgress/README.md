# TopicProgress Module

Tracks user learning progress per topic, updated automatically after test submission.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/topic-progress` | Yes | List user's topic progress |
| GET | `/api/topic-progress/topic/:topicId` | Yes | Get/create progress for a topic |
| GET | `/api/topic-progress/:id` | Yes | Get progress by ID |
| PATCH | `/api/topic-progress/topic/:topicId/theory` | Yes | Mark theory completed |
| PATCH | `/api/topic-progress/topic/:topicId/exercise` | Yes | Mark exercise completed |

## Tracked Fields

- `completedTheory`
- `completedExercise`
- `completedQuestions`
- `completionPercentage`
- `accuracy` (rolling average across attempts)
- `averageTime` (rolling average seconds per attempt)
- `totalAttempts`
- `lastVisited`

## Automatic Updates

After successful test submission (`COMPLETED` or `EXPIRED`), `updateAfterTestSubmission` runs via the UserAttempt module and:

- Upserts progress per topic (no duplicates)
- Uses bulk write operations
- Increments `completedQuestions` by correct answers
- Recalculates `completionPercentage`
- Updates rolling `accuracy` and `averageTime`
- Increments `totalAttempts`

## Query Parameters (GET list)

- `page`, `limit`, `sortBy`, `sortOrder`, `topicId`
