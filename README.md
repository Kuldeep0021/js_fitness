# JS Fitness — Local development & Docker

This README covers running the backend and MongoDB locally via Docker Compose and common troubleshooting commands.

Prerequisites
- Docker and Docker Compose (Docker Desktop) installed.

Quick start (from repository root)

```bash
# build and start services
docker compose up --build

# or run detached
docker compose up --build -d
```

Stop and remove containers

```bash
docker compose down
```

View logs

```bash
# all services
docker compose logs -f

# backend only
docker compose logs -f backend
```

Rebuild backend image only

```bash
docker compose build backend
docker compose up -d backend
```

Reset MongoDB data (careful — this deletes DB files)

```bash
docker compose down
docker volume rm jsfitness_mongo_data
docker compose up -d
```

Connect to MongoDB from host (requires mongo shell installed) or use a GUI

```bash
mongo "mongodb://localhost:27017/jsfitness"
```

Common issues
- Backend not starting: check `backend/.env` has `MONGO_URI` and `JWT_SECRET` set.
- Port conflicts: ensure ports `5000` and `27017` are free or change mappings in `docker-compose.yml`.
- If source changes are not picked up during local dev, ensure you are using `docker-compose.override.yml` (it mounts `./backend` into the container and uses `nodemon`).

If you want, I can add a `docker-compose.dev.yml` variant that exposes additional debugging ports or creates an admin user automatically.
