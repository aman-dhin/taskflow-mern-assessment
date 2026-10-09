# TaskFlow — Project & Task Management

Full-stack MERN-style task dashboard: React + Vite frontend and Express + MongoDB API.

## Prerequisites

- Node.js 20+
- MongoDB 6+ (local install) **or** a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### Local MongoDB (macOS examples)

**Homebrew**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Docker**

```bash
docker run -d --name taskflow-mongo -p 27017:27017 mongo:7
```

Default connection string: `mongodb://127.0.0.1:27017/taskflow`

## Setup

```bash
# From project root
npm install
npm install --prefix server

# Backend environment
cp server/.env.example server/.env

# Frontend environment (optional — defaults to http://localhost:5000/api)
cp .env.example .env.local
```

Edit `server/.env` with your `MONGODB_URI` and `CORS_ORIGIN` if needed.

## Run

**API only**

```bash
npm run dev:server
```

**Frontend only**

```bash
npm run dev
```

**Both (recommended for development)**

```bash
npm run dev:all
```

- Frontend: http://localhost:5173
- API: http://localhost:5001 (default in `.env.example`; macOS often reserves port 5000 for AirPlay)

## Environment variables

| Location | Variable | Description |
|----------|----------|-------------|
| `server/.env` | `PORT` | API port (default `5001` in example) |
| `server/.env` | `MONGODB_URI` | MongoDB connection string |
| `server/.env` | `CORS_ORIGIN` | Vite dev URL (default `http://localhost:5173`) |
| `.env.local` | `VITE_API_URL` | API base URL (default `http://localhost:5001/api`) |

Never commit real `.env` files or database credentials.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Service + MongoDB status |
| GET | `/api/tasks` | List tasks (newest updated first) |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Partial update |
| DELETE | `/api/tasks/:id` | Delete task |

### Task JSON shape (API ↔ frontend)

```json
{
  "id": "665f1c2e3b4a5d6e7f890123",
  "title": "string",
  "description": "string",
  "status": "todo | in_progress | review | done",
  "priority": "low | medium | high | urgent",
  "dueDate": "ISO-8601 string or null",
  "assigneeId": "user-1 | user-2 | user-3 | user-4",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Testing

**Frontend build**

```bash
npm run build
npm run lint
```

**API integration tests** (uses in-memory MongoDB — no local MongoDB required)

```bash
npm run test:api
```

**Manual smoke test** (with API + MongoDB running)

```bash
curl -s http://localhost:5001/api/health | jq
curl -s http://localhost:5001/api/tasks | jq
```

## Local task migration

If you used the frontend before the API existed, tasks may still be in `localStorage` under `taskflow_tasks`. When the API returns an empty list, the UI offers a one-time **Import local tasks** banner. Import posts each task to the API and clears legacy local task storage. Profile settings remain local.

## Project structure

```
taskflow/
├── src/                 # React frontend
│   ├── api/             # fetch client + task endpoints
│   ├── context/         # TaskProvider (API-backed)
│   └── ...
├── server/
│   └── src/
│       ├── config/      # env + MongoDB
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── utils/
└── package.json         # frontend scripts + dev:all
```

## Next steps (optional)

- JWT authentication and user-scoped tasks
- Real activity feed API
- Workspace-scoped tasks (`workspaceId` on documents)
- Deploy API and set production `VITE_API_URL`
