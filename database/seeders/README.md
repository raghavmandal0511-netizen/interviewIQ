# InterviewIQ Seed System

Production-ready MongoDB seeders that import all content under `database/data/` into InterviewIQ collections.

## Folder Structure

```text
database/
├── data/                         # JSON content packs (Phases 1–7)
│   ├── categories.json
│   ├── modules.json
│   ├── topics.json
│   ├── theory/
│   ├── exercises/
│   ├── questions/
│   ├── tests/
│   └── hr/
└── seeders/
    ├── seed.js                   # Master seeder
    ├── clear.js                  # Clears content collections
    ├── seedCategories.js
    ├── seedModules.js
    ├── seedTopics.js
    ├── seedTheory.js
    ├── seedExercises.js
    ├── seedQuestions.js
    ├── seedHrCategories.js
    ├── seedHrQuestions.js
    ├── seedTests.js
    ├── seedTestQuestions.js
    ├── README.md
    └── helpers/
        ├── db.js                 # Mongo connection (MONGO_URI)
        ├── fileLoader.js
        ├── idResolver.js         # Placeholder → ObjectId maps
        ├── logger.js
        ├── paths.js              # Data paths + slug maps
        └── validator.js
```

## How Seeder Works

1. Connects to MongoDB using `MONGO_URI` from `backend/.env`.
2. Optionally clears content collections (`--clear` / `seed:reset`).
3. Loads JSON from `database/data/`.
4. Resolves placeholders (`REPLACE_*`) via **slugs**, **filenames**, and **`_seedKey`** values — never edit JSON to insert ObjectIds.
5. Upserts with `findOneAndUpdate` / `bulkWrite` so re-runs do not create duplicates.
6. Logs progress and disconnects.

### Placeholder resolution

| Placeholder | Resolution |
|-------------|------------|
| `REPLACE_CATEGORY_ID` | Module slug → category slug map |
| `REPLACE_CATEGORY_GENERAL_APTITUDE_ID` | Category `general-aptitude` |
| `REPLACE_MODULE_ID` | Topic slug → module slug map |
| `REPLACE_TOPIC_ID` | Theory/exercise filename = topic slug |
| `REPLACE_EXERCISE_ID` | `questions/{topic}/{stem}.json` → `exercise-{topic}-{stem}` |
| `REPLACE_HR_CATEGORY_ID` | HR question filename → HR category slug |
| `REPLACE_TEST_ID_{slug}` | Test `slug` from `tests/tests.json` |
| `REPLACE_QUESTION_ID_{topic}_{stem}_{###}` | 0-based index in that questions file |

Nested packs under `database/data/general-aptitude/` are **not** imported (flat `theory/`, `exercises/`, `questions/` are the source of truth).

Test JSON may include extra fields (`slug`, `totalMarks`, `instructions`). Those are stored only in the ID resolver / dropped before insert so documents match the Test model.

## Seed Order

1. Categories  
2. Modules  
3. Topics  
4. Theory  
5. Exercises  
6. Questions  
7. HR Categories  
8. HR Questions  
9. Tests  
10. Test Questions  

## How to Run

From the **backend** directory (scripts are defined in `backend/package.json`):

```bash
cd backend
cp .env.example .env   # if needed; set MONGO_URI
npm install
```

### Import all content

```bash
npm run seed
```

### Clear content collections only

Does **not** delete `User` documents. Clears content plus dependent progress/answer collections so references stay consistent.

```bash
npm run seed:clear
```

### Clear then seed

```bash
npm run seed:reset
```

### Optional clear flag on seed

```bash
node ../database/seeders/seed.js --clear
```

## How to Add New Content

1. Add or update JSON under `database/data/` following `backend/DATABASE_STRUCTURE.md`.
2. For a new topic:
   - Add the topic to `topics.json` (and to the module map in `helpers/paths.js` if it is a new slug group).
   - Add `theory/{topic-slug}.json` (optional for non-learning topics).
   - Add `exercises/{topic-slug}.json` with `_seedKey` values like `exercise-{topic-slug}-{file-stem}`.
   - Add `questions/{topic-slug}/{file-stem}.json`.
3. For HR: append questions under `hr/questions/freshers.json` or `experienced.json`.
4. For tests: update `tests/tests.json` and `tests/testQuestions.json` using the placeholder formats above.
5. Re-run `npm run seed` (or `npm run seed:reset` for a clean import).

## Requirements

- Node.js with ESM (`"type": "module"` in backend package.json)
- MongoDB reachable via `MONGO_URI`
- Existing Mongoose models under `backend/src/database/models/` (not modified by this seeder)
