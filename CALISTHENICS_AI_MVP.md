# Calisthenics AI Coach MVP

This branch contains the first production-oriented foundation for the Calisthenics AI Coach concept.

## Included now
- Next.js App Router + TypeScript
- Tailwind CSS v4 styling foundation
- Responsive dashboard UI
- Dashboard, Training, Skills, Progress, Nutrition and Profile views
- Interactive workout set logging
- Rest timer
- Three-step fitness assessment UI
- Contextual AI Coach UI shell
- Browser video recording/upload prototype at `/video`
- Supabase browser/server clients
- Supabase auth sign-in/sign-up UI
- PostgreSQL schema for profiles, goals, equipment, workouts, skills, measurements, recovery, nutrition, video analyses and AI conversations
- Row Level Security policies for user-owned records
- Auth session refresh proxy
- Environment-variable template

## Production wiring still required
1. Create a Supabase project and run `supabase/schema.sql`.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the deployment environment.
3. Connect the workout UI to Supabase writes/reads.
4. Add the rule-based workout/progression engine as server-side logic.
5. Add asynchronous video-analysis workers and pose estimation.
6. Add the AI service behind authenticated server routes, never in browser code.
7. Add private Supabase Storage buckets and signed URLs for videos/photos.
8. Add automated tests, observability, rate limits and final accessibility/performance checks.

## Deployment
The application is intended for a Next.js-compatible host such as Vercel because it needs server-side routes, authentication/session handling and background processing. Do not publish Supabase secrets in the repository.
