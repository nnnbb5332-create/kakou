export default function PosDashboard() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem" }}>⚡ Cashier POS</h1>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
        <section className="card" style={{ background: "white", color: "#0f172a" }}>
          <h2>Quick Order Entry</h2>
          <p>Tap-to-add items, quantity controls, discount + loyalty redemption, cash/card simulation.</p>
        </section>
        <section className="card" style={{ background: "#0f172a" }}>
          <h2>Daily Sales</h2>
          <p>Total: $1,982</p>
          <p>Orders: 83</p>
        </section>
      </div>
    </main>
  );
}
