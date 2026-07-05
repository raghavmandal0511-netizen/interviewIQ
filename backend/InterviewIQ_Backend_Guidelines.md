# InterviewIQ Backend Architecture & Naming Convention

## Project Structure

``` text
src/
├── app.js
├── server.js
├── config/
├── database/
│   ├── connection.js
│   ├── models/
│   │   ├── User.js
│   │   ├── UserProfile.js
│   │   ├── AptitudeCategory.js
│   │   ├── AptitudeTopic.js
│   │   ├── AptitudeContent.js
│   │   ├── AptitudeQuestion.js
│   │   ├── UserProgress.js
│   │   └── Bookmark.js
│   └── seed/
├── modules/
│   ├── auth/
│   ├── user/
│   └── aptitude/
├── middleware/
├── shared/
│   ├── helpers/
│   ├── services/
│   └── validators/
├── utils/
└── routes/
```

## Naming Convention

### Folders

Use lowercase: - auth - user - aptitude - database - models -
middleware - routes - utils - shared

### Models (PascalCase)

-   User.js
-   UserProfile.js
-   AptitudeCategory.js
-   AptitudeTopic.js
-   AptitudeContent.js
-   AptitudeQuestion.js
-   UserProgress.js
-   Bookmark.js

### Files

-   auth.controller.js
-   auth.service.js
-   auth.routes.js
-   auth.validation.js
-   user.controller.js
-   user.service.js
-   user.routes.js
-   aptitude.controller.js
-   aptitude.service.js
-   aptitude.routes.js

### Variables

Use camelCase: - userProfile - aptitudeTopic - userProgress

### Functions

Use verbs: - register() - login() - logout() - getProfile() -
updateProfile() - getCategories() - getTopics() - getContent() -
getQuestions() - submitAnswer() - addBookmark() - removeBookmark() -
updateProgress()

### API Endpoints

-   /api/users
-   /api/categories
-   /api/topics
-   /api/content
-   /api/questions
-   /api/bookmarks
-   /api/progress

## Layer Responsibilities

### Controller

-   Receive request
-   Call service
-   Return response

### Service

-   Business logic
-   Database operations
-   Progress calculation
-   Answer checking

### Model

-   Mongoose schema only

## Phase 1 Modules

-   Authentication
-   User
-   Aptitude

Future modules: - Programming - Coding - AI - Resume - Companies - Admin
