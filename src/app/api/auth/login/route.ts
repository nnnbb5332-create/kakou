import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { signToken, verifyPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["SUPER_ADMIN", "RESTAURANT_OWNER", "CASHIER", "DRIVER", "CUSTOMER"])
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const user = await db.user.findUnique({ where: { email: payload.email } });

  if (!user || user.role !== payload.role || !user.active) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ok = await verifyPassword(payload.password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await signToken({
    userId: user.id,
    tenantId: user.tenantId,
    role: user.role,
    email: user.email
  });

  const response = NextResponse.json({ success: true, role: user.role });
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/"
  });

  return response;
}
