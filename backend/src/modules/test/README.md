# Test Module

Mock and placement tests for the Online Test engine.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/tests` | No | List published tests |
| GET | `/api/tests/:id` | Yes | Get test by ID with questions |
| POST | `/api/tests` | Yes | Create test |
| PATCH | `/api/tests/:id` | Yes | Update test |
| DELETE | `/api/tests/:id` | Yes | Delete test |
| PATCH | `/api/tests/:id/publish` | Yes | Publish test |
| PATCH | `/api/tests/:id/unpublish` | Yes | Unpublish test |
| POST | `/api/tests/:id/questions` | Yes | Add questions to test |
| DELETE | `/api/tests/:id/questions/:questionId` | Yes | Remove question from test |
| PATCH | `/api/tests/:id/questions/reorder` | Yes | Reorder test questions |

## Query Parameters (GET list)

- `page`, `limit`, `search`, `sortBy`, `sortOrder`
- `category`, `difficulty`, `isPublished` (defaults to published only)

## Add Questions Body

```json
{
  "questions": [
    { "questionId": "...", "order": 0, "marks": 1 }
  ]
}
```

## Reorder Body

```json
{
  "questionIds": ["questionId1", "questionId2"]
}
```

## Relationships

- References `Category`
- Uses `TestQuestion` junction for question mapping
