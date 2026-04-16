# Multi-tenant Restaurant Management SaaS

A full-stack Next.js + PostgreSQL (Prisma) SaaS starter for restaurant operations with isolated tenants, hidden role logins, and dedicated dashboards.

## Implemented Features

- **Multi-tenant subdomain routing** using wildcard host parsing (`*.platform.com`) with tenant-aware rendering.
- **Separate hidden login URLs per role**:
  - `/auth/platform-owner/signin`
  - `/auth/restaurant-owner/signin`
  - `/auth/cashier/signin`
  - `/auth/driver/signin`
- **JWT auth** with HTTP-only cookie sessions.
- **RBAC helper matrix** for role permission checks.
- **Platform Owner dashboard** with global management + analytics summary.
- **Restaurant Owner dashboard** with bilingual (EN/AR RTL) analytics and operations overview.
- **Cashier POS dashboard** focused on fast order flow + payment simulation.
- **Delivery Driver dashboard** for delivery state updates and history.
- **Public tenant page by subdomain**: menu, branding, pricing.
- **10 restaurant themes prepared** (catalog and assignment support in data model/UI).
- **Dark mode compatible global styles**.
- **Core API modules**: login, restaurant provisioning with unique subdomain generation, order creation/listing.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- JOSE + bcryptjs for auth

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Run Prisma migration and generate client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

## Subdomain Routing (Wildcard)

- Configure DNS wildcard record: `*.platform.com` -> your app entrypoint.
- Requests to `https://alsug.platform.com` are parsed and rewritten to internal tenant routes.
- Tenant isolation is enforced with `tenantId` on all core business entities.

## Custom Domain Support (Advanced)

Schema includes `Tenant.customDomain` for mapping branded domains like `www.alsug.com`.
To enable in production:
- Add domain ownership verification flow.
- Auto-provision SSL certificate (e.g., Let's Encrypt via reverse proxy).
- Bind verified domain to tenant lookup before subdomain fallback.

## API Documentation

See [`docs/API.md`](docs/API.md).

## Security Notes

- Replace placeholder owner password hash during restaurant creation flow.
- Set strong JWT secret in production.
- Add CSRF protection and refresh token rotation for hardening.

