# LeadFlow CRM

LeadFlow CRM is a full-stack customer relationship management application built with React, Vite, Express, and MongoDB. The app supports secure signup/signin, authenticated session validation, lead CRUD operations, dashboard analytics, search/filtering, pagination, and CSV export.

## Features

- User authentication with signup and signin
- JWT stored in HTTP-only cookies
- Session validation via `/me` endpoint
- Protected React routes for authenticated users
- Home landing page after login
- Dashboard with lead stats cards and recent leads
- Add, edit, delete leads with secure backend routes
- Search by name or company, status filter, alphabetical sort
- Paginated lead fetching and table view
- Download leads as CSV
- Reports page for aggregated lead data
- Responsive UI with Tailwind CSS and toast notifications

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
  - Cookie-based auth with `cookie-parser`
  - CORS support for frontend communication

## Repository Structure

- backend
  - `app.js` — Express server setup, CORS, cookies, auth, and routes
  - `controllers/` — signup/signin, auth middleware, lead CRUD, search, pagination, and token generation
  - `models/` — `User` and `Lead` schemas
  - `routes/` — auth and lead API routes

- frontend
  - `src/App.jsx` — protected routes and user session loading
  - `src/AuthContext.jsx` — auth context provider
  - `src/pages/` — `HomePage`, `Dashboard`, `Reports`, `AddLead`, `EditLead`, `Signin`, `Signup`
  - `src/components/` — `SideBar`, `Main`, `InfoCards`, `LeadStatusChart`, `Pagination`, `SignOutButton`

## Environment Setup

### Backend

Create `backend/.env` with:

```env
MONGODB_URI=<your-mongodb-connection-string>
PORT=8080
CLIENT_URL=http://localhost:5173
JWT_SECRET=<your_jwt_secret>
```

### Frontend

Create `frontend/.env` with:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Getting Started

### Backend

```bash
cd backend
npm install
node app.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Run Locally

From the project root:

```bash
npm --prefix backend install
npm --prefix frontend install
node backend/app.js
npm --prefix frontend run dev
```

## Notes

- The frontend uses `VITE_API_BASE_URL` to connect to the backend API.
- The backend exposes authentication routes under `/api/auth` and lead routes under `/api`.
- The app uses protected routing to keep `/`, `/dashboard`, `/add-lead`, `/edit-lead/:id`, and `/reports` available only to authenticated users.
- CSV export is handled client-side using `papaparse`.
- Pagination and cursor-based lead fetch support is available through `/api/lead-by-count`.
