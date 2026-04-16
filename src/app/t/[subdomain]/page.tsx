import { db } from "@/lib/db";

export default async function TenantPublicPage({ params }: { params: { subdomain: string } }) {
  const tenant = await db.tenant.findUnique({ where: { slug: params.subdomain }, include: { categories: true, items: true } });

  if (!tenant) {
    return <main className="container"><h1>Restaurant not found</h1></main>;
  }

  return (
    <main className="container">
      <h1>{tenant.name}</h1>
      <p>Subdomain: {tenant.slug}</p>
      <p>Theme: {tenant.theme}</p>
      <h2>Menu</h2>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,minmax(0,1fr))" }}>
        {tenant.items.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.nameEn}</h3>
            <p>{item.nameAr}</p>
            <p>${item.price.toString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
