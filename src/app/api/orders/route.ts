import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  tenantId: z.string(),
  paymentMethod: z.enum(["cash", "card"]),
  discount: z.number().default(0),
  loyaltyRedeemed: z.number().default(0),
  items: z.array(z.object({ menuItemId: z.string(), quantity: z.number().min(1) }))
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get("tenantId");
  if (!tenantId) return NextResponse.json({ error: "tenantId is required" }, { status: 400 });

  const orders = await db.order.findMany({ where: { tenantId }, include: { items: true } });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const data = schema.parse(await request.json());
  const menuItems = await db.menuItem.findMany({ where: { id: { in: data.items.map((item) => item.menuItemId) } } });

  const subtotal = data.items.reduce((acc, line) => {
    const item = menuItems.find((m) => m.id === line.menuItemId);
    return acc + (item ? Number(item.price) * line.quantity : 0);
  }, 0);

  const total = Math.max(0, subtotal - data.discount - data.loyaltyRedeemed / 100);

  const order = await db.order.create({
    data: {
      tenantId: data.tenantId,
      paymentMethod: data.paymentMethod,
      subtotal,
      discount: data.discount,
      loyaltyRedeemed: data.loyaltyRedeemed,
      total,
      items: {
        create: data.items.map((line) => {
          const item = menuItems.find((m) => m.id === line.menuItemId);
          return {
            menuItemId: line.menuItemId,
            quantity: line.quantity,
            unitPrice: item?.price ?? 0
          };
        })
      }
    },
    include: { items: true }
  });

  return NextResponse.json(order, { status: 201 });
}
