# RL Analytics Web

Frontend for the Rocket League analytics platform. This app provides Epic login, profile/account linking, replay upload management, and match analytics views powered by a backend API.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Features

- Epic Games OAuth login entrypoint
- Session-aware navigation and server-side auth checks
- Player profile with linked platform account management
- Replay upload flow with upload history and delete actions
- Public recent match feed with pagination
- Personal match history with career statistics
- Detailed per-match team/player stat breakdown

## Routes

- `/` - Home feed (recent uploads)
- `/login` - Epic login gateway
- `/profile` - Player profile and platform linking
- `/profile/matches` - Personal match history + career stats
- `/upload_replay` - Upload new replay + manage uploaded matches
- `/match/[id]` - Detailed match page
- `/api/auth/epic` - Starts Epic OAuth redirect flow

## Prerequisites

1. Node.js 20+ recommended
2. npm
3. Backend API running locally on `http://localhost:8000` (or `http://127.0.0.1:8000`)

The frontend currently calls backend endpoints directly at localhost (for example: `user_info`, `user_matches`, `upload_replay`, and `matches/:id`).

## Environment Variables

Create a `.env.local` file in the project root with:

```env
EPIC_CLIENT_ID=your_epic_client_id
EPIC_REDIRECT_URI=your_epic_redirect_uri
EPIC_SCOPES=basic_profile
```

Notes:

- `EPIC_REDIRECT_URI` must match your Epic app configuration.
- Session and state cookies are handled via Next.js route/server actions.

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Backend Integration Notes

- Auth/session behavior expects an `epic_session` cookie.
- Logout uses a Next.js server action in the navbar and also attempts a backend logout call.
- Some pages intentionally use `cache: 'no-store'` for user-specific data.

## Troubleshooting

- If login redirects loop, verify backend auth endpoints and cookie domain/samesite settings.
- If profile or personal match pages bounce to home/login, confirm `epic_session` is being set by backend callbacks.
- If match data is empty, confirm backend endpoints are reachable at port `8000`.
