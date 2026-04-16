const templates = ["classic", "neo", "minimal", "bold", "pastel", "lux", "street", "earth", "mono", "aurora"];

export default function PlatformDashboard() {
  return (
    <main className="container">
      <h1>Platform Owner Command Center</h1>
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        <div className="card"><p>Total Revenue</p><p className="kpi">$248,420</p></div>
        <div className="card"><p>Orders</p><p className="kpi">18,920</p></div>
        <div className="card"><p>Active Tenants</p><p className="kpi">117</p></div>
        <div className="card"><p>Growth</p><p className="kpi">+22%</p></div>
      </div>
      <section className="card" style={{ marginTop: "1rem" }}>
        <h2>Global Control</h2>
        <ul>
          <li>Create/Edit/Suspend/Delete restaurants</li>
          <li>Manage users, subscriptions and billing</li>
          <li>Push global notifications and banners/ads</li>
          <li>Audit logs and activity events</li>
          <li>Control platform settings and theme catalog</li>
        </ul>
        <p>Restaurant themes available: {templates.join(", ")}.</p>
      </section>
    </main>
  );
}
