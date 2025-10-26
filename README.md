# Hempstead Judo Club — Go + Next.js Monorepo

Modernized website for Hempstead Judo Club using Next.js 14 (App Router) for the landing site and a Go (chi) API service.

## Tech
- Frontend: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Go 1.22, chi, CORS, zerolog
- Tooling: Docker, docker-compose, ESLint/Prettier (web)

## Quickstart (Windows PowerShell)

Prereqs:
- Node.js 18+ and npm
- Go 1.22+
- Docker Desktop (optional for docker-compose)

1) Copy environment variables

```powershell
Copy-Item .env.example .env -Force
```

2) Install web dependencies

```powershell
Push-Location .\apps\web; npm install; Pop-Location
```

3) Run API and Web in separate terminals

- API
```powershell
Push-Location .\apps\api; go run ./cmd/server; Pop-Location
```

- Web
```powershell
Push-Location .\apps\web; npm run dev; Pop-Location
```

Web: http://localhost:3000
API: http://localhost:8080

### Using Docker Compose (optional)
```powershell
# From repo root
docker compose up --build
```

## Environment variables
Create a `.env` at repo root (or copy from `.env.example`).
- NEXT_PUBLIC_API_URL=http://localhost:8080
- API_PORT=8080
- CORS_ALLOWED_ORIGINS=http://localhost:3000

## Project structure
- apps/web: Next.js app (landing pages and UI)
- apps/api: Go API (health, classes, contact)
- infra: reserved for future infra files

## Branding
- Name: Hempstead Judo Club
- Colors: Navy #0A2342, Gold #F0B429, White #FFFFFF

## License
MIT
