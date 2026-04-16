import bcrypt from "bcryptjs";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { AppRole } from "@/lib/roles";

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.JWT_SECRET || "dev-secret-change-me");

export type SessionUser = {
  userId: string;
  tenantId: string | null;
  role: AppRole;
  email: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function signToken(user: SessionUser) {
  return new SignJWT(user as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as SessionUser;
}
