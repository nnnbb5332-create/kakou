import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { slugifyRestaurantName } from "@/lib/tenant";
import { hashPassword } from "@/lib/auth";

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  ownerEmail: z.string().email(),
  ownerName: z.string().min(2),
  ownerPassword: z.string().min(6).default("owner123")
});

export async function GET() {
  const restaurants = await db.tenant.findMany({
    include: { restaurant: true, users: true, subscriptions: true }
  });

  return NextResponse.json(restaurants);
}

export async function POST(request: Request) {
  const data = createSchema.parse(await request.json());
  const baseSlug = data.slug ?? slugifyRestaurantName(data.name);

  let slug = baseSlug;
  let counter = 1;
  while (await db.tenant.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const ownerPasswordHash = await hashPassword(data.ownerPassword);

  const tenant = await db.tenant.create({
    data: {
      name: data.name,
      slug,
      restaurant: { create: {} },
      users: {
        create: {
          email: data.ownerEmail,
          name: data.ownerName,
          passwordHash: ownerPasswordHash,
          role: "RESTAURANT_OWNER"
        }
      }
    }
  });

  return NextResponse.json({ tenant, subdomain: `https://${tenant.slug}.${process.env.PLATFORM_HOST || "platform.com"}` }, { status: 201 });
}
