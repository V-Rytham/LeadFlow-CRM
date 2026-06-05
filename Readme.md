# LeadFlow CRM

LeadFlow CRM is a full-stack lead management application built with React, Vite, Express, and MongoDB. It provides secure email/username authentication, protected client-side routing, lead CRUD management, lead analytics, and CSV export.

## Features

- User authentication with signup / signin
- JWT auth stored in HTTP-only cookies
- Protected React routes for authenticated users
- Lead dashboard with search, filtering, and sorting
- Add, edit, and delete leads
- Lead analytics with status chart visualization
- Export leads as CSV
- Responsive UI with Tailwind CSS

## Tech Stack

- Frontend
  - React 19
  - Vite
  - React Router Dom
  - Axios
  - Tailwind CSS
  - Recharts
  - React Toastify
  - PapaParse

- Backend
  - Node.js + Express
  - MongoDB + Mongoose
  - JWT authentication
  - Cookie-based auth
  - CORS support

## Repository Structure

- backend
  - app.js — Express server setup
  - `controllers/` — auth, lead operations, and middleware
  - `models/` — `User` and `Lead` schemas
  - `routes/` — auth and lead API routes

- frontend
  - `src/App.jsx` — route protection and auth context
  - `src/AuthContext.jsx` — user context provider
  - `src/pages/` — Signin, Signup, HomePage, Dashboard, Reports, AddLead, EditLead
  - `src/components/` — sidebar, lead table, analytics chart, info cards, sign-out

## Getting Started

### Backend

1. `cd backend`
2. `npm install`
3. Create .env with:
   - `MONGODB_URI`
   - `PORT=8080`
   - `CLIENT_URL=http://localhost:5173`
   - `JWT_SECRET=your_jwt_secret`
4. `node app.js`

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Frontend expects the backend API at `http://localhost:8080`.

## Run Locally

From project root:

```bash
cd backend && npm install
cd ../frontend && npm install
node ../backend/app.js
npm --prefix frontend run dev
```

## Notes

- Auth uses a secure cookie token and `/me` session endpoint.
- Protected routes redirect unauthenticated users to `/signin`.
- Toast notifications are provided by `react-toastify`.
- Lead analytics are powered by `recharts`.