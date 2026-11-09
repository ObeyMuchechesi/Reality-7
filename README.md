# Reality 7 — Heritage & Harmony

Official site for **Reality 7**, the Is'cathamiya gospel group from Matikwe, Inanda
(KwaZulu-Natal). A full MERN stack build: React + Tailwind frontend, Express +
MongoDB booking API.

- **Frontend**: React 18 (Create React App), Tailwind CSS, Framer Motion, lucide-react
- **Backend**: Node + Express, Mongoose, MongoDB Atlas
- **Hosting**: a single Vercel project — static frontend plus the Express app as a
  serverless function under `/api`

## Design

| Token | Value | Use |
| --- | --- | --- |
| Midnight | `#0B132B` | Page background, depth |
| Gold | `#D4AF37` | Accents, headings, CTAs |
| Cream | `#F4F1DE` | Body copy |
| Earth | `#8B5E3C` | Warm gradient washes |
| Sage | `#5A7D7C` | Cool gradient washes |

Cinzel for headings, Inter for body text. The Zulu beadwork motif appears as a
repeating divider (`.zulu-divider`) between sections and as a low-opacity
geometric texture (`.zulu-pattern`) behind the hero.

## Project structure

```
reality7-website/
├── api/
│   └── index.js              # Vercel serverless entry (wraps the Express app)
├── backend/
│   ├── models/Booking.js
│   ├── routes/bookings.js
│   ├── app.js                # Express app (shared by local server + Vercel)
│   ├── db.js                 # Cached Mongoose connection
│   ├── server.js             # Local dev server
│   └── .env.example
├── frontend/
│   ├── public/index.html
│   ├── src/components/       # Navbar, Hero, About, Music, TourDates, Gallery,
│   │                         # BookingForm, Footer
│   ├── src/lib/api.js        # Axios client + error messages
│   ├── tailwind.config.js
│   └── package.json
├── vercel.json
└── package.json              # API deps for the serverless function
```

## Local development

Requires Node 18+ and a MongoDB database (Atlas or local).

```bash
# 1. Dependencies
npm run install:all

# 2. Backend environment
cp backend/.env.example backend/.env   # then fill in MONGO_URI

# 3. Run the API (http://localhost:5000)
npm run dev:backend

# 4. Run the frontend (http://localhost:3000) in a second terminal
npm run dev:frontend
```

The frontend uses `http://localhost:5000/api` in development and the same-origin
`/api` path in production builds. Override either with `REACT_APP_API_URL`:

```bash
REACT_APP_API_URL=https://my-api.example.com/api npm --prefix frontend run build
```

### Environment variables (backend)

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URI` | yes | MongoDB connection string |
| `PORT` | no | Local port (default `5000`) |
| `CORS_ORIGIN` | no | Comma-separated allowed origins when the frontend is on another host |
| `ADMIN_TOKEN` | no | Enables the admin booking endpoints |

`backend/.env` is git-ignored. Never commit real credentials.

## API

Base URL: `/api`

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | public | Service health check |
| `POST` | `/bookings` | public | Create a booking request |
| `GET` | `/bookings` | admin | List bookings, newest first |
| `PATCH` | `/bookings/:id` | admin | Set status to `pending`, `confirmed` or `declined` |

Admin requests must send `x-admin-token: <ADMIN_TOKEN>`; without a configured
token these endpoints return `503` rather than exposing booking data.

Booking payload:

```json
{
  "name": "Thandi Mkhize",
  "email": "thandi@example.com",
  "phone": "+27 82 000 0000",
  "eventType": "Church Service",
  "eventDate": "2026-12-24",
  "location": "Durban, South Africa",
  "message": "Christmas service, 90 minute set."
}
```

Only those fields are accepted; `status` always starts as `pending`.

## Deployment (Vercel)

The included `vercel.json` builds the React app into `frontend/build`, serves it
statically, and rewrites `/api/*` to the `api/index.js` serverless function.

```bash
npm i -g vercel        # if needed
vercel link            # link the project once
vercel env add MONGO_URI production
vercel env add MONGO_URI preview
vercel --prod
```

Set `MONGO_URI` for both environments before the first deployment, and add
`ADMIN_TOKEN` if the admin endpoints are needed. In Atlas, allow the host's
outbound IPs (or `0.0.0.0/0` for Vercel's dynamic IPs) in the network access list.

Because the frontend and API share an origin in production, no CORS
configuration is required there.

## Content notes

- Photography is placeholder imagery from Unsplash; replace with the group's own
  photos before launch.
- Album cards drive a vinyl-style record display; the platform buttons open a
  search for the selected album on Spotify, Apple Music and YouTube. Swap in
  direct album URLs as they become available.
- Tour dates live in `frontend/src/components/TourDates.jsx`.
