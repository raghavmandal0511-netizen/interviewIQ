# Theory Module

One theory page per topic containing introduction, explanation, formulas, tips, examples, and references.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/theories` | No | List theories (`?topicId=` filter) |
| GET | `/api/theories/topic/:topicId` | No | Get theory by topic ID |
| GET | `/api/theories/:id` | No | Get theory by ID |
| POST | `/api/theories` | Yes | Create theory |
| PATCH | `/api/theories/:id` | Yes | Update theory |
| DELETE | `/api/theories/:id` | Yes | Hard delete |

## Relationships

- One-to-one with `Topic` via `topicId`

## Notes

- Only one theory document is allowed per topic.
- Public reads only return theories linked to published topics.
