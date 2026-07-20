# HR Question Module

HR interview questions organized under Freshers and Experienced categories.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/hr/questions` | No | List published questions |
| GET | `/api/hr/questions/:id` | No | Get question by ID |
| POST | `/api/hr/questions` | Admin | Create question |
| PATCH | `/api/hr/questions/:id` | Admin | Update question |
| DELETE | `/api/hr/questions/:id` | Admin | Delete question |

## Query Parameters (GET list)

| Param | Description |
|-------|-------------|
| `category` | Category ID or slug (`freshers`, `experienced`) |
| `search` | Search question text |
| `sort` | `newest`, `oldest`, `alphabetical` |
| `page`, `limit` | Pagination |

## Fields

- `categoryId`, `question`, `sampleAnswer`
- `keyPoints[]`, `commonMistakes[]`, `interviewerTips[]`
- `isPublished`

## Rules

- Duplicate questions prevented per category
- Text index on `question` for search
