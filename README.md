# node-mongo-envs

Simple Node.js + Express + MongoDB (Mongoose) API with environment-specific
configuration for **staging**, **preprod** and **prod**, loaded dynamically from `NODE_ENV`.

## Setup

```bash
npm install
cp .env.staging.example .env.staging   # same for preprod / prod
```

## Run

| Environment | Command                 | Env file       | Default port |
|-------------|-------------------------|----------------|--------------|
| staging     | `npm run start:staging` | `.env.staging` | 3001         |
| preprod     | `npm run start:preprod` | `.env.preprod` | 3002         |
| prod        | `npm run start:prod`    | `.env.prod`    | 3000         |

`src/config/index.js` reads `NODE_ENV`, rejects unknown environments, loads the
matching `.env.<env>` file and validates the required variables (`PORT`, `MONGO_URI`).
Real `.env.*` files are git-ignored; only `.env.*.example` templates are committed.

## Structure

```
src/
  config/        env loader + MongoDB connection
  models/        Mongoose schemas
  services/      business logic (CRUD)
  controllers/   HTTP request/response handling
  routes/        Express routers
  middlewares/   404 + centralized error handling
  utils/         shared helpers
  app.js         Express app
  server.js      entry point (DB connect, listen, graceful shutdown)
```

## API — `/api/products`

| Method | Route               | Description      |
|--------|---------------------|------------------|
| GET    | `/health`           | health + env     |
| POST   | `/api/products`     | create product   |
| GET    | `/api/products`     | list products    |
| GET    | `/api/products/:id` | get one product  |
| PUT    | `/api/products/:id` | update product   |
| DELETE | `/api/products/:id` | delete product   |

Body example: `{ "name": "Keyboard", "price": 49.9, "inStock": true }`

## Git workflow

Branches:

- `main` — production (tagged releases)
- `preprod` — pre-production
- `staging` — staging / QA
- `develop` — integration branch
- `feature/*`, `docs/*` — work branches created from `develop`
- `release/*` — release preparation, created from `develop`

Flow:

```
feature/* ──► develop ──► release/x.y.z ──► staging ──► preprod ──► main (tag vX.Y.Z)
                 ▲                                                   │
                 └──────────────────── back-merge ───────────────────┘
```

All merges use `--no-ff` so every feature stays visible in the history.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/),
enforced by **husky** + **commitlint** (`@commitlint/config-conventional`) on the
`commit-msg` hook, e.g. `feat(product): add product service with crud operations`.
