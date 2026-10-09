# TaskFlow — Project & Task Management

TaskFlow is a full-stack MERN-style task management application with a React + Vite frontend and an Express + MongoDB backend. It supports task creation, viewing, updating, deletion, and importing legacy tasks stored in the browser.

## Prerequisites

- Node.js 20+
- npm
- MongoDB 6+ (local installation) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### Local MongoDB on macOS

**Using Homebrew**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Using Docker**

```bash
docker run -d --name taskflow-mongo -p 27017:27017 mongo:7
```

Default MongoDB connection string:

```text
mongodb://127.0.0.1:27017/taskflow
```

If you already have a MongoDB instance or Docker container running, use that instance instead of starting another one.

## Setup

Run these commands from the project root:

```bash
npm install
npm install --prefix server
```

Create the backend environment file:

```bash
cp server/.env.example server/.env
```

The frontend environment file is optional. Create it only if you need to override the default API URL:

```bash
cp .env.example .env.local
```

Edit `server/.env` and configure `MONGODB_URI` and `CORS_ORIGIN` if needed. If you created `.env.local`, set `VITE_API_URL` to the API URL you want the frontend to use.

**Never commit real environment files or database credentials.** The example environment files contain configuration templates, not secrets.

## Run the application

### Start the backend API

```bash
npm run dev:server
```

### Start the frontend

In a separate terminal:

```bash
npm run dev
```

### Start both

If the project’s `dev:all` script is configured for your environment, you can start both services with:

```bash
npm run dev:all
```

With the default configuration:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Health endpoint: http://localhost:5001/api/health

The backend port defaults to `5001` in `server/.env.example` and the source configuration. Port `5000` is deliberately not used as the default API port because it may already be occupied on macOS.

## Custom local ports

If a default port is occupied, choose available ports and keep the frontend and backend configuration consistent.

For example, to run the API on port `5002` and Vite on port `5174`, configure the following values.

In `server/.env`:

```dotenv
PORT=5002
CORS_ORIGIN=http://localhost:5174
```

In the project-root `.env.local`:

```dotenv
VITE_API_URL=http://localhost:5002/api
```

Start the backend using your normal backend development command. Start Vite on the chosen port:

```bash
npm run dev -- --port 5174
```

Then open http://localhost:5174.

Make sure `CORS_ORIGIN` matches the frontend origin exactly, and `VITE_API_URL` points to the backend API. Restart the development servers after changing environment variables.

## Environment variables

| File | Variable | Purpose |
|---|---|---|
| `server/.env` | `PORT` | Backend API port; example default is `5001` |
| `server/.env` | `MONGODB_URI` | MongoDB connection string |
| `server/.env` | `CORS_ORIGIN` | Allowed frontend origin; example default is `http://localhost:5173` |
| `.env.local` | `VITE_API_URL` | Optional frontend API URL override; default is `http://localhost:5001/api` |

The Vite frontend normally uses the default API URL defined in the source configuration. You do not need `.env.local` unless you want to override that value.

## API endpoints

The API base URL is `http://localhost:5001` by default.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check service and MongoDB health |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks/:id` | Retrieve one task |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Partially update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

If you configure a custom backend port, use that port instead of `5001`.

### Task JSON shape

A task returned by the API may contain fields such as:

```json
{
  "id": "665f1c2e3b4a5d6e7f890123",
  "title": "Prepare project report",
  "description": "Complete the project documentation",
  "status": "todo",
  "priority": "medium",
  "dueDate": null,
  "assigneeId": "user-1",
  "createdAt": "2026-10-09T10:00:00.000Z",
  "updatedAt": "2026-10-09T10:00:00.000Z"
}
```

Supported task status values:

- `todo`
- `in_progress`
- `review`
- `done`

Supported priority values:

- `low`
- `medium`
- `high`
- `urgent`

The exact fields accepted and returned are determined by the current API implementation.

## Testing

### API integration tests

Run:

```bash
npm run test:api
```

The API integration tests use an in-memory MongoDB setup, so a local MongoDB instance is not required for that test suite.

### Frontend production build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

Review the command output for errors and warnings.

### Manual API smoke test

Start the backend and ensure MongoDB is available. Then run these commands from your terminal:

```bash
API_PORT=5001
curl -s "http://localhost:${API_PORT}/api/health"
curl -s "http://localhost:${API_PORT}/api/tasks"
```

Change `API_PORT` if your backend is running on another port. If `jq` is installed and you want formatted JSON output, pipe either command to `jq`:

```bash
curl -s "http://localhost:${API_PORT}/api/health" | jq
curl -s "http://localhost:${API_PORT}/api/tasks" | jq
```

## Local task migration

If you used the frontend before the API was available, existing tasks may still be stored in browser `localStorage` under the `taskflow_tasks` key.

When the API returns an empty task list, the UI can offer a one-time **Import local tasks** banner. Importing posts the local tasks to the API and clears the legacy task storage. Profile settings remain local.

## Project structure

```text
taskflow/
├── src/
│   ├── api/              # API client and task endpoints
│   ├── context/          # Task state and provider
│   └── ...               # React components and application code
├── server/
│   └── src/
│       ├── config/       # Environment and MongoDB configuration
│       ├── controllers/  # Request handlers
│       ├── middleware/   # Express middleware
│       ├── models/       # Mongoose models
│       ├── routes/       # API routes
│       └── utils/        # Shared utilities
├── .env.example          # Frontend environment template
├── .gitignore
└── package.json          # Frontend scripts, including dev:all
```

## CodeZero confirmation

CodeZero was used during repository review and development support to inspect the project structure, review backend API and environment configuration, investigate local port conflicts, and check development and build command output.

## AI Development Experience

AI-assisted development support was used for the following tasks:

- Inspecting the React/Vite frontend and Express/Mongoose backend structure.
- Reviewing API endpoints against the route and controller implementation.
- Checking MongoDB connection configuration and environment examples.
- Reviewing Git hygiene, including ignored environment files and dependency folders.
- Diagnosing local port conflicts and aligning `PORT`, `CORS_ORIGIN`, and `VITE_API_URL`.

AI assistance was used as a development aid; application behavior and command results should be verified against the actual project.

## Possible future improvements

- Add JWT authentication and user-scoped tasks.
- Implement a persistent activity feed API.
- Add workspace-scoped tasks using a `workspaceId`.
- Deploy the API and configure the production frontend API URL.
