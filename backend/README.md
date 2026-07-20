# InterviewIQ Backend

This is the backend service for the InterviewIQ platform. It is built with Node.js and Express, and uses MongoDB (via Mongoose) for data storage.

For full architecture, API reference, data models, and testing documentation, see [backend.md](./backend.md).

## Stack
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcrypt

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables (create a `.env` file based on your configuration).

3. Start the development server:
   ```bash
   npm run dev
   ```

The server uses `nodemon` for automatic restarts during development.
