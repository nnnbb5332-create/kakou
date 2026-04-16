export const ROLE_VALUES = [
  "SUPER_ADMIN",
  "RESTAURANT_OWNER",
  "CASHIER",
  "DRIVER",
  "CUSTOMER"
] as const;

export type AppRole = (typeof ROLE_VALUES)[number];
