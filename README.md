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



## تشغيل المشروع على GitHub (بالعربي)

إذا سؤالك هو: **"كيف أشغله في GitHub؟"** فغالبًا تحتاج واحد من المسارين:

### 1) رفع الكود على GitHub (Repository)

1. أنشئ مستودع جديد في GitHub (مثلاً: `restaurant-saas`).
2. من جهازك المحلي:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```

### 2) تشغيله فعليًا (Deploy) من GitHub

أفضل خيار سريع لهذا المشروع: **Vercel + Neon/Supabase (PostgreSQL)**

#### A) تجهيز قاعدة البيانات
1. أنشئ PostgreSQL في Neon أو Supabase.
2. انسخ `DATABASE_URL`.

#### B) ربط GitHub مع Vercel
1. ادخل vercel.com وسجّل عبر GitHub.
2. اختر Import Project ثم اختر نفس المستودع.
3. أضف Environment Variables في Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PLATFORM_HOST` (مثال: `platform.com` أو دومينك)
   - `NEXT_PUBLIC_PLATFORM_HOST`
4. Deploy.

#### C) تشغيل Prisma بعد النشر
شغّل migration مرة واحدة (من CI أو local):
```bash
npx prisma migrate deploy
npx prisma generate
```

#### D) Seed بيانات تجريبية (اختياري)
```bash
npm run seed
```

## GitHub Actions (اختياري لكن مهم)

أضف workflow بسيط للتأكد من جودة الكود عند كل Push/PR:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
```

> ملاحظة: لو أردت، أقدر أضيف لك ملف GitHub Actions داخل المشروع الآن.


## لماذا ظهر خطأ "prisma: not found"؟ (توضيح مهم)

هذا الخطأ لا يعني أن الكود مكسور؛ يعني فقط أن **الحزم لم تُثبت بعد** في البيئة التي شغّلت فيها الأمر.

- أمر `npm run build` يستدعي قبله `prebuild` وفيه `prisma generate`.
- إذا لم يتم تنفيذ `npm install` أولًا، فلن يجد النظام `prisma` داخل `node_modules/.bin`.

### الطريقة الصحيحة محليًا

```bash
npm install
npm run build
```

### الطريقة الصحيحة على GitHub (Actions)

تأكد أن Workflow فيه الترتيب التالي:
1. `npm install`
2. `npx prisma generate`
3. `npm run build`

وهو موجود فعلاً في `.github/workflows/ci.yml` في هذا المشروع.

### إذا ما زال يفشل على GitHub

- تأكد أن ملف `package.json` موجود في جذر المستودع.
- تأكد أن الـ Workflow يعمل داخل نفس مسار المشروع (بدون `working-directory` خاطئ).
- أعد تشغيل الـ workflow من تبويب Actions بعد آخر Push.
