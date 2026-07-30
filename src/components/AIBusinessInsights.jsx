import "../styles/aibusiness.css";

export default function AIBusinessInsights({
  revenue,
  customers,
  deals,
  leads,
}) {

  const health =
    revenue > 300000
      ? "Excellent"
      : revenue > 100000
      ? "Good"
      : "Needs Improvement";

  return (
    <div className="ai-business-card">

      <h2>🤖 AI Business Dashboard</h2>

      <div className="ai-business-grid">

        <div>
          <h3>💰 Revenue Status</h3>
          <p>₹{revenue.toLocaleString("en-IN")}</p>
        </div>

        <div>
          <h3>👥 Customers</h3>
          <p>{customers}</p>
        </div>

        <div>
          <h3>💼 Active Deals</h3>
          <p>{deals}</p>
        </div>

        <div>
          <h3>📈 Leads</h3>
          <p>{leads}</p>
        </div>

        <div>
          <h3>🏆 CRM Health</h3>
          <p>{health}</p>
        </div>

        <div>
          <h3>💡 AI Suggestion</h3>
          <p>
            Focus on high-score leads and follow up within 24 hours.
          </p>
        </div>

      </div>

    </div>
  );
}
