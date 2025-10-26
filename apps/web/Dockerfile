# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; else npm i; fi
COPY . .
RUN npm run build || echo "Skipping build in dev"

# Dev stage
FROM node:18-alpine
WORKDIR /app
ENV PORT=3000
COPY --from=builder /app /app
EXPOSE 3000
CMD ["npm","run","dev"]
