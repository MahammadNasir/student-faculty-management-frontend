# Student Faculty Management — Frontend

A simple React + Vite frontend for managing students and faculty in an admin dashboard.

**Tech stack**
- React 19 (via Vite)
- Vite for bundling/dev server
- Axios for API requests
- React Router for routing

**Features**
- Authentication (login/logout)
- Dashboard with student and faculty views
- Create and edit users and biodata
- Protected routes for admin/super-admin

**Getting started**

Prerequisites

- Node.js (v16+) and npm or yarn

Install

```bash
npm install
# or
yarn
```

Run (development)

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Lint

```bash
npm run lint
```

**Project structure (important files)**

- [src/main.jsx](src/main.jsx) — app entry
- [src/App.jsx](src/App.jsx) — main app layout and routes
- [src/Components/Navbar.jsx](src/Components/Navbar.jsx) — navigation
- [src/Components/login.jsx](src/Components/login.jsx) — login page
- [src/Components/Dashboard.css](src/Components/Dashboard.css) — dashboard styles
- [src/Services/ApiService.js](src/Services/ApiService.js) — central API client
- [index.html](index.html) — Vite HTML template

**API**

The frontend uses a centralized API client at [src/Services/ApiService.js](src/Services/ApiService.js). Configure the backend base URL there or via environment variables before building for production.

**Notes & next steps**

- This repo contains the frontend only. You will need a backend providing authentication and user endpoints.
- To add environment-specific settings, create an `.env` file and reference `import.meta.env` values in the API service.

If you'd like, I can:

- Add a CONTRIBUTING guide
- Wire up environment variable examples
- Run the dev server and verify routes

---
Generated and added by assistant on request.
