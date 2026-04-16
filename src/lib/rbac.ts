import { Role } from "@prisma/client";

export const roleLoginPath: Record<Role, string> = {
  SUPER_ADMIN: "/auth/platform-owner/signin",
  RESTAURANT_OWNER: "/auth/restaurant-owner/signin",
  CASHIER: "/auth/cashier/signin",
  DRIVER: "/auth/driver/signin",
  CUSTOMER: "/tenant/signin"
};

export function canAccess(role: Role, resource: string) {
  const matrix: Record<Role, string[]> = {
    SUPER_ADMIN: ["*"],
    RESTAURANT_OWNER: ["tenant:*", "orders:*", "menu:*", "employees:*", "analytics:read"],
    CASHIER: ["orders:create", "orders:read", "payments:create", "loyalty:redeem"],
    DRIVER: ["deliveries:read", "deliveries:update"],
    CUSTOMER: ["profile:read", "orders:read", "loyalty:read"]
  };

  const allowed = matrix[role];
  return allowed.includes("*") || allowed.includes(resource);
}
