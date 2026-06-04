# ProjectManager

## Description

ProjectManager is a Single Page Application (SPA) for managing internal company projects. It supports two user roles — **Manager** and **Collaborator** — with different permissions. The app uses Vanilla JavaScript (Vite), a custom hash-based router, Bootstrap 5 for styling, and `json-server` as a mock REST API.

---

## Technologies

| Technology | Purpose |
|------------|---------|
| Vite | Dev server & bundler |
| Vanilla JavaScript (ES Modules) | Application logic |
| Bootstrap 5 | UI framework |
| Bootstrap Icons | Icon library |
| json-server | Mock REST API |
| localStorage | Session persistence |

---

## Installation

```bash
npm install
```

---

## Running the Project

Open **two terminals**:

**Terminal 1 — Start json-server (mock API):**
```bash
npm run server
```
The API will be available at `http://localhost:3000`.

**Terminal 2 — Start the Vite dev server:**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

> Both servers must be running simultaneously.

---

## Running JSON Server

```bash
npm run server
# or directly:
npx json-server db.json --port 3000
```

Available endpoints:
- `GET    /users`
- `GET    /projects`
- `POST   /projects`
- `PATCH  /projects/:id`
- `DELETE /projects/:id`

---

## Test Users

| Role | Email | Password |
|------|-------|----------|
| Manager | `manager@test.com` | `123456` |
| Collaborator | `user@test.com` | `123456` |

> No user registration is available. Users are pre-loaded in `db.json`.

---

## Project Structure

```
proyecto_basico/
├── db.json                         # json-server database
├── index.html                      # App entry point
├── package.json
├── src/
│   ├── main.js                     # App bootstrap + routing init
│   ├── router/
│   │   ├── router.js               # Hash router with auth guards
│   │   └── routes.js               # Route definitions
│   ├── services/
│   │   ├── auth.service.js         # Login, logout, session
│   │   └── projects.service.js     # CRUD operations via Fetch API
│   ├── utils/
│   │   └── toast.js                # Toast notification helper
│   ├── views/
│   │   ├── home/                   # Landing page
│   │   ├── login/                  # Login form view
│   │   ├── dashboard/              # Role-based dashboard
│   │   └── projects/               # Projects CRUD view
│   ├── components/
│   │   ├── navbar/                 # App navbar (dark mode, logout)
│   │   ├── sidebar/                # Role-based sidebar navigation
│   │   ├── hero/                   # Landing hero section
│   │   ├── about/                  # About section
│   │   ├── features/               # Features section
│   │   ├── CTA/                    # Call-to-action section
│   │   └── footer/                 # Footer
│   └── styles/
│       ├── main.css                # CSS entry point
│       ├── variables.css           # CSS custom properties (light/dark)
│       └── global.css              # Global resets + dark mode overrides
```

---

## Role Permissions

### Manager
- View **all** projects
- **Create** new projects
- **Edit** any project (name, description, status, assignee)
- **Delete** any project
- Dashboard shows: total projects, active count, completed count

### Collaborator
- View **only assigned** projects
- Update the **status** of their own projects
- Cannot create, delete, or edit projects they don't own
- Dashboard shows: assigned project count and status breakdown

---

## Technical Decisions

### Hash-based SPA Routing
The router listens to the `hashchange` event and maps `#/route` paths to view render/init functions. This avoids server-side routing configuration and works cleanly with Vite's dev server.

### Authentication & Session
Credentials are validated against `json-server` via a query-string GET request. On success, user data (without the password) is persisted in `localStorage` under the key `pm_session`. The session survives page refreshes and browser restarts. Logout clears the key and redirects to `/login`.

### Route Guards
The router checks `localStorage` before rendering any private route. Unauthenticated users are redirected to `/login`; authenticated users hitting `/login` are redirected to `/dashboard`.

### Component Pattern
Each view exports an object with:
- `render()` — returns an HTML string injected into `#app`
- `init()` — async function that binds DOM events after render

### Dark Mode
The `data-theme="dark"` attribute is toggled on `<html>`. CSS custom properties in `variables.css` override colors for dark mode. The preference is saved in `localStorage` and applied before first render.

---

## Extra Features Implemented

- **Dark Mode** toggle in the navbar, persisted across sessions
- **Search** by project name or description
- **Filter** by project status
- **Toast notifications** for CRUD success and error feedback
- **Loading spinner** while fetching data
- **Form validation** with Bootstrap's native validation API
- **Password visibility toggle** on the login form
