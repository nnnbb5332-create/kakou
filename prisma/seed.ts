import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const db = new PrismaClient();

async function main() {
  const superAdminPassword = await hashPassword("admin123");

  await db.user.upsert({
    where: { email: "admin@platform.com" },
    update: {},
    create: {
      email: "admin@platform.com",
      name: "Platform Admin",
      role: "SUPER_ADMIN",
      passwordHash: superAdminPassword
    }
  });

  const tenant = await db.tenant.upsert({
    where: { slug: "alsug" },
    update: {},
    create: {
      name: "Al Sug Restaurant",
      slug: "alsug",
      locale: "en",
      theme: "neo",
      restaurant: { create: { description: "Premium Gulf cuisine" } }
    }
  });

  const ownerPassword = await hashPassword("owner123");
  const cashierPassword = await hashPassword("cashier123");
  const driverPassword = await hashPassword("driver123");

  await db.user.upsert({
    where: { email: "owner@alsug.com" },
    update: {},
    create: {
      tenantId: tenant.id,
      email: "owner@alsug.com",
      name: "Restaurant Owner",
      role: "RESTAURANT_OWNER",
      passwordHash: ownerPassword
    }
  });

  await db.user.upsert({
    where: { email: "cashier@alsug.com" },
    update: {},
    create: {
      tenantId: tenant.id,
      email: "cashier@alsug.com",
      name: "POS Cashier",
      role: "CASHIER",
      passwordHash: cashierPassword
    }
  });

  await db.user.upsert({
    where: { email: "driver@alsug.com" },
    update: {},
    create: {
      tenantId: tenant.id,
      email: "driver@alsug.com",
      name: "Driver",
      role: "DRIVER",
      passwordHash: driverPassword
    }
  });

  const mains = await db.menuCategory.upsert({
    where: { id: "mains-category" },
    update: {},
    create: {
      id: "mains-category",
      tenantId: tenant.id,
      nameEn: "Main Course",
      nameAr: "الأطباق الرئيسية"
    }
  });

  await db.menuItem.upsert({
    where: { id: "machboos" },
    update: {},
    create: {
      id: "machboos",
      tenantId: tenant.id,
      categoryId: mains.id,
      nameEn: "Chicken Machboos",
      nameAr: "مجبوس دجاج",
      price: 12.5
    }
  });
}

main().finally(async () => {
  await db.$disconnect();
});
