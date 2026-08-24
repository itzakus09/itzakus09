# Calisthenics AI Coach MVP

This branch contains the first production-oriented foundation for the Calisthenics AI Coach concept, without Supabase.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS v4
- PostgreSQL
- Prisma ORM
- Auth.js credentials authentication
- bcrypt password hashing
- Responsive dashboard UI

## Included now
- Dashboard, Training, Skills, Progress, Nutrition and Profile views
- Interactive workout set logging and rest timer
- Three-step fitness assessment UI
- Contextual AI Coach UI shell
- Browser video recording/upload prototype at `/video`
- PostgreSQL data model in `prisma/schema.prisma`
- User registration API with hashed passwords
- Auth.js sign-in/session handling
- User-scoped relational data model for workouts, skills, measurements, recovery, nutrition, video analyses and AI conversations
- Environment-variable template

## Production wiring still required
1. Provision a PostgreSQL database and set `DATABASE_URL`.
2. Set a strong random `AUTH_SECRET`.
3. Run `npm run db:generate` and `npm run db:migrate`.
4. Connect the dashboard workout/progress UI to Prisma server actions/API routes.
5. Add the rule-based workout/progression engine as server-side logic before AI generation.
6. Add asynchronous video-analysis workers and pose estimation.
7. Add the AI service behind authenticated server routes, never in browser code.
8. Add private object storage for photos/videos and signed URLs.
9. Add automated tests, observability, rate limits, abuse controls and final accessibility/performance checks.

## Security model
The database is accessed only through server-side Prisma code. Application routes must derive the current user from the Auth.js session and include that user ID in every query. Never trust a user-supplied user ID from the browser. Passwords are stored only as bcrypt hashes. Media should use private object storage and short-lived signed URLs.

## Deployment
Deploy the Next.js application to a Next.js-compatible host and use a managed PostgreSQL provider or your own PostgreSQL server. Keep `DATABASE_URL` and `AUTH_SECRET` only in deployment secrets, never in Git.
