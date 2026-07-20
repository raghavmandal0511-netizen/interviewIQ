# InterviewIQ — Database Structure & Content Population Guide

This document describes the **exact JSON structure** required to populate every MongoDB collection used by InterviewIQ.

It is derived from the production Mongoose models. Do not invent fields that are not listed here.

**Scope:** Content and learning collections (plus user-generated progress/answer shapes for reference).

**Not covered here:** `User` auth/profile documents (already managed by Authentication / User modules).

---

## Table of Contents

1. [Entity Relationships](#1-entity-relationships)
2. [Data Insertion Order](#2-data-insertion-order)
3. [Collection Specifications](#3-collection-specifications)
4. [JSON File Structure](#4-json-file-structure)
5. [Content Generation Guidelines](#5-content-generation-guidelines)
6. [AI Prompt Guidelines](#6-ai-prompt-guidelines)
7. [Global Conventions](#7-global-conventions)

---

## 1. Entity Relationships

```text
Category
  └── Module
        └── Topic
              ├── Theory          (1:1 with Topic)
              └── Exercise
                    └── Question
                          └── TestQuestion ── Test ── Category
                                │
                                └── UserAnswer ── UserAttempt ── User + Test

Topic ── TopicProgress ── User

HRCategory
  └── HRQuestion
        └── UserHRAnswer ── User
```

### Hierarchy (Learning Content)

```text
Category
   ↓
Module
   ↓
Topic
   ↓
Theory
   ↓
Exercise
   ↓
Question
   ↓
Test  (+ TestQuestion mapping)
```

### Hierarchy (HR Interview)

```text
HRCategory   (Freshers | Experienced)
   ↓
HRQuestion
   ↓
UserHRAnswer   (user-generated; do not seed as content)
```

---

## 2. Data Insertion Order

Insert documents **in this order** so ObjectId references resolve correctly.

```text
1.  Categories
2.  Modules
3.  Topics
4.  Theory
5.  Exercises
6.  Questions
7.  Tests
8.  TestQuestions
9.  HR Categories
10. HR Questions

(Optional — runtime / user-generated; usually NOT seeded as content)
11. UserAttempts
12. UserAnswers
13. TopicProgress
14. UserHRAnswers
```

**Rule:** Never insert a child document before its parent exists.

---

## 3. Collection Specifications

> MongoDB collection names below are Mongoose defaults (lowercase plural of the model name).

---

### 3.1 Category

| Item | Value |
|------|--------|
| **Collection Name** | `categories` |
| **Model Name** | `Category` |
| **Purpose** | Top-level dashboard navigation (e.g. General Aptitude, Interview, Reports) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `name` | String | Yes | — | Display name |
| `slug` | String | Yes | — | Unique URL slug (lowercase) |
| `description` | String | No | — | Short description |
| `icon` | String | No | — | Icon key or URL |
| `order` | Number | No | — | Sort order (≥ 0) |
| `isActive` | Boolean | No | — | Soft visibility flag |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Optional | Enum | Default | Validation |
|-------|----------|----------|------|---------|------------|
| `name` | ✓ | | — | — | trim |
| `slug` | ✓ | | — | — | unique, lowercase, trim |
| `description` | | ✓ | — | `""` | trim |
| `icon` | | ✓ | — | `""` | — |
| `order` | | ✓ | — | `0` | min `0` |
| `isActive` | | ✓ | — | `true` | — |

#### Indexes

- Unique: `slug`
- Compound: `{ order: 1, isActive: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000001",
  "name": "General Aptitude",
  "slug": "general-aptitude",
  "description": "Quantitative, logical and verbal aptitude preparation",
  "icon": "brain",
  "order": 1,
  "isActive": true,
  "createdAt": "2026-07-20T10:00:00.000Z",
  "updatedAt": "2026-07-20T10:00:00.000Z"
}
```

#### Sample Documents

```json
[
  {
    "name": "General Aptitude",
    "slug": "general-aptitude",
    "description": "Aptitude learning and practice",
    "icon": "brain",
    "order": 1,
    "isActive": true
  },
  {
    "name": "Interview",
    "slug": "interview",
    "description": "Interview preparation resources",
    "icon": "briefcase",
    "order": 2,
    "isActive": true
  },
  {
    "name": "Reports",
    "slug": "reports",
    "description": "Performance and analytics",
    "icon": "chart",
    "order": 3,
    "isActive": true
  }
]
```

#### Notes

- `slug` must be globally unique.
- Prefer kebab-case: `general-aptitude`.
- Soft-delete pattern uses `isActive: false` (do not hard-delete seeded categories casually).

---

### 3.2 Module

| Item | Value |
|------|--------|
| **Collection Name** | `modules` |
| **Model Name** | `Module` |
| **Purpose** | Learning modules inside a category (Arithmetic, Logical, Verbal, Online Tests) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `categoryId` | ObjectId | Yes | `Category` | Parent category |
| `name` | String | Yes | — | Display name |
| `slug` | String | Yes | — | Slug unique within category |
| `description` | String | No | — | Module summary |
| `icon` | String | No | — | Icon key or URL |
| `order` | Number | No | — | Sort order |
| `isActive` | Boolean | No | — | Visibility |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `categoryId` | ✓ | — | valid ObjectId → Category |
| `name` | ✓ | — | trim |
| `slug` | ✓ | — | lowercase, trim |
| `description` | | `""` | trim |
| `icon` | | `""` | — |
| `order` | | `0` | min `0` |
| `isActive` | | `true` | — |

#### Indexes

- Unique compound: `{ categoryId: 1, slug: 1 }`
- `{ categoryId: 1, order: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000011",
  "categoryId": "665a00000000000000000001",
  "name": "Arithmetic Aptitude",
  "slug": "arithmetic-aptitude",
  "description": "Numbers, percentages, profit & loss, time & work",
  "icon": "calculator",
  "order": 1,
  "isActive": true
}
```

#### Sample Documents

```json
[
  {
    "categoryId": "665a00000000000000000001",
    "name": "Arithmetic Aptitude",
    "slug": "arithmetic-aptitude",
    "description": "Quantitative arithmetic topics",
    "icon": "calculator",
    "order": 1,
    "isActive": true
  },
  {
    "categoryId": "665a00000000000000000001",
    "name": "Logical Reasoning",
    "slug": "logical-reasoning",
    "description": "Series, puzzles, blood relations",
    "icon": "puzzle",
    "order": 2,
    "isActive": true
  },
  {
    "categoryId": "665a00000000000000000001",
    "name": "Verbal Reasoning",
    "slug": "verbal-reasoning",
    "description": "Language and comprehension aptitude",
    "icon": "book",
    "order": 3,
    "isActive": true
  },
  {
    "categoryId": "665a00000000000000000001",
    "name": "Online Tests",
    "slug": "online-tests",
    "description": "Mock and practice tests",
    "icon": "clipboard",
    "order": 4,
    "isActive": true
  }
]
```

#### Notes

- Same `slug` may exist in different categories, but not twice under one `categoryId`.
- Dashboard / Reports expect slugs: `arithmetic-aptitude`, `logical-reasoning`, `verbal-reasoning`.

---

### 3.3 Topic

| Item | Value |
|------|--------|
| **Collection Name** | `topics` |
| **Model Name** | `Topic` |
| **Purpose** | Individual learning topics under a module |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `moduleId` | ObjectId | Yes | `Module` | Parent module |
| `name` | String | Yes | — | Topic title |
| `slug` | String | Yes | — | Slug unique within module |
| `description` | String | No | — | Topic summary |
| `estimatedTime` | Number | No | — | Minutes to complete |
| `difficulty` | String | No | — | `easy` \| `medium` \| `hard` |
| `order` | Number | No | — | Sort order |
| `isPublished` | Boolean | No | — | Public visibility |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Enums

| Field | Values | Default |
|-------|--------|---------|
| `difficulty` | `easy`, `medium`, `hard` | `medium` |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `moduleId` | ✓ | — | ObjectId → Module |
| `name` | ✓ | — | trim |
| `slug` | ✓ | — | lowercase, trim |
| `description` | | `""` | trim |
| `estimatedTime` | | `0` | min `0` (minutes) |
| `difficulty` | | `medium` | enum |
| `order` | | `0` | min `0` |
| `isPublished` | | `false` | — |

#### Indexes

- Unique: `{ moduleId: 1, slug: 1 }`
- `{ moduleId: 1, order: 1 }`
- `{ isPublished: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000021",
  "moduleId": "665a00000000000000000011",
  "name": "Problems on Trains",
  "slug": "problems-on-trains",
  "description": "Speed, distance and relative motion of trains",
  "estimatedTime": 45,
  "difficulty": "medium",
  "order": 1,
  "isPublished": true
}
```

#### Sample Documents

```json
[
  {
    "moduleId": "665a00000000000000000011",
    "name": "Problems on Trains",
    "slug": "problems-on-trains",
    "description": "Train speed and distance problems",
    "estimatedTime": 45,
    "difficulty": "medium",
    "order": 1,
    "isPublished": true
  },
  {
    "moduleId": "665a00000000000000000011",
    "name": "Time and Distance",
    "slug": "time-and-distance",
    "description": "Core time-distance concepts",
    "estimatedTime": 40,
    "difficulty": "easy",
    "order": 2,
    "isPublished": true
  },
  {
    "moduleId": "665a00000000000000000011",
    "name": "Profit and Loss",
    "slug": "profit-and-loss",
    "description": "CP, SP, profit percent and discounts",
    "estimatedTime": 50,
    "difficulty": "medium",
    "order": 3,
    "isPublished": true
  },
  {
    "moduleId": "665a00000000000000000012",
    "name": "Number Series",
    "slug": "number-series",
    "description": "Find the next number in a series",
    "estimatedTime": 35,
    "difficulty": "easy",
    "order": 1,
    "isPublished": true
  },
  {
    "moduleId": "665a00000000000000000012",
    "name": "Blood Relation",
    "slug": "blood-relation",
    "description": "Family relationship puzzles",
    "estimatedTime": 40,
    "difficulty": "hard",
    "order": 2,
    "isPublished": true
  }
]
```

#### Notes

- Soft delete / hide unpublished topics with `isPublished: false`.
- One Theory document per topic (enforced later).

---

### 3.4 Theory

| Item | Value |
|------|--------|
| **Collection Name** | `theories` |
| **Model Name** | `Theory` |
| **Purpose** | One theory page per topic (formulas, tips, examples) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `topicId` | ObjectId | Yes | `Topic` | Unique parent topic |
| `introduction` | String | No | — | Opening overview |
| `explanation` | String | No | — | Main teaching content |
| `formulas` | Array\<Object\> | No | — | Formula list |
| `shortcutTips` | Array\<Object\> | No | — | Shortcut tips |
| `solvedExamples` | Array\<Object\> | No | — | Worked examples |
| `references` | Array\<Object\> | No | — | External references |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Sub-document shapes (`_id: false`)

**formulas[]**

| Field | Type | Default |
|-------|------|---------|
| `title` | String | `""` |
| `content` | String | `""` |

**shortcutTips[]**

| Field | Type | Default |
|-------|------|---------|
| `title` | String | `""` |
| `tip` | String | `""` |

**solvedExamples[]**

| Field | Type | Default |
|-------|------|---------|
| `problem` | String | `""` |
| `solution` | String | `""` |
| `steps` | String[] | `[]` |

**references[]**

| Field | Type | Default |
|-------|------|---------|
| `title` | String | `""` |
| `url` | String | `""` |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `topicId` | ✓ | — | unique ObjectId → Topic |
| `introduction` | | `""` | trim |
| `explanation` | | `""` | trim |
| `formulas` | | `[]` | array of formula objects |
| `shortcutTips` | | `[]` | array of tip objects |
| `solvedExamples` | | `[]` | array of example objects |
| `references` | | `[]` | array of reference objects |

#### Indexes

- Unique: `topicId` (enforces **one theory per topic**)

#### Example Document

```json
{
  "_id": "665a00000000000000000031",
  "topicId": "665a00000000000000000021",
  "introduction": "Problems on trains measure relative speed between trains and platforms.",
  "explanation": "Use Distance = Speed × Time. Convert km/h to m/s by multiplying with 5/18 when needed.",
  "formulas": [
    {
      "title": "Speed conversion",
      "content": "x km/h = x × (5/18) m/s"
    },
    {
      "title": "Time to cross a platform",
      "content": "Time = (Length of train + Length of platform) / Speed"
    }
  ],
  "shortcutTips": [
    {
      "title": "Same direction",
      "tip": "Relative speed = difference of speeds"
    },
    {
      "title": "Opposite direction",
      "tip": "Relative speed = sum of speeds"
    }
  ],
  "solvedExamples": [
    {
      "problem": "A train 120 m long crosses a platform 180 m long at 54 km/h. Find time.",
      "solution": "Speed = 54 × 5/18 = 15 m/s. Distance = 300 m. Time = 20 s.",
      "steps": [
        "Convert 54 km/h to 15 m/s",
        "Add lengths: 120 + 180 = 300 m",
        "Time = 300 / 15 = 20 seconds"
      ]
    }
  ],
  "references": [
    {
      "title": "Relative Motion Basics",
      "url": "https://example.com/relative-motion"
    }
  ]
}
```

#### Sample Documents

```json
[
  {
    "topicId": "665a00000000000000000021",
    "introduction": "Introduction to train problems.",
    "explanation": "Detailed explanation of train formulas.",
    "formulas": [{ "title": "Basic", "content": "D = S × T" }],
    "shortcutTips": [{ "title": "Tip", "tip": "Always convert units first" }],
    "solvedExamples": [],
    "references": []
  }
]
```

#### Notes

- Do **not** create two theory docs for the same `topicId`.
- Sub-documents do not get their own `_id`.

---

### 3.5 Exercise

| Item | Value |
|------|--------|
| **Collection Name** | `exercises` |
| **Model Name** | `Exercise` |
| **Purpose** | Practice sections under a topic (Formula, General Questions, Data Sufficiency, …) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `topicId` | ObjectId | Yes | `Topic` | Parent topic |
| `title` | String | Yes | — | Exercise title |
| `description` | String | No | — | Short description |
| `order` | Number | No | — | Sort order |
| `isPublished` | Boolean | No | — | Visibility |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `topicId` | ✓ | — | ObjectId → Topic |
| `title` | ✓ | — | trim |
| `description` | | `""` | trim |
| `order` | | `0` | min `0` |
| `isPublished` | | `false` | — |

#### Indexes

- `{ topicId: 1, order: 1 }`
- `{ topicId: 1, isPublished: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000041",
  "topicId": "665a00000000000000000021",
  "title": "General Questions",
  "description": "Standard MCQs on Problems on Trains",
  "order": 2,
  "isPublished": true
}
```

#### Sample Documents

```json
[
  {
    "topicId": "665a00000000000000000021",
    "title": "Formula",
    "description": "Formula practice",
    "order": 1,
    "isPublished": true
  },
  {
    "topicId": "665a00000000000000000021",
    "title": "General Questions",
    "description": "Core practice set",
    "order": 2,
    "isPublished": true
  },
  {
    "topicId": "665a00000000000000000021",
    "title": "Data Sufficiency 1",
    "description": "DS set 1",
    "order": 3,
    "isPublished": true
  },
  {
    "topicId": "665a00000000000000000021",
    "title": "Data Sufficiency 2",
    "description": "DS set 2",
    "order": 4,
    "isPublished": true
  }
]
```

#### Notes

- Multiple exercises per topic are expected.
- Questions belong to exercises, not directly to topics.

---

### 3.6 Question

| Item | Value |
|------|--------|
| **Collection Name** | `questions` |
| **Model Name** | `Question` |
| **Purpose** | MCQ / True-False / Multi-correct items inside an exercise |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `exerciseId` | ObjectId | Yes | `Exercise` | Parent exercise |
| `question` | String | Yes | — | Question stem |
| `options` | Array\<Object\> | Yes | — | At least 2 options |
| `correctAnswer` | Mixed | Yes | — | String or String[] |
| `explanation` | String | No | — | Solution explanation |
| `difficulty` | String | No | — | Difficulty level |
| `marks` | Number | No | — | Positive marks |
| `negativeMarks` | Number | No | — | Penalty on wrong |
| `timeLimit` | Number | No | — | Seconds (`0` = no limit) |
| `tags` | String[] | No | — | Search tags |
| `questionType` | String | No | — | Question type enum |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Option sub-document (`_id: false`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `optionId` | String | Yes | Stable id (`A`, `B`, `C`, `D` recommended) |
| `text` | String | Yes | Option text |

#### Enums

| Field | Values | Default |
|-------|--------|---------|
| `difficulty` | `easy`, `medium`, `hard` | `medium` |
| `questionType` | `MCQ`, `TRUE_FALSE`, `MULTIPLE_CORRECT` | `MCQ` |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `exerciseId` | ✓ | — | ObjectId → Exercise |
| `question` | ✓ | — | trim, non-empty |
| `options` | ✓ | — | array length ≥ 2 |
| `correctAnswer` | ✓ | — | string for MCQ/TRUE_FALSE; non-empty array for MULTIPLE_CORRECT |
| `explanation` | | `""` | trim |
| `difficulty` | | `medium` | enum |
| `marks` | | `1` | min `0` |
| `negativeMarks` | | `0` | min `0` |
| `timeLimit` | | `0` | min `0` (seconds) |
| `tags` | | `[]` | strings trimmed |
| `questionType` | | `MCQ` | enum |

#### Indexes

- `{ exerciseId: 1 }`
- `{ difficulty: 1 }`
- `{ questionType: 1 }`
- `{ tags: 1 }`

#### Example Document (MCQ)

```json
{
  "_id": "665a00000000000000000051",
  "exerciseId": "665a00000000000000000041",
  "question": "A train 150 m long is running at 54 km/h. Time to cross a pole?",
  "options": [
    { "optionId": "A", "text": "8 seconds" },
    { "optionId": "B", "text": "10 seconds" },
    { "optionId": "C", "text": "12 seconds" },
    { "optionId": "D", "text": "15 seconds" }
  ],
  "correctAnswer": "B",
  "explanation": "Speed = 54 × 5/18 = 15 m/s. Time = 150/15 = 10 s.",
  "difficulty": "easy",
  "marks": 1,
  "negativeMarks": 0.25,
  "timeLimit": 60,
  "tags": ["trains", "speed"],
  "questionType": "MCQ"
}
```

#### Sample Documents

```json
[
  {
    "exerciseId": "665a00000000000000000041",
    "question": "A train 150 m long is running at 54 km/h. Time to cross a pole?",
    "options": [
      { "optionId": "A", "text": "8 seconds" },
      { "optionId": "B", "text": "10 seconds" },
      { "optionId": "C", "text": "12 seconds" },
      { "optionId": "D", "text": "15 seconds" }
    ],
    "correctAnswer": "B",
    "explanation": "15 m/s → 150/15 = 10 s",
    "difficulty": "easy",
    "marks": 1,
    "negativeMarks": 0.25,
    "timeLimit": 60,
    "tags": ["trains"],
    "questionType": "MCQ"
  },
  {
    "exerciseId": "665a00000000000000000041",
    "question": "Relative speed of two trains moving in opposite directions is the sum of their speeds.",
    "options": [
      { "optionId": "A", "text": "True" },
      { "optionId": "B", "text": "False" }
    ],
    "correctAnswer": "A",
    "explanation": "Opposite directions → speeds add.",
    "difficulty": "easy",
    "marks": 1,
    "negativeMarks": 0,
    "timeLimit": 30,
    "tags": ["relative-speed"],
    "questionType": "TRUE_FALSE"
  },
  {
    "exerciseId": "665a00000000000000000041",
    "question": "Which of the following affect time to cross a platform?",
    "options": [
      { "optionId": "A", "text": "Train length" },
      { "optionId": "B", "text": "Platform length" },
      { "optionId": "C", "text": "Train color" },
      { "optionId": "D", "text": "Speed of train" }
    ],
    "correctAnswer": ["A", "B", "D"],
    "explanation": "Color is irrelevant.",
    "difficulty": "medium",
    "marks": 2,
    "negativeMarks": 0.5,
    "timeLimit": 90,
    "tags": ["trains", "multi"],
    "questionType": "MULTIPLE_CORRECT"
  }
]
```

#### Notes

- `correctAnswer` must match an `optionId` (or array of `optionId`s).
- Public APIs hide `correctAnswer` until after submission — still store it in the DB.
- At least **two** options are mandatory.

---

### 3.7 Test

| Item | Value |
|------|--------|
| **Collection Name** | `tests` |
| **Model Name** | `Test` |
| **Purpose** | Mock / placement tests metadata |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `title` | String | Yes | — | Test title |
| `description` | String | No | — | Description |
| `category` | ObjectId | Yes | `Category` | Owning category |
| `duration` | Number | Yes | — | Duration in **minutes** (≥ 1) |
| `totalQuestions` | Number | Yes | — | Denormalized count (≥ 1) |
| `passingMarks` | Number | Yes | — | Pass threshold (≥ 0) |
| `difficulty` | String | No | — | Difficulty enum |
| `isPublished` | Boolean | No | — | Visibility |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Enums

| Field | Values | Default |
|-------|--------|---------|
| `difficulty` | `easy`, `medium`, `hard` | `medium` |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `title` | ✓ | — | trim |
| `description` | | `""` | trim |
| `category` | ✓ | — | ObjectId → Category |
| `duration` | ✓ | — | min `1` (minutes) |
| `totalQuestions` | ✓ | — | min `1` |
| `passingMarks` | ✓ | — | min `0` |
| `difficulty` | | `medium` | enum |
| `isPublished` | | `false` | — |

#### Indexes

- `{ category: 1, isPublished: 1 }`
- `{ difficulty: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000061",
  "title": "Arithmetic Mock Test 1",
  "description": "25 questions covering core arithmetic topics",
  "category": "665a00000000000000000001",
  "duration": 30,
  "totalQuestions": 25,
  "passingMarks": 15,
  "difficulty": "medium",
  "isPublished": true
}
```

#### Sample Documents

```json
[
  {
    "title": "Aptitude Test 1",
    "description": "Mixed aptitude mock",
    "category": "665a00000000000000000001",
    "duration": 45,
    "totalQuestions": 40,
    "passingMarks": 24,
    "difficulty": "medium",
    "isPublished": true
  },
  {
    "title": "Logical Mock Test",
    "description": "Logical reasoning only",
    "category": "665a00000000000000000001",
    "duration": 25,
    "totalQuestions": 20,
    "passingMarks": 12,
    "difficulty": "hard",
    "isPublished": true
  },
  {
    "title": "Placement Test",
    "description": "Full placement style paper",
    "category": "665a00000000000000000001",
    "duration": 60,
    "totalQuestions": 50,
    "passingMarks": 30,
    "difficulty": "hard",
    "isPublished": false
  }
]
```

#### Notes

- Questions are **not** embedded. Link them via `TestQuestion`.
- Keep `totalQuestions` in sync with the number of `TestQuestion` rows (APIs update this automatically).
- Field name is `category` (not `categoryId`).

---

### 3.8 TestQuestion

| Item | Value |
|------|--------|
| **Collection Name** | `testquestions` |
| **Model Name** | `TestQuestion` |
| **Purpose** | Junction mapping between Test and Question (order + marks override) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `testId` | ObjectId | Yes | `Test` | Parent test |
| `questionId` | ObjectId | Yes | `Question` | Linked question |
| `order` | Number | Yes | — | Display order (≥ 0) |
| `marks` | Number | Yes | — | Marks for this test (≥ 0) |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `testId` | ✓ | — | ObjectId → Test |
| `questionId` | ✓ | — | ObjectId → Question |
| `order` | ✓ | — | min `0` |
| `marks` | ✓ | — | min `0` |

#### Indexes

- Unique: `{ testId: 1, questionId: 1 }` (no duplicate questions in a test)
- `{ testId: 1, order: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000071",
  "testId": "665a00000000000000000061",
  "questionId": "665a00000000000000000051",
  "order": 0,
  "marks": 1
}
```

#### Sample Documents

```json
[
  {
    "testId": "665a00000000000000000061",
    "questionId": "665a00000000000000000051",
    "order": 0,
    "marks": 1
  },
  {
    "testId": "665a00000000000000000061",
    "questionId": "665a00000000000000000052",
    "order": 1,
    "marks": 1
  },
  {
    "testId": "665a00000000000000000061",
    "questionId": "665a00000000000000000053",
    "order": 2,
    "marks": 2
  }
]
```

#### Notes

- Same question can appear in multiple tests (different `testId`).
- `marks` may override the question’s default `marks`.

---

### 3.9 UserAttempt

| Item | Value |
|------|--------|
| **Collection Name** | `userattempts` |
| **Model Name** | `UserAttempt` |
| **Purpose** | Stores each user’s attempt at a test (**runtime data**) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `userId` | ObjectId | Yes | `User` | Attempting user |
| `testId` | ObjectId | Yes | `Test` | Attempted test |
| `startedAt` | Date | No | — | Timer start |
| `endedAt` | Date | No | — | Submit / expire time |
| `score` | Number | No | — | Final score |
| `percentage` | Number | No | — | 0–100 |
| `accuracy` | Number | No | — | 0–100 |
| `totalCorrect` | Number | No | — | Correct count |
| `totalWrong` | Number | No | — | Wrong count |
| `unanswered` | Number | No | — | Blank count |
| `status` | String | No | — | Attempt lifecycle |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Enums

| Field | Values | Default |
|-------|--------|---------|
| `status` | `STARTED`, `COMPLETED`, `EXPIRED` | `STARTED` |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `userId` | ✓ | — | ObjectId → User |
| `testId` | ✓ | — | ObjectId → Test |
| `startedAt` | | `Date.now` | — |
| `endedAt` | | — | optional |
| `score` | | `0` | — |
| `percentage` | | `0` | 0–100 |
| `accuracy` | | `0` | 0–100 |
| `totalCorrect` | | `0` | min `0` |
| `totalWrong` | | `0` | min `0` |
| `unanswered` | | `0` | min `0` |
| `status` | | `STARTED` | enum |

#### Indexes

- `{ userId: 1, testId: 1 }`
- `{ userId: 1, status: 1 }`
- `{ testId: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000081",
  "userId": "665a00000000000000000099",
  "testId": "665a00000000000000000061",
  "startedAt": "2026-07-20T12:00:00.000Z",
  "endedAt": "2026-07-20T12:28:00.000Z",
  "score": 18,
  "percentage": 72,
  "accuracy": 75,
  "totalCorrect": 18,
  "totalWrong": 5,
  "unanswered": 2,
  "status": "COMPLETED"
}
```

#### Sample Documents

```json
[
  {
    "userId": "665a00000000000000000099",
    "testId": "665a00000000000000000061",
    "startedAt": "2026-07-20T12:00:00.000Z",
    "status": "STARTED",
    "score": 0,
    "percentage": 0,
    "accuracy": 0,
    "totalCorrect": 0,
    "totalWrong": 0,
    "unanswered": 0
  },
  {
    "userId": "665a00000000000000000099",
    "testId": "665a00000000000000000061",
    "startedAt": "2026-07-19T10:00:00.000Z",
    "endedAt": "2026-07-19T10:30:00.000Z",
    "score": 20,
    "percentage": 80,
    "accuracy": 80,
    "totalCorrect": 20,
    "totalWrong": 5,
    "unanswered": 0,
    "status": "COMPLETED"
  }
]
```

#### Notes

- Prefer **not** seeding this collection for content packs.
- Business rule: only one active (`STARTED`) attempt per user per test.

---

### 3.10 UserAnswer

| Item | Value |
|------|--------|
| **Collection Name** | `useranswers` |
| **Model Name** | `UserAnswer` |
| **Purpose** | Per-question answers within a test attempt (**runtime data**) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `attemptId` | ObjectId | Yes | `UserAttempt` | Parent attempt |
| `questionId` | ObjectId | Yes | `Question` | Answered question |
| `selectedOption` | Mixed | No | — | String or String[] |
| `isCorrect` | Boolean | No | — | Graded result |
| `timeTaken` | Number | No | — | Seconds spent |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `attemptId` | ✓ | — | ObjectId → UserAttempt |
| `questionId` | ✓ | — | ObjectId → Question |
| `selectedOption` | | — | string or string array |
| `isCorrect` | | `false` | — |
| `timeTaken` | | `0` | min `0` |

#### Indexes

- Unique: `{ attemptId: 1, questionId: 1 }`
- `{ attemptId: 1 }`

#### Example Document

```json
{
  "_id": "665a00000000000000000091",
  "attemptId": "665a00000000000000000081",
  "questionId": "665a00000000000000000051",
  "selectedOption": "B",
  "isCorrect": true,
  "timeTaken": 42
}
```

#### Sample Documents

```json
[
  {
    "attemptId": "665a00000000000000000081",
    "questionId": "665a00000000000000000051",
    "selectedOption": "B",
    "isCorrect": true,
    "timeTaken": 42
  },
  {
    "attemptId": "665a00000000000000000081",
    "questionId": "665a00000000000000000053",
    "selectedOption": ["A", "B"],
    "isCorrect": false,
    "timeTaken": 75
  }
]
```

#### Notes

- Do not seed as static content.
- `selectedOption` must align with question `optionId` values.

---

### 3.11 TopicProgress

| Item | Value |
|------|--------|
| **Collection Name** | `topicprogresses` |
| **Model Name** | `TopicProgress` |
| **Purpose** | Per-user learning progress for a topic (**runtime data**) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `userId` | ObjectId | Yes | `User` | Learner |
| `topicId` | ObjectId | Yes | `Topic` | Tracked topic |
| `completedTheory` | Boolean | No | — | Theory finished |
| `completedExercise` | Boolean | No | — | Exercises finished |
| `completedQuestions` | Number | No | — | Correct/solved count |
| `completionPercentage` | Number | No | — | 0–100 |
| `accuracy` | Number | No | — | Rolling accuracy 0–100 |
| `averageTime` | Number | No | — | Avg seconds |
| `totalAttempts` | Number | No | — | Attempt count |
| `lastVisited` | Date | No | — | Last visit time |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `userId` | ✓ | — | ObjectId → User |
| `topicId` | ✓ | — | ObjectId → Topic |
| `completedTheory` | | `false` | — |
| `completedExercise` | | `false` | — |
| `completedQuestions` | | `0` | min `0` |
| `completionPercentage` | | `0` | 0–100 |
| `accuracy` | | `0` | 0–100 |
| `averageTime` | | `0` | min `0` |
| `totalAttempts` | | `0` | min `0` |
| `lastVisited` | | `Date.now` | — |

#### Indexes

- Unique: `{ userId: 1, topicId: 1 }`
- `{ userId: 1, lastVisited: -1 }`

#### Example Document

```json
{
  "_id": "665a000000000000000000a1",
  "userId": "665a00000000000000000099",
  "topicId": "665a00000000000000000021",
  "completedTheory": true,
  "completedExercise": false,
  "completedQuestions": 12,
  "completionPercentage": 48,
  "accuracy": 72.5,
  "averageTime": 35,
  "totalAttempts": 3,
  "lastVisited": "2026-07-20T15:00:00.000Z"
}
```

#### Sample Documents

```json
[
  {
    "userId": "665a00000000000000000099",
    "topicId": "665a00000000000000000021",
    "completedTheory": true,
    "completedExercise": true,
    "completedQuestions": 20,
    "completionPercentage": 100,
    "accuracy": 85,
    "averageTime": 30,
    "totalAttempts": 5,
    "lastVisited": "2026-07-20T15:00:00.000Z"
  },
  {
    "userId": "665a00000000000000000099",
    "topicId": "665a00000000000000000022",
    "completedTheory": false,
    "completedExercise": false,
    "completedQuestions": 0,
    "completionPercentage": 0,
    "accuracy": 0,
    "averageTime": 0,
    "totalAttempts": 0
  }
]
```

#### Notes

- Updated automatically after test submission / learning actions.
- Do not create duplicate `(userId, topicId)` pairs.

---

### 3.12 HRCategory

| Item | Value |
|------|--------|
| **Collection Name** | `hrcategories` |
| **Model Name** | `HRCategory` |
| **Purpose** | HR Interview categories — **only Freshers and Experienced** |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `title` | String | Yes | — | Category title |
| `slug` | String | Yes | — | Unique slug |
| `description` | String | No | — | Description |
| `isPublished` | Boolean | No | — | Visibility |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `title` | ✓ | — | trim |
| `slug` | ✓ | — | unique, lowercase, trim |
| `description` | | `""` | trim |
| `isPublished` | | `false` | — |

#### Indexes

- Unique: `slug`
- `{ isPublished: 1 }`

#### Example Document

```json
{
  "_id": "665a000000000000000000b1",
  "title": "Freshers",
  "slug": "freshers",
  "description": "HR questions for fresh graduates",
  "isPublished": true
}
```

#### Sample Documents

```json
[
  {
    "title": "Freshers",
    "slug": "freshers",
    "description": "Entry-level HR interview questions",
    "isPublished": true
  },
  {
    "title": "Experienced",
    "slug": "experienced",
    "description": "HR questions for experienced candidates",
    "isPublished": true
  }
]
```

#### Notes

- Do **not** add Behavioral, Leadership, Managerial, etc.
- Exactly two content categories for IndiaBIX-style HR.

---

### 3.13 HRQuestion

| Item | Value |
|------|--------|
| **Collection Name** | `hrquestions` |
| **Model Name** | `HRQuestion` |
| **Purpose** | HR interview Q&A content under Freshers / Experienced |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `categoryId` | ObjectId | Yes | `HRCategory` | Parent HR category |
| `question` | String | Yes | — | Interview question text |
| `sampleAnswer` | String | No | — | Model answer |
| `keyPoints` | String[] | No | — | Important points |
| `commonMistakes` | String[] | No | — | Mistakes to avoid |
| `interviewerTips` | String[] | No | — | Tips for candidate |
| `isPublished` | Boolean | No | — | Visibility |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `categoryId` | ✓ | — | ObjectId → HRCategory |
| `question` | ✓ | — | trim; unique per category |
| `sampleAnswer` | | `""` | trim |
| `keyPoints` | | `[]` | string array |
| `commonMistakes` | | `[]` | string array |
| `interviewerTips` | | `[]` | string array |
| `isPublished` | | `false` | — |

#### Indexes

- Unique: `{ categoryId: 1, question: 1 }`
- `{ categoryId: 1, isPublished: 1 }`
- Text index on `question`

#### Example Document

```json
{
  "_id": "665a000000000000000000c1",
  "categoryId": "665a000000000000000000b1",
  "question": "Tell me about yourself.",
  "sampleAnswer": "I am a Computer Science graduate with a strong interest in problem solving...",
  "keyPoints": [
    "Keep it under 2 minutes",
    "Cover education, skills, and goals",
    "End with why this role"
  ],
  "commonMistakes": [
    "Reciting the entire resume",
    "Talking only about personal life"
  ],
  "interviewerTips": [
    "Practice aloud",
    "Customize for the company"
  ],
  "isPublished": true
}
```

#### Sample Documents

```json
[
  {
    "categoryId": "665a000000000000000000b1",
    "question": "Tell me about yourself.",
    "sampleAnswer": "Concise professional introduction...",
    "keyPoints": ["Education", "Skills", "Goals"],
    "commonMistakes": ["Too long", "Unstructured"],
    "interviewerTips": ["Practice timing"],
    "isPublished": true
  },
  {
    "categoryId": "665a000000000000000000b1",
    "question": "Why should we hire you?",
    "sampleAnswer": "Highlight unique strengths aligned to the role...",
    "keyPoints": ["Skills match", "Culture fit", "Impact"],
    "commonMistakes": ["Generic answers"],
    "interviewerTips": ["Use examples"],
    "isPublished": true
  },
  {
    "categoryId": "665a000000000000000000b2",
    "question": "Describe a challenging project you led.",
    "sampleAnswer": "Use STAR: Situation, Task, Action, Result...",
    "keyPoints": ["Leadership", "Impact metrics"],
    "commonMistakes": ["No measurable outcome"],
    "interviewerTips": ["Quantify results"],
    "isPublished": true
  }
]
```

#### Notes

- Do **not** add `difficulty`, `tags`, `order`, `score`, `likes`, or `views`.
- Duplicate question text in the same category is rejected.

---

### 3.14 UserHRAnswer

| Item | Value |
|------|--------|
| **Collection Name** | `userhranswers` |
| **Model Name** | `UserHRAnswer` |
| **Purpose** | User-written answers to HR questions (**runtime data**) |

#### Schema Table

| Field | Type | Required | Reference | Description |
|-------|------|----------|-----------|-------------|
| `_id` | ObjectId | Auto | — | Document ID |
| `userId` | ObjectId | Yes | `User` | Author |
| `questionId` | ObjectId | Yes | `HRQuestion` | Answered HR question |
| `answer` | String | Yes | — | User answer text |
| `submittedAt` | Date | No | — | Submission time |
| `createdAt` | Date | Auto | — | Timestamp |
| `updatedAt` | Date | Auto | — | Timestamp |

#### Field Rules

| Field | Required | Default | Validation |
|-------|----------|---------|------------|
| `userId` | ✓ | — | ObjectId → User |
| `questionId` | ✓ | — | ObjectId → HRQuestion |
| `answer` | ✓ | — | trim, non-empty |
| `submittedAt` | | `Date.now` | — |

#### Indexes

- Unique: `{ userId: 1, questionId: 1 }`
- `{ userId: 1, submittedAt: -1 }`

#### Example Document

```json
{
  "_id": "665a000000000000000000d1",
  "userId": "665a00000000000000000099",
  "questionId": "665a000000000000000000c1",
  "answer": "I am a final-year CS student passionate about backend systems...",
  "submittedAt": "2026-07-20T16:00:00.000Z"
}
```

#### Sample Documents

```json
[
  {
    "userId": "665a00000000000000000099",
    "questionId": "665a000000000000000000c1",
    "answer": "My introduction focusing on academics and projects...",
    "submittedAt": "2026-07-20T16:00:00.000Z"
  },
  {
    "userId": "665a00000000000000000099",
    "questionId": "665a000000000000000000c2",
    "answer": "You should hire me because...",
    "submittedAt": "2026-07-20T16:10:00.000Z"
  }
]
```

#### Notes

- Do **not** add AI feedback, score, or rating fields.
- Prefer not seeding this in content packs.

---

## 4. JSON File Structure

Recommended content pack layout for seeding / generation:

```text
database/
└── data/
    ├── categories.json
    ├── modules.json
    ├── topics.json
    ├── theory/
    │   ├── problems-on-trains.json
    │   ├── time-and-distance.json
    │   └── profit-and-loss.json
    ├── exercises/
    │   ├── problems-on-trains.json
    │   └── number-series.json
    ├── questions/
    │   ├── problems-on-trains/
    │   │   ├── general-questions.json
    │   │   └── data-sufficiency-1.json
    │   └── number-series/
    │       └── general-questions.json
    ├── tests/
    │   ├── arithmetic-mock-1.json
    │   └── test-questions/
    │       └── arithmetic-mock-1.json
    └── hr/
        ├── categories.json
        └── questions/
            ├── freshers.json
            └── experienced.json
```

### Suggested file responsibilities

| File / Folder | Contains |
|---------------|----------|
| `categories.json` | Array of Category objects |
| `modules.json` | Array of Module objects (`categoryId` or category slug resolved at seed time) |
| `topics.json` | Array of Topic objects |
| `theory/*.json` | One Theory document per topic |
| `exercises/*.json` | Exercises for one topic |
| `questions/**/*.json` | Question arrays for one exercise |
| `tests/*.json` | Test metadata |
| `tests/test-questions/*.json` | TestQuestion mappings |
| `hr/categories.json` | Freshers + Experienced only |
| `hr/questions/*.json` | HRQuestion arrays |

### Temporary IDs in seed JSON

When preparing files before Mongo inserts, you may use temporary string keys:

```json
{
  "_seedKey": "cat-general-aptitude",
  "name": "General Aptitude",
  "slug": "general-aptitude"
}
```

Resolve `_seedKey` → real ObjectIds during insert. Production DB documents must use real ObjectIds.

---

## 5. Content Generation Guidelines

### Categories JSON

Must contain:

- `name`, `slug`
- Optional: `description`, `icon`, `order`, `isActive`

### Modules JSON

Must contain:

- `categoryId` (or resolvable category key)
- `name`, `slug`
- Optional: `description`, `icon`, `order`, `isActive`

### Topics JSON

Must contain:

- `moduleId`
- `name`, `slug`
- Optional: `description`, `estimatedTime`, `difficulty`, `order`, `isPublished`

### Theory JSON

Must contain:

- `topicId`
- Optional rich content:
  - `introduction`
  - `explanation`
  - `formulas[]` → `{ title, content }`
  - `shortcutTips[]` → `{ title, tip }`
  - `solvedExamples[]` → `{ problem, solution, steps[] }`
  - `references[]` → `{ title, url }`

### Exercises JSON

Must contain:

- `topicId`, `title`
- Optional: `description`, `order`, `isPublished`

### Questions JSON

Must contain:

- `exerciseId`
- `question`
- `options[]` → `{ optionId, text }` (minimum 2)
- `correctAnswer` (string **or** string array)
- Optional: `explanation`, `difficulty`, `marks`, `negativeMarks`, `timeLimit`, `tags[]`, `questionType`

### Tests JSON

Must contain:

- `title`, `category`, `duration`, `totalQuestions`, `passingMarks`
- Optional: `description`, `difficulty`, `isPublished`

### TestQuestions JSON

Must contain:

- `testId`, `questionId`, `order`, `marks`

### HR Categories JSON

Must contain only:

- Freshers (`slug: "freshers"`)
- Experienced (`slug: "experienced"`)

### HR Questions JSON

Must contain:

- `categoryId`, `question`
- Optional: `sampleAnswer`, `keyPoints[]`, `commonMistakes[]`, `interviewerTips[]`, `isPublished`

---

## 6. AI Prompt Guidelines

Use these rules when asking an AI model to generate content **without breaking the schema**.

### General rules for AI output

1. Output **valid JSON only** (no markdown wrappers unless requested).
2. Use **only fields listed in this document**.
3. Prefer string enums **exactly** as written (`easy`, `MCQ`, `STARTED`, etc.).
4. Do not invent fields like `likes`, `views`, `score`, `aiFeedback`, `difficulty` on HR questions.
5. Keep ObjectId fields as placeholders (`"REPLACE_TOPIC_ID"`) if real IDs are unknown.
6. Slugs must be lowercase kebab-case: `^[a-z0-9]+(?:-[a-z0-9]+)*$`.

### Theory generation prompt constraints

Ask the model to return:

```json
{
  "topicId": "REPLACE_TOPIC_ID",
  "introduction": "...",
  "explanation": "...",
  "formulas": [{ "title": "...", "content": "..." }],
  "shortcutTips": [{ "title": "...", "tip": "..." }],
  "solvedExamples": [{
    "problem": "...",
    "solution": "...",
    "steps": ["...", "..."]
  }],
  "references": [{ "title": "...", "url": "https://..." }]
}
```

Requirements:

- At least 2 formulas for quantitative topics.
- At least 2 shortcut tips.
- At least 1 solved example with numbered `steps`.
- No nested HTML unless the product explicitly supports it.
- Keep explanation clear and interview-oriented.

### Question generation prompt constraints

Ask the model to return an array of questions:

```json
[
  {
    "exerciseId": "REPLACE_EXERCISE_ID",
    "question": "...",
    "options": [
      { "optionId": "A", "text": "..." },
      { "optionId": "B", "text": "..." },
      { "optionId": "C", "text": "..." },
      { "optionId": "D", "text": "..." }
    ],
    "correctAnswer": "B",
    "explanation": "...",
    "difficulty": "medium",
    "marks": 1,
    "negativeMarks": 0.25,
    "timeLimit": 60,
    "tags": ["topic-slug"],
    "questionType": "MCQ"
  }
]
```

Rules:

- Exactly 4 options for standard MCQ (A–D).
- `correctAnswer` must equal an `optionId`.
- For `MULTIPLE_CORRECT`, `correctAnswer` must be a non-empty array of `optionId`s.
- For `TRUE_FALSE`, only options A/B (True/False).
- Explanation must justify the correct option.
- Never leave `options` with fewer than 2 items.

### Formula / shortcut tip constraints

- `formulas[].content` should be concise mathematical statements.
- `shortcutTips[].tip` should be actionable (one sentence preferred).
- Do not put full essays inside formula content.

### Solved example constraints

- `problem` states the question.
- `solution` is the final answer narrative.
- `steps` is an ordered array of intermediate reasoning strings.

### HR sample answer constraints

Ask the model to return:

```json
{
  "categoryId": "REPLACE_HR_CATEGORY_ID",
  "question": "...",
  "sampleAnswer": "...",
  "keyPoints": ["...", "..."],
  "commonMistakes": ["...", "..."],
  "interviewerTips": ["...", "..."],
  "isPublished": true
}
```

Rules:

- Sample answers should sound natural (1–3 short paragraphs).
- Provide 3–5 `keyPoints`.
- Provide 2–4 `commonMistakes`.
- Provide 2–4 `interviewerTips`.
- No scoring / AI grading fields.
- Freshers tone vs Experienced tone must match category.

### What AI must NOT generate as seed content

- `UserAttempt`
- `UserAnswer`
- `TopicProgress`
- `UserHRAnswer`

These are created by live users through APIs.

---

## 7. Global Conventions

### Timestamps

All listed models use:

- `timestamps: true` → `createdAt`, `updatedAt`
- `versionKey: false` → no `__v`

You usually **omit** timestamps in seed JSON; Mongo/Mongoose will set them.

### Soft visibility flags

| Collection | Flag | Meaning |
|------------|------|---------|
| Category / Module | `isActive` | Soft visibility |
| Topic / Exercise / Question / Test / HR* | `isPublished` | Public publish state |

### Shared enums

| Enum | Values |
|------|--------|
| Difficulty | `easy`, `medium`, `hard` |
| QuestionType | `MCQ`, `TRUE_FALSE`, `MULTIPLE_CORRECT` |
| AttemptStatus | `STARTED`, `COMPLETED`, `EXPIRED` |

### Reference cheat sheet

| Field | Points to |
|-------|-----------|
| `Module.categoryId` | Category |
| `Topic.moduleId` | Module |
| `Theory.topicId` | Topic (unique) |
| `Exercise.topicId` | Topic |
| `Question.exerciseId` | Exercise |
| `Test.category` | Category |
| `TestQuestion.testId` | Test |
| `TestQuestion.questionId` | Question |
| `UserAttempt.userId` | User |
| `UserAttempt.testId` | Test |
| `UserAnswer.attemptId` | UserAttempt |
| `UserAnswer.questionId` | Question |
| `TopicProgress.userId` | User |
| `TopicProgress.topicId` | Topic |
| `HRQuestion.categoryId` | HRCategory |
| `UserHRAnswer.userId` | User |
| `UserHRAnswer.questionId` | HRQuestion |

---

## End of Document

Use this file as the single source of truth when preparing MongoDB content packs, seed JSON, or AI-generated educational material for InterviewIQ.
