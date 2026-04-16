import { db } from "@/lib/db";

const platformHost = process.env.PLATFORM_HOST || "platform.local";

export function extractSubdomain(hostHeader: string | null) {
  if (!hostHeader) return null;
  const host = hostHeader.split(":")[0].toLowerCase();
  if (host === platformHost || host === "localhost") return null;
  if (!host.endsWith(platformHost)) return null;
  const subdomain = host.replace(`.${platformHost}`, "");
  return subdomain || null;
}

export async function resolveTenantBySubdomain(subdomain: string | null) {
  if (!subdomain) return null;
  return db.tenant.findUnique({ where: { slug: subdomain } });
}

export function slugifyRestaurantName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
