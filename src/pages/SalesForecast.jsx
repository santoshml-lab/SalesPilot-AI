import { useState } from "react";
import "../styles/customers.css";

export default function SalesForecast() {

  const [sales, setSales] = useState("");
  const [leads, setLeads] = useState("");
  const [forecast, setForecast] = useState(null);

  function generateForecast() {

    const totalSales = Number(sales);
    const totalLeads = Number(leads);

    if (!totalSales || !totalLeads) {
      alert("Please enter sales and leads.");
      return;
    }

    const growth = (totalSales * 1.15).toFixed(0);
    const conversion = ((totalSales / totalLeads) * 100).toFixed(1);

    setForecast({
      growth,
      conversion,
      recommendation:
        conversion > 30
          ? "Excellent sales performance. Increase marketing budget."
          : "Focus on lead nurturing and follow-up emails.",
    });

  }

  return (

    <div
      className="customers-page"
      style={{ marginTop: "80px" }}
    >

      <h1>📈 Sales Forecast AI</h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "25px",
        }}
      >
        Predict next month's sales performance using AI.
      </p>

      <input
        className="search-box-customer"
        placeholder="Current Revenue (₹)"
        value={sales}
        onChange={(e) => setSales(e.target.value)}
      />

      <br /><br />

      <input
        className="search-box-customer"
        placeholder="Total Leads"
        value={leads}
        onChange={(e) => setLeads(e.target.value)}
      />

      <br /><br />

      <button onClick={generateForecast}>
        🚀 Generate Forecast
      </button>

            {forecast && (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >

          <div className="customer-card">
            <h3>📈 Predicted Revenue</h3>
            <h1>₹{Number(forecast.growth).toLocaleString()}</h1>
          </div>

          <div className="customer-card">
            <h3>🎯 Conversion Rate</h3>
            <h1>{forecast.conversion}%</h1>
          </div>

          <div className="customer-card">
            <h3>🤖 AI Recommendation</h3>
            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.7",
                color: "#e2e8f0",
              }}
            >
              {forecast.recommendation}
            </p>
          </div>

        </div>
      )}

    </div>

  );

}
