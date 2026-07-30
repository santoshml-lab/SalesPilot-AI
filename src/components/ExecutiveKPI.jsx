import "../styles/executivekpi.css";

export default function ExecutiveKPI({
  revenue,
  customers,
  deals,
  leads,
}) {

  const target = 500000;

  const progress = Math.min(
    ((revenue / target) * 100).toFixed(1),
    100
  );

  return (
    <div className="kpi-card">

      <h2>🏆 Executive KPI Dashboard</h2>

      <div className="kpi-grid">

        <div>
          <h3>💰 Revenue Target</h3>
          <p>₹{revenue.toLocaleString("en-IN")}</p>
        </div>

        <div>
          <h3>👥 Customers</h3>
          <p>{customers}</p>
        </div>

        <div>
          <h3>💼 Deals</h3>
          <p>{deals}</p>
        </div>

        <div>
          <h3>📈 Leads</h3>
          <p>{leads}</p>
        </div>

      </div>

      <h3 style={{ marginTop: "25px" }}>
        Revenue Progress ({progress}%)
      </h3>

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

    </div>
  );

}
