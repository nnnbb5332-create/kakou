# API Reference

Base path: `/api`

## Authentication

### `POST /api/auth/login`
Role-specific sign-in endpoint used by hidden login pages.

**Body**
```json
{
  "email": "admin@platform.com",
  "password": "secret123",
  "role": "SUPER_ADMIN"
}
```

**Response**
- `200 OK`: sets `session` HTTP-only cookie + returns role.
- `401 Unauthorized`: invalid credentials or mismatched role.

---

## Restaurants (Super Admin)

### `GET /api/restaurants`
Returns all tenants + related restaurant/users/subscriptions.

### `POST /api/restaurants`
Creates new tenant, restaurant profile, and initial owner account with unique slug/subdomain.

**Body**
```json
{
  "name": "Al Sug",
  "slug": "alsug",
  "ownerEmail": "owner@alsug.com",
  "ownerName": "Ali"
}
```

**Behavior**
- If slug exists, auto-increments: `alsug-1`, `alsug-2`, etc.
- Returns generated URL: `https://{slug}.platform.com`.

---

## Orders (POS / Owner)

### `GET /api/orders?tenantId=<tenantId>`
Lists tenant orders with line items.

### `POST /api/orders`
Creates a POS order with discounts and loyalty redemption.

**Body**
```json
{
  "tenantId": "clx...",
  "paymentMethod": "cash",
  "discount": 5,
  "loyaltyRedeemed": 200,
  "items": [
    { "menuItemId": "clx-item-1", "quantity": 2 }
  ]
}
```

---

## Planned Extensions

- WebSocket channel for real-time order updates and driver events.
- Payment gateway integration.
- QR menu generator endpoint.
- AI insights endpoint for peak-hour and bestseller predictions.
- Ads/banners injection API for super admin.
