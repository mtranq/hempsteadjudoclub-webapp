# Hempstead Judo Club — Next.js Website

Modernized website for Hempstead Judo Club using Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Tech
- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Tooling: ESLint/Prettier, GitHub Actions CI

## Quickstart (Windows PowerShell)

Prereqs:
- Node.js 18+ and npm

1) Install dependencies

```powershell
Push-Location .\apps\web; npm install; Pop-Location
```

2) Run the dev server

```powershell
Push-Location .\apps\web; npm run dev; Pop-Location
```

Site: http://localhost:3000

### Production build locally
```powershell
Push-Location .\apps\web; npm install; npm run build; npm run start; Pop-Location
```

### Docker (optional)
```powershell
# From repo root
docker compose up --build
```

## Project structure
- apps/web: Next.js app (single-page site with sections: About, Classes, Coaches, Membership, Contact)
- infra: reserved for future infra files
- scripts: helper scripts (PowerShell dev script starts the web app)

## CI
GitHub Actions workflow builds, typechecks, and lints the web app on push/PR to main.
File: `.github/workflows/web-ci.yml`

## Branding
- Name: Hempstead Judo Club
- Colors: Navy #1E3A8A, Gold #F0B429, White #FFFFFF

## License
MIT
