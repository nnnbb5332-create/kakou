export default function RestaurantOwnerDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#0f172a,#1d4ed8)" }}>
      <main className="container">
        <h1>Restaurant Owner Studio</h1>
        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
          <section className="card">
            <h2>Operations</h2>
            <p>Branch, menu, employees, inventory, promotions, loyalty, and customer segmentation tools.</p>
            <p>Real-time order stream and push notification center included.</p>
          </section>
          <section className="card rtl" lang="ar">
            <h3>لوحة التحليلات</h3>
            <p>المبيعات اليومية، المنتجات الأكثر مبيعاً، تحليل العملاء، ساعات الذروة.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
