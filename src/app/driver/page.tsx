export default function DriverDashboard() {
  return (
    <main style={{ minHeight: "100vh", background: "#111827", padding: "1rem" }}>
      <h1>Delivery Driver Console</h1>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <article className="card"><h3>Assigned</h3><p>#ORD-1234</p></article>
        <article className="card"><h3>Status</h3><p>Picked up → On the way → Delivered</p></article>
        <article className="card"><h3>History</h3><p>27 deliveries this week.</p></article>
      </div>
    </main>
  );
}
