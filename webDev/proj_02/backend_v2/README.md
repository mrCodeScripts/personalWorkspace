# backend_v2

This is a TypeScript-based Express server with Prisma as the ORM. It provides a minimal skeleton and can be extended for authentication, APIs, sockets, etc.

## Setup

1. **Install dependencies**
   ```bash
   cd backend_v2
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.sample .env
   # then edit .env with your database credentials
   ```

3. **Generate Prisma client & migrate**
   ```bash
   npm run prisma:generate       # generate client
   npm run prisma:migrate       # run migrations (creates tables)
   ```

4. **Run in development**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   node dist/server.js
   ```

## Folder structure

```
backend_v2/
├── package.json
├── tsconfig.json
├── schema.prisma     (Prisma schema)
├── .env              (not committed)
├── src/
│   ├── server.ts     (entry point)
│   ├── prisma.ts     (Prisma client instance)
│   └── routes/
│       └── user.ts   (example route)
└── README.md
```

## Notes

- Add new routes under `src/routes` and import them in `server.ts`.
- The `User` and `SocialAccount` models are defined in `schema.prisma` already.
- Use `ts-node-dev` for fast development restarts.
